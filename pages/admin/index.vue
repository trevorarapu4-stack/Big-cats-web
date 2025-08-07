<template>
    <div class="adminInterface">
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