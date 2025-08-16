<template>
    <div class="tours">

        <Head>
            <Title>{{ pageData.heading }}</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <top-intro-section :intro-data="pageData" />

        <div class="inner">
            <div class="list" v-if="forItinerariesList.length > 0">
                <nuxt-link v-for="value in forItinerariesList" :key="value.$id" :to="`/tour-${value.$id}`">
                    <UCard style="cursor: pointer;">
                        <template #header>
                            <h3>{{ value.title }}</h3>
                        </template>

                        <template #default>
                            <img :src="value.image" :alt="value.title">
                            <h4>$ {{ value.cost.toLocaleString() }} Per person</h4>
                            <p>{{ value.summary }}</p>
                        </template>

                        <template #footer>
                            <div class="acts flex gap-4">
                                <UButton color="neutral">Book Now</UButton>
                            </div>
                        </template>
                    </UCard>
                </nuxt-link>
            </div>
            <loading-content-skeleton v-else :number="20" />
        </div>
    </div>
</template>

<script setup>
import { useItineraries } from '#imports';

const forItineraries = useItineraries()
const forItinerariesList = computed(() => forItineraries.allItineraries)
const router = useRouter()

const pageData = ref({
    image: '/images/tours.webp',
    heading: 'Big Cat Safaris Tour Packages',
    paragraph: 'Browse our carefully crafted safari packages, each designed to offer unique experiences and lasting memories. Whether you’re seeking thrilling wildlife encounters or peaceful scenic escapes, we have the perfect package for you.'

})
</script>

<style lang="scss" scoped>
.tours {
    .inner {

        .list {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
            max-width: 1050px;
            margin: 3rem auto;
            padding: 1rem;

            img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                display: block;
                border-radius: var(--ui-radius);
                margin-bottom: 0.5rem;
            }

            h4 {
                font-weight: 700;
                color: var(--color-orange-500);
                margin-bottom: 0.5rem;
            }

            p {
                font-size: 1.1rem;

                line-clamp: 5;
                -webkit-line-clamp: 5;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;

                margin-bottom: 1rem;
            }
        }
    }
}
</style>