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
                <div class="one" v-for="value in forItinerariesList.slice(0, 6)" :key="value.$id">
                    <img :src="value.image" :alt="value.title">
                    <div class="info">
                        <h4>$ {{ value.cost.toLocaleString() }}</h4>
                        <div class="dot">
                            <h3>{{ value.title }}</h3>
                            <p>{{ value.summary }}</p>
                        </div>
                        <div class="act">
                            <u-button color="neutral" variant="outline" label="Book Now" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import { useItineraries } from '#imports';

const forItineraries = useItineraries()
const forItinerariesList = computed(() => forItineraries.allItineraries)

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

            .one {
                background-color: #ffffff;
                border-radius: var(--ui-radius);
                overflow: hidden;

                // box-shadow: 0px 10px 24px -12px rgba(0, 0, 0, 0.75);
                // -webkit-box-shadow: 0px 10px 24px -12px rgba(0, 0, 0, 0.75);
                // -moz-box-shadow: 0px 10px 24px -12px rgba(0, 0, 0, 0.75);

                @media (prefers-color-scheme: dark) {
                    background-color: #141414;
                }

                img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    display: block;
                }

                .info {
                    padding: 1rem;
                    position: relative;

                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;

                    h4 {
                        background-color: #ffffff;
                        border: 1px solid var(--color-orange-500);
                        position: absolute;
                        top: 0;
                        right: 0;
                        padding: 0.2rem 0.5rem;
                        color: var(--color-orange-500);
                        font-weight: 800;
                        margin-top: -1rem;
                        margin-right: 0.5rem;
                        border-radius: var(--ui-radius);
                    }

                    .dot {
                        h3 {
                            font-size: 1.4rem;
                            color: #000;
                            margin-bottom: 1rem;
                            font-weight: 700;

                            line-clamp: 2;
                            -webkit-line-clamp: 2;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            overflow: hidden;

                            @media (prefers-color-scheme: dark) {
                                color: #ffffff;
                            }
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
        }
    }
}
</style>