<template>
    <UApp>
        <div>
            <slot />
        </div>
    </UApp>
</template>

<script setup>

import { useGallery } from '#imports';
import { useDestinations } from '#imports';
import { useCategories } from '#imports';
import { useMembers } from '#imports';

const forDestinations = useDestinations()
const forGallery = useGallery()
const forCategories = useCategories()
const forMembers = useMembers()

onMounted(async () => {
    await forDestinations.fetchAndWatchDestinations()
    await forGallery.fetchAndWatchGallery()
    await forCategories.fetchAndWatchCategories()
    await forMembers.fetchAndWatchMembers()
})

</script>

<style lang="scss" scoped></style>