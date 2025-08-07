<template>
    <div class="topDesc">
        <div class="inner">
            <div class="top">
                <h2>Top Tourist Destinations</h2>
                <p>Check out popular destinations loved by many travelers.</p>
            </div>
            <div class="list">
                <div class="one" v-for="value in forDestinationsList" :key="value.$id">
                    <img :src="value.image" :alt="value.title">
                    <div class="side">
                        <h3>{{ value.title }}</h3>
                    </div>
                    <Icon name="solar:arrow-right-up-line-duotone" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useDestinations } from '#imports';

const forDestinations = useDestinations()
const forDestinationsList = computed(() => forDestinations.allDestinations.slice(0, 8))

</script>

<style lang="scss" scoped>
.topDesc {

    margin-top: 7rem;

    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;

        .top {
            text-align: center;

            h2 {
                font-size: 2.7rem;
            }
        }

        .list {
            margin-top: 3rem;

            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
            max-width: 1000px;

            .one {
                padding: 1rem;

                display: flex;
                align-items: center;
                gap: 1rem;
                position: relative;
                border-radius: var(--ui-radius);
                border: 1px solid #eeeeee;

                @media (prefers-color-scheme: 'dark') {
                    border: 1px solid #3d3d3d;
                }

                img {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    object-fit: cover;
                    display: block;
                }

                span {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 2rem;
                    opacity: 0.2;
                }

                &:hover {
                    span {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>