<template>
    <div class="allCats">

        <Head>
            <Title>{{ pageData.heading }} With Big Cat Safaris</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <top-intro-section :intro-data="pageData" :isEntity="true" />

        <div class="about">
            <h2>About {{ pageData.heading }}</h2>
            <p>{{ pageData.paragraph }}</p>
        </div>
        
        <TourFilter type="Destination" :title="pageData.heading" :list="toursList" />

    </div>
</template>

<script setup>
import { useDestinations, useItineraries } from '#imports';

const forDestinations = useDestinations()
const forDestinationsList = computed(() => forDestinations.allDestinations)

const forItineraries = useItineraries()
const forItinerariesList = computed(() => forItineraries.allItineraries )

const pageData = ref({
    image: '/images/categories.webp',
    heading: 'Big Cats Safaris Tour destinations',
    paragraph: 'Lets go destinations.'
})

const route = useRoute()
const getCategory = () => {
    const exists = forDestinationsList.value.find(doc => doc.$id === route.params.id)
    console.log(exists)
    if(exists) {
        pageData.value.image = exists.image
        pageData.value.heading = exists.title
        pageData.value.paragraph = exists.summary
    }
}

const toursList = ref([])
const getTours = () => {
    for (const element of forItinerariesList.value) {
        const list = element.destinations
        console.log(element.destinations)
        // console.log(pageData.value.heading)
        if (list.includes(pageData.value.heading)) {
            toursList.value.push(element)
        }
    }
}

watch( [forDestinationsList, forItinerariesList], () => {
    console.log(route.params.id)
    getCategory()
    getTours()
})

onMounted(() => {
    console.log(route.params.id)
    getCategory()
    getTours()
})

</script>

<style lang="scss" scoped>
.allCats {
    .inner {
        max-width: 1100px;

        margin: 2rem auto;
        padding: 1rem;

        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

        .stuff {
            img {
                border-radius: var(--ui-radius);
                margin-bottom: 1rem;
                width: 100%;
                height: 200px;
                object-fit: cover;
                display: block;
            }

            p {
                font-size: 1rem;

                line-clamp: 7;
                -webkit-line-clamp: 7;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }

    .about {
        max-width: 1100px;
        margin: auto;
        padding: 4rem 1rem;

        h2 {
            font-size: 2.2rem;
        }
        p {
            margin-top: 1rem;
            line-height: 2.5rem;
        }
    }
}
</style>