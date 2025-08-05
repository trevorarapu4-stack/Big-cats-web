<template>
    <div class="hero">
        <div class="inner">
            <HeroSlider />
            <div class="cover">
                <h1>Enjoy Your Vacation With Us</h1>
                <p>Unveil the awe-inspiring tale behind our company's humble origins and the extraordinary journey that
                    has brought us to this remarkable point today.</p>
            </div>
            <div class="filt">
                <filter-container />
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.hero {
    position: relative;

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        color: #ffffff;
        padding: 1rem;
        padding-bottom: 5rem;

        h1 {
            font-size: 4rem;
        }

        p {
            max-width: 900px;
        }
    }

    .filt {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 2;
        border-radius: var(--ui-radius);

        width: fit-content;
        margin: 1rem auto;
        margin-bottom: -4rem;
        box-shadow: 0px 10px 48px -16px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 10px 48px -16px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 10px 48px -16px rgba(0, 0, 0, 0.75);
    }
}
</style>