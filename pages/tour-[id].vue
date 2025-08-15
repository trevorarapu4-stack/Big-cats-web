<template>
    <div class="singleTour">
        <Head>
            <Title>{{ forItineraryDoc?.title }} From Big Cat Safaris</Title>
            <Meta name="description" :content="forItineraryDoc?.summary" />
        </Head>
        <top-tour-section />
        <div class="inner">
            <div class="lft">
                <UFormField label="Summary">
                    <h2>{{ forItineraryDoc?.title }}</h2>
                    <p>{{ forItineraryDoc?.summary }}</p>
                </UFormField>
                <UFormField label="Content">
                    <div class="itiCont" v-html="getHtml(forItineraryDoc?.content)"></div>
                </UFormField>
            </div>
            <div class="rght">
                <div class="innn">
                    <UAccordion :items="items">
                        <template #body="{ item }">
                            <div class="subCont" v-html="getHtml(forItineraryDoc?.[item.id])"></div>
                        </template>
                    </UAccordion>
                    <u-button label="Book This Tour" @click="isBookingProcess = true" class="mt-4" />
                </div>
            </div>
        </div>
        <booking-modal />
    </div>
</template>

<script setup>
import { useSingleItinerary } from '#imports';
import { marked } from 'marked';

const forItinerary = useSingleItinerary()
const forItineraryDoc = computed(() => forItinerary.singleItinerary)
const route = useRoute()
const isBookingProcess = useCookie('isBookingProcess', { sameSite: 'lax' })

const items = [
    {
        label: 'What is Included?',
        icon: 'solar:add-folder-bold-duotone',
        id: 'includes'
    },
    {
        label: 'What to bring?',
        icon: 'solar:minus-square-bold-duotone',
        id: 'bring'
    },
    {
        label: 'Extra Information',
        icon: 'solar:text-cross-square-bold-duotone',
        id: 'extra'
    }
]

onMounted(async () => {
    await forItinerary.setAndWatchItinerary(route.params.id)
})

const getHtml = (cont) => {
    return cont ? marked(cont) : ''
}

</script>

<style lang="scss" scoped>
.singleTour {
    .inner {
        display: grid;
        grid-template-columns: 1fr 35%;
        max-width: 1000px;
        gap: 1rem;
        margin: 2rem auto;

        .lft {
            h2 {
                font-size: 2rem;
                margin-top: 2rem;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1.1rem;
                line-height: 2rem;
                margin-bottom: 2rem;
            }

            :deep(h3) {
                font-size: 1.5rem;
                font-weight: 700;
                margin: 2rem 0;
            }

            :deep(p) {
                font-size: 1.1rem;
                line-height: 2rem;
                margin-bottom: 2rem;
            }
        }

        .rght {
            // background-color: red;
            height: 100%;
            position: relative;

            .innn {
                position: sticky;
                top: 0;
                left: 0;
                right: 0;
                border-radius: var(--ui-radius);
                padding: 1rem;
                padding-top: 4rem;


                .subCont {
                    // background-color: hsl(from #000000 h s l / 0.05);
                    border-radius: var(--ui-radius);
                    border: 1px solid var(--color-orange-500);
                    padding: 1rem;

                    :deep(*) {
                        font-size: 1.1rem;
                        line-height: 2rem;
                        margin-bottom: 2rem;
                    }
                    :deep(strong) {
                        color: var(--color-orange-500);
                    }
                }
            }
        }
    }
}
</style>