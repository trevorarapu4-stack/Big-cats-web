
export const useNotifier = () => {
    const showNotification = (success, description) => {

        const toast = useToast()
        toast.add({ 
            title: success?'Successful':'Process failed',
            description: description,
            color: success?'success':'error',
            duration: 5000,
            icon: success?'solar:check-circle-bold-duotone':'solar:shield-warning-bold-duotone'
        })
        console.log()
    }

    return showNotification
}