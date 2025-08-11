<template>
    <UModal fullscreen :title="`Booking: ${forSingleItineraryData?.title}`" v-model:open="isBookingProcess">
        <template #body>
            <div class="steeps">
                <div class="w-full innSte">
                    <img class="demoImg" :src="forSingleItineraryData?.image" :alt="forSingleItineraryData?.title">
                    <UStepper ref="stepper" :items="items">
                        <template #content="{ item }">
                            <div class="stepCont">
                                <!-- {{ item.title }} -->
                                <div class="one" v-if="item.title === 'Your Tour'">
                                    <UFormField label="Package" name="package">
                                        <UInput class="w-full" v-model="forNewBooking.tour" disabled size="xl" />
                                    </UFormField>
                                    <UFormField label="Start Date" name="date">
                                        <UPopover>
                                            <UButton color="neutral" variant="subtle" icon="i-lucide-calendar"
                                                class="w-full" size="xl">
                                                {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) :
                                                    'Select a date' }}
                                            </UButton>

                                            <template #content>
                                                <UCalendar v-model="modelValue" class="p-2" />
                                            </template>
                                        </UPopover>
                                    </UFormField>
                                    <UFormField label="Accomodation Type" name="Accomodation type">
                                        <USelectMenu v-model="value" :items="itemss" class="w-full" size="xl" :popper="{ placement: 'bottom-start' }" />
                                    </UFormField>
                                </div>

                                <div class="one" v-if="item.title === 'Personal'">
                                    <UFormField label="Full Name" name="full name">
                                        <UInput class="w-full" size="xl" />
                                    </UFormField>
                                    <UFormField label="Email" name="email">
                                        <UInput class="w-full" size="xl" />
                                    </UFormField>
                                    <UFormField label="Country" name="country">
                                        <USelectMenu v-model="value" :items="itemss" class="w-full" size="xl" />
                                    </UFormField>
                                </div>

                                <div class="one" v-if="item.title === 'Occupancy'">
                                    <UFormField label="Number of Adults" name="adults">
                                        <UInputNumber v-model="valuez" class="w-full" size="xl" :increment="{
                                            color: 'neutral',
                                            variant: 'solid',
                                            size: 'xs'
                                        }" :decrement="{
                                            color: 'neutral',
                                            variant: 'solid',
                                            size: 'xs'
                                        }" />
                                    </UFormField>
                                    <UFormField label="Number of children" name="children">
                                        <UInputNumber v-model="valuez" class="w-full" size="xl" :increment="{
                                            color: 'neutral',
                                            variant: 'solid',
                                            size: 'xs'
                                        }" :decrement="{
                                            color: 'neutral',
                                            variant: 'solid',
                                            size: 'xs'
                                        }" />
                                    </UFormField>
                                    <UFormField label="Anything else?" name="extra">
                                        <UTextarea v-model="value" autoresize class="w-full" size="xl" />
                                    </UFormField>
                                </div>
                            </div>
                        </template>
                    </UStepper>

                    <div class="flex gap-2 justify-between mt-4">
                        <UButton leading-icon="i-lucide-arrow-left" :disabled="!stepper?.hasPrev"
                            @click="stepper?.prev()" label="previous" color="neutral" />

                        <UButton trailing-icon="i-lucide-arrow-right" :disabled="!stepper?.hasNext"
                            v-if="stepper?.hasNext" @click="stepper?.next()" label="Next" color="neutral" />
                        <UButton @click="submitBooking" label="Send Booking" v-else />
                    </div>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup>
import { useSingleItinerary } from '#imports'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
})

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))

const forSingleItinerary = useSingleItinerary()
const forSingleItineraryData = computed(() => forSingleItinerary.singleItinerary)

const isBookingProcess = useCookie('isBookingProcess', { sameSite: 'lax' })

const items = [
    {
        title: 'Your Tour',
        description: 'Please confirm your package',
        icon: 'solar:archive-down-minimlistic-bold-duotone'
    }, {
        title: 'Personal',
        description: 'Let us know who you are',
        icon: 'solar:user-circle-bold-duotone'
    }, {
        title: 'Occupancy',
        description: 'Some more information',
        icon: 'solar:menu-dots-circle-bold-duotone'
    }
]

const stepper = useTemplateRef('stepper')

const itemss = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

const valuez = ref(5)

const forNewBooking = ref({
    tour: ''
})

const submitBooking = () => {
    console.log(forNewBooking.value)
}

onMounted(() => {
    forNewBooking.value.tour = forSingleItineraryData.value?.title

    watch(forSingleItineraryData, (newV) => {
        forNewBooking.value.tour = newV.title
    })
})

</script>

<style scoped lang="scss">
.steeps {
    display: flex;
    // align-items: center;
    justify-content: center;
    height: 100%;

    .innSte {
        max-width: 700px;

        .demoImg {
            height: 150px;
            width: 100%;
            margin: 1rem 0;
            object-fit: cover;
            border-radius: var(--ui-radius);
        }

        .stepCont {
            .one {
                display: flex;
                flex-direction: column;
                gap: 1.3rem;
                padding: 3rem 0;
            }
        }
    }
}
</style>