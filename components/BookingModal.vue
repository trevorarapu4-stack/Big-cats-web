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
                                                {{ forNewBooking.startDate ?
                                                    df.format(forNewBooking.startDate.toDate(getLocalTimeZone())) :
                                                'Select a date' }}
                                            </UButton>

                                            <template #content>
                                                <UCalendar v-model="forNewBooking.startDate" class="p-2" />
                                            </template>
                                        </UPopover>
                                    </UFormField>
                                    <UFormField label="Accomodation Type" name="Accomodation type">
                                        <USelectMenu v-model="forNewBooking.accomodationType" :items="accoType"
                                            class="w-full" size="xl" />
                                    </UFormField>
                                </div>

                                <div class="one" v-if="item.title === 'Personal'">
                                    <UFormField label="Full Name" name="full name">
                                        <UInput class="w-full" size="xl" v-model="forNewBooking.fullName" />
                                    </UFormField>
                                    <UFormField label="Email" name="email">
                                        <UInput class="w-full" size="xl" v-model="forNewBooking.email" />
                                    </UFormField>
                                    <UFormField label="Country" name="country">
                                        <USelectMenu :items="countries" class="w-full" size="xl"
                                            v-model="forNewBooking.country" />
                                    </UFormField>
                                </div>

                                <div class="one" v-if="item.title === 'Occupancy'">
                                    <UFormField label="Number of Adults" name="adults">
                                        <UInputNumber v-model="forNewBooking.adults" class="w-full" size="xl"
                                            :increment="{
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
                                        <UInputNumber v-model="forNewBooking.children" class="w-full" size="xl"
                                            :increment="{
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
                                        <UTextarea v-model="forNewBooking.extra" autoresize class="w-full" size="xl" />
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
import { countries, accoType } from '~/assets/js/usables'

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

const df = new DateFormatter('en-US', { dateStyle: 'medium' })
const stepper = useTemplateRef('stepper')

const nowDate = new Date()
const forNewBooking = ref({
    tour: '',
    startDate: new CalendarDate(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1, // CalendarDate months are 1-based
        nowDate.getDate()
    ),
    accomodationType: '',
    fullName: '',
    email: '',
    country: '',
    adults: 1,
    children: 0,
    extra: '',
})

const forLoader = useLoader()
const forNotofier = useNotifier()
const capitalizeFirst = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const submitBooking = () => {

    const list = ['accomodationType', 'fullName', 'email', 'country', 'adults', 'children', 'extra']

    for (const element of list) {
        if (!forNewBooking.value[element]) {
            forNotofier(false, `${capitalizeFirst(element)} is Required`)
            return
        }
    }

    forNewBooking.value.startDate = df.format(forNewBooking.value.startDate.toDate(getLocalTimeZone()))
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
    // height: 100%;

    .innSte {
        max-width: 700px;
        padding-bottom: 5rem;

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