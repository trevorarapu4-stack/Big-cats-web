<template>
    <div class="gallery">
        <Head>
            <Title>{{ pageData.heading }}</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <div class="inner">
            <top-intro-section :intro-data="pageData" />
            <div class="next">
                <div class="fir">
                    <h2>Moments from the Wild</h2>
                    <p>Step into the heart of Africa with Big Cat Safaris. Our gallery captures the thrill of game drives, the majesty of the Big Five, and the raw beauty of untamed wilderness.</p>
                </div>

                <div class="list">
                    <img v-for="value in forGalleryList" :key="value.$id" :src="value.image" :alt="value.name">
                </div>

                <UPagination v-model:page="page" :total="100" />

            </div>
        </div>
    </div>
</template>

<script setup>
import { useGallery } from '#imports';

const forGallery = useGallery()
const forGalleryList = computed(() => forGallery.allGallery)

const page = ref(5)

const pageData = ref({
    image: '/images/gallery.webp',
    heading: 'Big cats Safaris Gallery',
    paragraph: 'Capturing Timeless Memories. A Photographic Journey with Big Cat Safaris'
})

</script>

<style lang="scss" scoped>
.gallery {
    .inner {
        .top {

            min-height: 500px;
            display: flex;
            align-items: center;

            .cov {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                padding: 5%;
                color: #ffffff;

                * {
                    max-width: 1200px;
                    width: 100%;
                }

                h2 {
                    font-size: 3rem;
                }
            }
        }

        .next {
            max-width: 1100px;
            width: 100%;
            padding: 1rem;
            margin: auto;

            .fir {
                text-align: center;
                margin: 3rem 1rem;
                display: flex;
                align-items: center;
                flex-direction: column;

                h2 {
                    font-size: 2rem;
                }
                p {
                    font-size: 1rem;
                    max-width: 800px;
                }
            }

            .list {
                display: grid;
                gap: 0.5rem;
                grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

                img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>