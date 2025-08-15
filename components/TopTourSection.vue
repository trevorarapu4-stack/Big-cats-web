<template>
    <div class="top" :style="{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darknessLevel}), rgba(0, 0, 0, ${darknessLevel})), url(${forSingleItineraryData?.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }">
        <div class="cov">
            <h2>{{ forSingleItineraryData?.title }}</h2>
            <!-- <p>{{ forSingleItineraryData?.summary }}</p> -->
            <u-button label="Book this tour" size="lg" variant="outline" icon="solar:pen-new-round-bold-duotone" class="mt-5 w-fit" />
        </div>
    </div>
</template>

<script setup>
import { useSingleItinerary } from '#imports';

const forSingleItinerary = useSingleItinerary()
const forSingleItineraryData = computed(() => forSingleItinerary.singleItinerary)

const darknessLevel = 0.3


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
        margin: auto;
        text-align: center;

        h2,
        p {
            max-width: 1200px;
            width: 100%;

            line-clamp: 3;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            display: -webkit-box;
        }

        h2 {
            font-size: 3rem;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            max-width: 800px;
        }

        p {
            max-width: 900px;
        }
    }
}
</style>