<template>
    <div class="itineraries">
        <div class="inner">
            <div class="top">
                <h2>Checkout our latest Blogs</h2>
                <div class="bott">
                    <p>Grow your knowledge in general wildlife, primates and more</p>
                </div>
            </div>

            <div class="list">
                <UCard v-for="value in forBlogsList.slice(0, 3)" :key="value.$id" @click="goToTour(value.$id)"
                    style="cursor: pointer;" variant="subtle" >

                    <template #default>
                        <img :src="value.image" :alt="value.title">
                        <h3>{{ value.title }}</h3>
                        <p>{{ value.summary }}</p>
                    </template>
                </UCard>
            </div>
            <u-button label="View all blogs" />

        </div>
    </div>
</template>

<script setup>

import { useBlogs } from '#imports';

const forBlogs = useBlogs()
const forBlogsList = computed(() => forBlogs.blogs)
const router = useRouter()

const goToTour = (id) => {
    router.push(`/tour-${id}`)
}

</script>

<style lang="scss" scoped>
.itineraries {
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
            margin-bottom: 3rem;

            img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                display: block;
                border-radius: var(--ui-radius);
                margin-bottom: 0.5rem;
            }

            h3 {
                font-weight: 700;
                color: var(--color-orange-500);
                margin-bottom: 0.5rem;
                
                line-clamp: 1;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            p {
                font-size: 1.1rem;

                line-clamp: 5;
                -webkit-line-clamp: 5;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}
</style>