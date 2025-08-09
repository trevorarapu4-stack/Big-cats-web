<template>
    <NuxtMarquee>
        <img 
        v-for="value in forGalleryList"
        :src="value.image"
        :alt="value.name"
        >
    </NuxtMarquee>
</template>

<script setup>

import { useGallery } from '#imports';

const forGallery = useGallery()
const forGalleryList = computed(() => forGallery.allGallery.slice(0, 12) )

</script>

<style lang="scss" scoped>

img {
    width: 200px;
    height: 200px;
    display: block;
    object-fit: cover;
}

</style>