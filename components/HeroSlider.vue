<template>
    <ClientOnly>
        <div class="sliderContainer">
            <swiper-container ref="containerRef" :init="false">
                <swiper-slide v-for="(slide, idx) in images" :key="idx">
                    <img :src="slide" alt="ateker villas showcase image">
                </swiper-slide>
            </swiper-container>
        </div>
    </ClientOnly>
</template>

<script setup>
const containerRef = ref(null)
const images = ref([
    '/slider/one.webp',
    '/slider/two.webp',
    '/slider/three.webp',
    '/slider/four.webp',
    '/slider/five.webp',
    '/slider/six.webp',
    '/slider/seven.webp',
    '/slider/eight.webp',
    '/slider/nine.webp',
    '/slider/ten.webp'
])
const swiper = useSwiper(containerRef, {
    effect: 'zoom',
    loop: true,
    speed: 2000,
    autoplay: {
        delay: 6000,
    },
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [-400, 0, -400],
        },
        next: {
            shadow: true,
            translate: [0, -400, -400],
        },
    },
})

onMounted(() => {
    console.log(swiper.instance)
})

// slides effects
// Slide (Default)
// Fade
// Cube
// Coverflow
// Flip
// Creative
// Cards
// Parallax
// Zoom

</script>

<style lang="scss">
.sliderContainer {
    position: relative;

    swiper-container {
        swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            height: 60vh;
            font-size: 4rem;
            font-weight: bold;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: brightness(80%);
            }
        }
    }
}
</style>