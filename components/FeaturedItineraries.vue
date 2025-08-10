<template>
    <div class="itineraries">
        <div class="inner">
            <div class="top">
                <h2>Our Featured Tours</h2>
                <div class="bott">
                    <p>Many travellers like you love these tours</p>
                    <u-button label="View all tours" />
                </div>
            </div>

            <div class="list">
                <UCard v-for="value in forItinerariesList.slice(0, 6)" :key="value.$id" @click="goToTour(value.$id)" style="cursor: pointer;" >
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

            </div>

        </div>
    </div>
</template>

<script setup>

import { useItineraries } from '#imports';

const forItineraries = useItineraries()
const forItinerariesList = computed(() => forItineraries.allItineraries)
const router = useRouter()

const goToTour = (id) => {
    router.push(`/tour-${id}`)
}

</script>

<style lang="scss" scoped>
.itineraries {

    background-color: hsl(from var(--color-orange-500) h s l / 0.1);
    // background-color: rgba(0, 0, 0, 0.1);
    margin: 5rem 0;

    .inner {
        padding: 5rem 1rem;
        max-width: 1000px;
        margin: auto;

        .top {
            display: flex;
            flex-direction: column;
            margin-bottom: 4rem;

            h2 {
                font-size: 2rem;
            }

            .bott {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
        }

        .list {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

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