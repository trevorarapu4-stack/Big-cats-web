<template>
    <div class="alldests">

        <Head>
            <Title>{{ pageData.heading }}</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <top-intro-section :intro-data="pageData" />
        <div class="inner" v-if="forDestinationsList.length > 0">
            <nuxt-link v-for="value in forDestinationsList" :key="value.$id" :to="`/destination-${value.$id}`" >
                <UCard variant="subtle" >
                    <template #header>
                        <h2>{{ value.title }}</h2>
                    </template>

                    <template #default>
                        <div class="stuff">
                            <img :src="value.image" :alt="value.title">
                            <p>{{ value.summary }}</p>
                        </div>
                    </template>
                </UCard>
            </nuxt-link>
        </div>
        <loading-content-skeleton v-else :number="15" />
    </div>
</template>

<script setup>
import { useDestinations } from '#imports';

const forDestinations = useDestinations()
const forDestinationsList = computed(() => forDestinations.allDestinations)

const pageData = ref({
    image: '/images/destinations.webp',
    heading: 'Big Cats Safaris Destinations',
    paragraph: 'Discover the incredible destinations we offer for your safari adventure. If you need more information or assistance planning your journey to any of these amazing locations, we’re here to help.'
})

</script>

<style lang="scss" scoped>
.alldests {
    .inner {
        max-width: 1100px;

        margin: 2rem auto;
        padding: 1rem;

        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

        .stuff {
            img {
                border-radius: var(--ui-radius);
                margin-bottom: 1rem;
                width: 100%;
                height: 200px;
                object-fit: cover;
                display: block;
            }

            p {
                font-size: 1rem;

                line-clamp: 7;
                -webkit-line-clamp: 7;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}
</style>