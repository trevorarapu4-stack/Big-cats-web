<template>
    <UModal v-model:open="isLoginModal" :ui="{ footer: 'justify-end' }">

        <template #header>
            <div class="heading">
                <h3>Big Cat Safaris Login</h3>
                <p>Login with your dash email and password.</p>
            </div>
        </template>

        <template #body>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="nowLogin">
                <UFormField label="Email" name="email">
                    <UInput v-model="state.email" class="w-full" />
                </UFormField>
                <UFormField label="Password" name="password">
                    <UInput v-model="state.password" :type="isShowPassword ? 'text' : 'password'" class="w-full" />
                </UFormField>
                <UCheckbox label="Show password" v-model="isShowPassword" />
            </UForm>
        </template>

        <template #footer="{ close }">
            <UButton :loading="isLoading" label="Cancel" color="neutral" variant="outline" @click="close" />
            <UButton :loading="isLoading" label="Submit" color="neutral" @click="nowLogin" />
        </template>
    </UModal>
</template>

<script setup>
import * as v from 'valibot'

const { logInUser, logOutUser } = useAuth()
const isShowPassword = ref(false)
const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

const state = reactive({
    email: '',
    password: ''
})

const isLoading = useCookie('isLoading', { sameSite: 'lax' })
const nowLogin = async (event) => {

    await logOutUser()
    await logInUser(state.email, state.password)
    isLoginModal.value = false

}

const isLoginModal = useCookie('isLoginModal', { sameSite: 'lax' })
onMounted(() => {
    isLoginModal.value = false
})

</script>

<style scoped lang="scss">
.heading {
    display: flex;
    flex-direction: column;

    h3 {
        font-weight: 700;
    }

    p {
        font-size: 1rem;
    }
}
</style>