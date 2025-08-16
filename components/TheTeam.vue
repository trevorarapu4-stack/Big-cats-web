<template>
    <div class="mems">
        <div class="inner" :class="props.isHome ? 'atHome' : ''">
            <div class="top">
                <h2>Meet the team</h2>
                <p>Get to know the Big Cat Safaris guides</p>
            </div>
            <div class="list" v-if="forMembersList.length > 0" >
                <div class="one" v-for="value in forMembersList" :key="value.$id">
                    <img :src="value.image" :alt="value.name">
                    <div class="info">
                        <h3>{{ value.name }}</h3>
                        <p>{{ value.position }}</p>
                    </div>
                </div>
            </div>
            <div class="list" v-else >
                <div class="one" v-for="i in 4" :key="i">
                    <USkeleton class="h-30 w-30 mb-6 rounded-full" />
                    <div class="info grid gap-2">
                        <USkeleton class="h-4 w-[250px]" />
                        <USkeleton class="h-4 w-[200px]" />
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

const props = defineProps(['isHome'])

</script>

<style lang="scss" scoped>
.mems {
    max-width: 1100px;
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
                    display: flex;
                    flex-direction: column;
                    align-items: center;

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

    .atHome {
        background-color: hsl(from var(--color-orange-500) h s l / 0.1);
        padding: 2rem;
        border-radius: var(--ui-radius);
    }
}
</style>