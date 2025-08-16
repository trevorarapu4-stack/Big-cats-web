<template>
    <div class="skeletonLoader">
        <div class="inner">
            <div class="one" v-for="i in props.number || 10">
                <UCard style="cursor: pointer;">
                    <template #header>
                        <USkeleton class="h-6 w-full" />
                    </template>

                    <template #default>
                        <USkeleton class="h-40 w-full" />
                        <USkeleton class="h-4 mt-2 w-full" />
                        <USkeleton class="h-30 mt-2 w-full" />
                    </template>

                    <template #footer>
                        <div class="acts flex gap-4">
                            <USkeleton class="h-5 w-full" />
                        </div>
                    </template>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['number'])

</script>

<style lang="scss" scoped>
.skeletonLoader {
    .inner {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        padding: 5rem 0rem;
        max-width: 1000px;
        width: 100%;
        margin: auto;
    }
}
</style>