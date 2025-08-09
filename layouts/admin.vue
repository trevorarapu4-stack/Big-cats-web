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
import { useItineraries } from '#imports';
import { useBlogs } from '#imports';
import { useReviews } from '#imports';

const forDestinations = useDestinations()
const forGallery = useGallery()
const forCategories = useCategories()
const forMembers = useMembers()
const forItineraries = useItineraries()
const forBlogs = useBlogs()
const forReviews = useReviews()

onMounted(async () => {
    await forDestinations.fetchAndWatchDestinations()
    await forGallery.fetchAndWatchGallery()
    await forCategories.fetchAndWatchCategories()
    await forMembers.fetchAndWatchMembers()
    await forItineraries.fetchAndWatchIitineraries()
    await forBlogs.fetchAndWatchBlogs()
    await forReviews.fetchAndWatchReviews()
})

</script>

<style lang="scss" scoped></style>