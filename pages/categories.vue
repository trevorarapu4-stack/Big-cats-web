<template>
    <div class="allCats">

        <Head>
            <Title>{{ pageData.heading }}</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <top-intro-section :intro-data="pageData" />
        <div class="inner" v-if="forCategoriesList.length > 0">
            <nuxt-link v-for="value in forCategoriesList" :key="value.$id" :to="`/category-${value.$id}`" >
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
        <loading-content-skeleton v-else :number="5" />
    </div>
</template>

<script setup>
import { useCategories } from '#imports';

const forCategories = useCategories()
const forCategoriesList = computed(() => forCategories.allCategories)

const pageData = ref({
    image: '/images/categories.webp',
    heading: 'Big Cats Safaris Tour Categories',
    paragraph: 'Explore our diverse range of safari experiences designed to suit every adventurer. If you have questions or need help choosing the perfect tour, don’t hesitate to get in touch with us.'

})

</script>

<style lang="scss" scoped>
.allCats {
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