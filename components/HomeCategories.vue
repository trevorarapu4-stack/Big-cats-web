<template>
    <div class="cats">
        <div class="inner">
            <div class="top">
                <h2>Our Tour Categories</h2>
                <p>Explore categories loved by many tourist like you.</p>
            </div>
            <div class="list">
                <UCard variant="subtle" v-for="value in forCategoriesList" :key="value.$id">
                    <template #default>
                        <div class="stuff">
                            <img :src="value.image" :alt="value.title">
                            <h3>{{ value.title }}</h3>
                            <p>Open tours packages</p>
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