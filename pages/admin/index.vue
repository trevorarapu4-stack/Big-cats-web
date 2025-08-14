<template>
    <div class="adminInterface">
        <Head>
            <Title>Big Cat Safaris Admin</Title>
            <Meta name="description" content="Welcome to the big cat safaris admin page" />
        </Head>
        <admin-header />
        <MainInterface />
    </div>
</template>

<script setup>
import MainInterface from '~/components/Admin/MainInterface.vue';

definePageMeta({
    layout: 'admin'
})

</script>

<style lang="scss" scoped>

.adminInterface {
    display: grid;
    grid-template-columns: 20% 1fr;
    // gap: 1rem;
    height: 100vh;
}

</style>