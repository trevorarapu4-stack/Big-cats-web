<template>
    <div class="top" :style="{
        backgroundImage: `url(${props.introData.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }">
        <div class="cov">
            <h2>{{ props.introData.heading }}</h2>
            <p>{{ props.introData.paragraph }}</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['introData'])

</script>

<style lang="scss" scoped>
.top {
    min-height: 500px;
    display: flex;
    align-items: center;

    .cov {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding: 5%;
        color: #ffffff;

        * {
            max-width: 1200px;
            width: 100%;
        }

        h2 {
            font-size: 3rem;
        }
        p {
            max-width: 900px;
        }
    }
}
</style>