<template>
    <div class="non">
        <div class="inner">
            <Icon name="solar:link-line-duotone" />
            <h3>No {{ props.section }}</h3>
        </div>
    </div>
</template>

<script setup>

const props = defineProps([ 'section' ])

</script>

<style lang="scss" scoped>

.non {
    padding: 1rem;

    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 500px;
        border: 1px dashed var(--color-orange-500);
        border-radius: var(--ui-radius);

        span {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
    }
}

</style>