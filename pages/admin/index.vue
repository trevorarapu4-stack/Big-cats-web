<template>
    <div class="adminInterface">
        <admin-header />
        <MainInterface />

        <UModal v-model:open="isOpenModal" >
            <template #content>
                <div class="h-48 m-4" ></div>
            </template>
        </UModal>

    </div>
</template>

<script setup>
import MainInterface from '~/components/Admin/MainInterface.vue';

definePageMeta({
    layout: 'admin'
})

const isOpenModal = ref(true)

</script>

<style lang="scss" scoped>

.adminInterface {
    display: grid;
    grid-template-columns: 20% 1fr;
    // gap: 1rem;
    height: 100vh;
}

</style>