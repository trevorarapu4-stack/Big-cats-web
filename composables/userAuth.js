
export const useAuth = () => {

    const bcId = useCookie('bcId', { sameSite: 'lax' })
    const bcName = useCookie('bcName', { sameSite: 'lax' })
    const bcEmail = useCookie('bcEmail', { sameSite: 'lax' })
    const isLoading = useCookie('isLoading', { sameSite: 'lax' })

    const { account } = useAppwrite()
    const forNotifier = useNotifier()
    const router = useRouter()

    const logInUser = async (email, password) => {

        let logUser = null
        isLoading.value = true
        try {
            await account.createEmailPasswordSession(email, password)
            logUser = await account.get()

            console.log(logUser)
            if (logUser.$id) {

                bcId.value = logUser.$id
                bcName.value = logUser.name
                bcEmail.value = logUser.email

                isLoading.value = false
                forNotifier(true, '👍 Success! welcome to Big Cat Safaris. You can access the dashboard now')
            } else {
                isLoading.value = false
                forNotifier(false, 'Failed! No user was identified')
            }

        } catch (error) {
            console.log(error)
            isLoading.value = false
            forNotifier(false, error.message || 'Failed! You account could not be authenticated')
        }
    }

    const logOutUser = async () => {

        isLoading.value = true
        try {
            await account.deleteSession('current')

            bcId.value = ''
            bcName.value = ''
            bcEmail.value = ''

            isLoading.value = false
            forNotifier(true, '👋 You have successfully logged out. See you later.')
            router.push('/')

        } catch (error) {
            console.log(error)
            isLoading.value = false
        }

    }

    return { logInUser, logOutUser }
}