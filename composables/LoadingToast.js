
export const useLoader = () => {


    const toast = useToast()
    const processingData = useCookie('processingData', { sameSite: 'lax' })

    const showLoader = (id, title, description) => {

        toast.add({
            id: id,
            title: title,
            description: description,
            color: 'info',
            progress: false,
            icon: 'svg-spinners:270-ring',
            duration: 10000000
        })
        processingData.value = true
    }

    const removeLoader = (id) => {
        toast.remove(id)
        processingData.value = false
    }

    return { showLoader, removeLoader }
}