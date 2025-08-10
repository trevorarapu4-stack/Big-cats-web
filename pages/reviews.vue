<template>
    <div class="revPage">
        <top-intro-section :intro-data="pageData" />
        <div class="inner">
            <div class="list" v-if="forReviewsList?.length > 0">
                <UCard v-for="value in forReviewsList" :key="value.$id">
                    <template #header>
                        <h3>{{ value.title }}</h3>
                    </template>

                    <template #default>
                        <div class="info">
                            <div class="forImg">
                                <img v-if="value.image" :src="value.image" :alt="value.name">
                                <img v-else
                                    :src="`https://ui-avatars.com/api/?name=${value.name}&background=random&size=500`"
                                    :alt="value.name">
                            </div>
                            <h3>{{ value.name }}</h3>
                            <div class="stars">
                                <Icon name="solar:star-circle-bold-duotone" v-for="i in value.stars" :key="i" />
                            </div>
                            <p>{{ value.message }}</p>
                        </div>
                    </template>
                </UCard>
            </div>
            <empty-section section="Reviews" v-else />
        </div>
    </div>
</template>

<script setup>

import { useReviews } from '#imports';

const forReviews = useReviews()
const forReviewsList = computed(() => forReviews.allReviews)

const pageData = ref({
    image: '/images/reviews.webp',
    heading: 'Big cat Safaris Travelers Reviews',
    paragraph: 'Hear from travelers who have experienced our safaris firsthand. If you’ve joined us before, we’d love to hear your story and share it with fellow adventurers.'

})

</script>

<style lang="scss" scoped>
.revPage {
    .inner {
        .list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 1000px;
            margin: auto;
            padding: 1rem;

            .info {

                .forImg {

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    width: fit-content;
                    margin-bottom: 1rem;

                    img {
                        height: 100px;
                        width: 100px;
                        object-fit: cover;
                        display: block;
                        border-radius: 50%;
                    }
                }

                .stars {
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;

                    span {
                        font-size: 1.5rem;
                        color: var(--color-orange-500);
                    }
                }

                p {
                    font-size: 1rem;

                    // line-clamp: 5;
                    // -webkit-line-clamp: 5;
                    // display: -webkit-box;
                    // -webkit-box-orient: vertical;
                    // overflow: hidden;
                }

            }
        }
    }
}
</style>