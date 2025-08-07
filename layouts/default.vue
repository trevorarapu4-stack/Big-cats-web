<template>
    <UApp>
        <div>
            <MainHeader />
            <slot />
            <LoginAdmin />
        </div>
    </UApp>
</template>

<script setup>
import { useGallery } from '#imports';
import { useDestinations } from '#imports';
import { useCategories } from '#imports';

const forDestinations = useDestinations()
const forGallery = useGallery()
const forCategories = useCategories()

onMounted( async () => {
    await forDestinations.fetchAndWatchDestinations()
    await forGallery.fetchAndWatchGallery()
    await forCategories.fetchAndWatchCategories()
})

</script>

<style lang="scss" scoped></style>