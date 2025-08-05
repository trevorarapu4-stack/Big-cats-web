<template>
    <div class="filter">
        <div class="inner">
            <h3>Find your ideal tour</h3>
            <div class="selectors">
                <UFormField label="value">
                    <USelectMenu v-model="value" :items="items" class="w-48" />
                </UFormField>
                <UFormField label="value2">
                    <USelectMenu v-model="value2" :items="items" class="w-48" />
                </UFormField>
                <UFormField label="value3">
                    <USelectMenu v-model="value3" :items="items" class="w-48" />
                </UFormField>
                <UButton>Find Tours</UButton>
            </div>
        </div>
    </div>
</template>

<script setup>

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Todo')
const value2 = ref('Backlog')
const value3 = ref('Done')

</script>

<style lang="scss" scoped>
.filter {
    .inner {
        background-color: #ffffff;
        width: fit-content;
        padding: 1.5rem;
        border-radius: var(--ui-radius);

        h3 {
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .selectors {
            display: flex;
            gap: 1rem;

        }
    }
}
</style>