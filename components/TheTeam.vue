<template>
    <div class="mems">
        <div class="inner">
            <div class="top">
                <h2>Meet the team</h2>
                <p>Get to know the Big Cat Safaris guides</p>
            </div>
            <div class="list">
                <div class="one" v-for="value in forMembersList" :key="value.$id">
                    <img :src="value.image" :alt="value.name">
                    <div class="info">
                        <h3>{{ value.name }}</h3>
                        <p>{{ value.position }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMembers } from '#imports';

const forMembers = useMembers()
const forMembersList = computed(() => forMembers.allMembers)

</script>

<style lang="scss" scoped>
.mems {
    max-width: 1000px;
    margin: auto;

    .inner {
        max-width: 100%;
        margin: 5rem 0;

        .top {
            margin-bottom: 3rem;

            h2 {
                font-size: 2.5rem;
            }
        }

        .list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
            gap: 1rem;

            .one {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 10rem;
                    height: 10rem;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-bottom: 1rem;
                }

                .info {
                    text-align: center;

                    h3 {
                        font-weight: 600;
                    }

                    p {
                        font-size: 0.9rem;
                        color: var(--color-orange-500);
                    }
                }
            }
        }
    }
}
</style>