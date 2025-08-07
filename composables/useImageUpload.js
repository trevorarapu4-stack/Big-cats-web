// composables/useImageUpload.js

import {
    upload,
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitUploadNetworkError,
    ImageKitServerError
} from '@imagekit/vue'

export const useImageUpload = () => {

    const progress = useCookie('progress', { sameSite: 'lax' })
    // const aborter = new AbortController()

    const forNotifiers = useNotifier()
    const forLoader = useLoader()

    async function authenticateImagekit() {

        const { data } = await useFetch('/api/imageKitAuth', {
            key: `imagekit-auth-${Date.now()}`,
            server: false
        })
        if (data.value.expire) {
            return data
        } else {
            return null
        }
    }

    async function handleUpload(folder, file, title) {

        const aborter = new AbortController()

        forLoader.showLoader('@imagekitUploading', 'Uploading Image', 'Please wait us we upload the selected image')
        let creds = null;
        creds = await authenticateImagekit()
        console.log(creds.value)
        if (creds.value === null) {
            forLoader.removeLoader('@imagekitUploading')
            forNotifiers(false, 'Image upload failed because no access was given')
            return
        }

        try {
            const resp = await upload({
                ...creds.value,
                file,
                fileName: file.name,
                folder: `/${folder}/${title.toLowerCase().replace(/[^a-zA-Z]/g, '_').slice(0, 35)}`,
                onProgress: e => (progress.value = e.loaded / e.total * 100),
                abortSignal: aborter.signal
            })
            // console.log('Upload OK', resp)

            // console.log(`${resp.url}?imagekitId=${resp.fileId}`)
            forLoader.removeLoader('@imagekitUploading')
            forNotifiers(true, 'Image upload was successfull')
            return `${resp.url}?imagekitId=${resp.fileId}`

        } catch (err) {
            forLoader.removeLoader('@imagekitUploading')
            if (err instanceof ImageKitAbortError) {
                forNotifiers(false, 'Image upload was cancelled')
                console.warn('Aborted')
            }
            else if (err instanceof ImageKitInvalidRequestError) {
                forNotifiers(false, 'Image upload failed because the request was not right')
                console.error('Bad request')
            }
            else if (err instanceof ImageKitUploadNetworkError) {
                forNotifiers(false, 'Internet connection is faulty')
                console.error('Network')
            }
            else if (err instanceof ImageKitServerError) {
                forNotifiers(false, 'Failed! Contact the developer')
                console.error('Server side')
            }
            else {
                console.error(err)
            }
        }
    }

    return {
        handleUpload
    }
}