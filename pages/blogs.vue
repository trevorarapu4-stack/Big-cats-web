<template>
    <div class="allblogs">
        <Head>
            <Title>{{ pageData.heading }}</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <top-intro-section :intro-data="pageData" />
        <div class="inner" v-if="forBlogsList.length > 0" >
            <nuxt-link v-for="value in forBlogsList" :key="value.$id" :to="`/blog-${value.$id}`" >
                <UCard variant="subtle" style="cursor: pointer;">
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
        <loading-content-skeleton v-else :number="9" />
    </div>
</template>

<script setup>
import { useBlogs } from '#imports';

const forBlogs = useBlogs()
const forBlogsList = computed(() => forBlogs.blogs)

const pageData = ref({
    image: '/images/blog.webp',
    heading: 'Big Cat Safari Blog & Travel Tips',
    paragraph: 'Dive into stories from the wild, travel advice, and insider tips to make the most of your safari. Our blog brings you closer to nature, culture, and the unforgettable experiences that await.'
})

const router = useRouter()
const goToBlog = (id) => {
    router.push(`/blog-${id}`)
}
</script>

<style lang="scss" scoped>
.allblogs {
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