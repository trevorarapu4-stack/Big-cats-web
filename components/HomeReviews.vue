<template>
    <div class="cats">
        <div class="inner">
            <div class="top">
                <h2>Travelers take on Big Cat Safaris</h2>
                <div class="mnb">
                    <p>Check out what many travelers and tourists say about Big Cat Safaris.</p>
                    <u-button label="Read all reaviews" />
                </div>
            </div>
            <div class="list">
                <nuxt-marquee>
                    <UCard class="mr-7" v-for="value in forReviewsList" :key="value.$id">
                        <template #header>
                            <Icon class="st" v-for="i in value.stars" name="solar:star-circle-bold-duotone" />
                        </template>
                        <template #default>
                            <div class="stuff">
                                <img :src="value.image" :alt="value.title">
                                <h3>{{ value.title }}</h3>
                                <p>{{ value.message }}</p>
                            </div>
                        </template>
                    </UCard>
                </nuxt-marquee>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useReviews } from '#imports';

const forReviews = useReviews()
const forReviewsList = computed(() => forReviews.allReviews)

</script>

<style lang="scss" scoped>
.cats {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(from var(--color-orange-500) h s l / 0.1);
    margin: 4rem 0;
    padding-bottom: 5rem;
    overflow: hidden;


    .inner {

        display: flex;
        flex-direction: column;

        .top {
            padding: 3rem 1rem;
            max-width: 1100px;
            margin: auto;
            width: 100%;
            margin-bottom: 2rem;

            h2 {
                font-size: 2rem;
            }

            .mnb {
                display: flex;
                justify-content: space-between;
                gap: 2rem;

                p {
                    font-size: 1.1rem;
                }
            }
        }

        .list {

            width: 100%;

            .st {
                color: var(--color-orange-500);
                font-size: 2rem;
                margin-right: 0.5rem;
            }

            .stuff {
                max-width: 400px;

                img {
                    border-radius: 50%;
                    margin-bottom: 1rem;
                    height: 100px;
                    width: 100px;
                    display: block;
                    object-fit: cover;
                }

                h3 {
                    font-weight: 700;
                    font-size: 1.3rem;
                }

                p {
                    font-size: 1rem;
                    line-height: 1.5rem;

                    line-clamp: 5;
                    -webkit-line-clamp: 5;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>