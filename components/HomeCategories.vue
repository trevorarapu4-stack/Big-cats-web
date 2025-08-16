<template>
    <div class="cats">
        <div class="inner">
            <div class="top">
                <h2>Our Tour Categories</h2>
                <p>Explore categories loved by many tourist like you.</p>
            </div>
            <div class="list" v-if="forCategoriesList.length > 0">
                <nuxt-link v-for="value in forCategoriesList" :key="value.$id" :to="`/category-${value.$id}`">
                    <UCard variant="subtle">
                        <template #default>
                            <div class="stuff">
                                <img :src="value.image" :alt="value.title">
                                <h3>{{ value.title }}</h3>
                                <p>Open tours packages</p>
                            </div>
                        </template>
                    </UCard>
                </nuxt-link>
            </div>
            <div class="list" v-else>
                <UCard variant="subtle" v-for="i in 5" :key="i">
                    <template #default>
                        <div class="stuff">
                            <USkeleton class="h-40 w-full" />
                            <USkeleton class="h-6 mt-2 w-full" />
                            <USkeleton class="h-4 mt-2 w-full" />
                        </div>
                    </template>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCategories } from '#imports';

const forCategories = useCategories()
const forCategoriesList = computed(() => forCategories.allCategories)

</script>

<style lang="scss" scoped>
.cats {
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
        max-width: 1100px;
        margin: auto;
        width: 100%;

        display: flex;
        flex-direction: column;

        .top {
            margin-bottom: 2rem;

            h2 {
                font-size: 2rem;
            }
        }

        .list {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
            // background-color: red;
            width: 100%;

            .stuff {
                img {
                    border-radius: var(--ui-radius);
                    margin-bottom: 1rem;
                    height: 150px;
                    width: 100%;
                    display: block;
                    object-fit: cover;
                }

                h3 {
                    font-weight: 700;
                    font-size: 1.3rem;
                }

                p {
                    font-size: 0.9rem;
                    line-height: 1rem;
                    color: var(--color-orange-500);
                }
            }
        }
    }
}
</style>