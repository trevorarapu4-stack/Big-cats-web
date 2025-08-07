<template>
    <div class="addDest">
        <div class="inner">
            <UFileUpload color="neutral" highlight label="Drop your image here" description="SVG, PNG, JPG or GIF"
                class="w-full min-h-68" v-model="selectedImage" />
            <UFormField label="Destination Title" class="mt-5">
                <UInput placeholder="Title..." v-model="destinationForm.title" class="w-full" />
            </UFormField>
            <UFormField label="Destination Summary" class="mt-5">
                <UTextarea placeholder="summary..." v-model="destinationForm.summary" class="w-full" autoresize />
            </UFormField>
            <UButton class="mt-5" :disabled="processingData" @click="uploadData">
                <Icon v-if="processingData" name="svg-spinners:270-ring"
                    style="font-size: 1.3rem; margin-right: 0.2rem;" />
                Upload Destination
            </UButton>
        </div>
    </div>
</template>

<script setup>
import { useLoader } from '#imports';

const selectedImage = ref(null)
const destinationForm = ref({
    image: null,
    title: '',
    summary: ''
})

const processingData = useCookie('processingData', { sameSite: 'lax' })
const forLoader = useLoader()
const forNotifier = useNotifier()
const forImageUpload = useImageUpload()
const { database, ID } = useAppwrite()

const uploadData = async () => {

    console.log(selectedImage.value)
    console.log(destinationForm.value)

    if (!destinationForm.value.title && !destinationForm.value.summary) {
        forNotifier(false, 'Please add a title and summary')
    }

    forLoader.showLoader('@uploadingDestination', 'Please wait', 'Still working on uploading your destination ⚒️')
    try {
        const url = await forImageUpload.handleUpload('destinations', selectedImage.value, destinationForm.value.title)
        if (url) {
            destinationForm.value.image = url

            try {
                await database.createDocument(
                    useRuntimeConfig().public.APPWRITE_DB_ID,
                    useRuntimeConfig().public.APPWRITE_DESTINATIONS_COLL_ID,
                    ID.unique(),
                    destinationForm.value
                )

                forLoader.removeLoader('@uploadingDestination')
                forNotifier(true, '😎 Congratulations! your new destination has been uploaded successfully')

                destinationForm.value.image = null
                destinationForm.value.title = ''
                destinationForm.value.summary = ''
                selectedImage.value = null

            } catch (error) {
                console.log(error)
                forLoader.removeLoader('@uploadingDestination')
                forNotifier(false, error.message)
            }

        } else {
            forLoader.removeLoader('@uploadingDestination')
            forNotifier(false, 'Image upload failed or no image was selected')
        }

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@uploadingDestination')
        forNotifier(false, error.message)
    }
}

</script>

<style lang="scss" scoped>
.addDest {

    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem;

    .inner {
        max-width: 800px;
        width: 100%;
    }
}
</style>