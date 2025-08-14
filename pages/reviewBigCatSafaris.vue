<template>
    <div class="revCont">
        <Head>
            <Title>{{ pageData.heading }}</Title>
            <Meta name="description" :content="pageData.paragraph" />
        </Head>
        <top-intro-section :intro-data="pageData" />
        <div class="inner">
            <div class="top">
                <Icon name="material-symbols:reviews-outline-rounded" />
                <h2>Tell us about your experience</h2>
            </div>
            <div class="list">

                <UFormField label="Rating" name="rating">
                    <div class="stars">
                        <Icon name="solar:star-circle-bold-duotone" @click="reviewForm.stars = 1"
                            :class="reviewForm.stars > 0 ? 'active' : ''" />
                        <Icon name="solar:star-circle-bold-duotone" @click="reviewForm.stars = 2"
                            :class="reviewForm.stars > 1 ? 'active' : ''" />
                        <Icon name="solar:star-circle-bold-duotone" @click="reviewForm.stars = 3"
                            :class="reviewForm.stars > 2 ? 'active' : ''" />
                        <Icon name="solar:star-circle-bold-duotone" @click="reviewForm.stars = 4"
                            :class="reviewForm.stars > 3 ? 'active' : ''" />
                        <Icon name="solar:star-circle-bold-duotone" @click="reviewForm.stars = 5"
                            :class="reviewForm.stars > 4 ? 'active' : ''" />
                    </div>
                </UFormField>
                <UFormField label="Your Name" name="name">
                    <UInput v-model="reviewForm.name" class="w-full" />
                </UFormField>
                <UFormField label="Title" name="title">
                    <UInput v-model="reviewForm.title" class="w-full" />
                </UFormField>
                <UFormField label="Message" name="message">
                    <UTextarea v-model="reviewForm.message" class="w-full" autoresize />
                </UFormField>
                <UButton label="Send Review" class="w-fit" @click="sendReview" />
            </div>
        </div>
    </div>
</template>

<script setup>

const pageData = ref({
    image: '/images/review.webp',
    heading: 'Review Big cats Safaris',
    paragraph: 'Our guests are at the heart of everything we do, and nothing makes us happier than hearing about their incredible journeys with Big Cat Safaris.'
})

const reviewForm = ref({
    image: null,
    name: '',
    title: '',
    message: '',
    stars: 5
})

const { database, ID } = useAppwrite()
const forLoader = useLoader()
const forNotifier = useNotifier()
const router = useRouter()

const sendReview = async () => {
    console.log(reviewForm.value)

    forLoader.showLoader('@uploadingReview', 'Processing', 'We are uploading your review. Please wait a moment')

    try {
        await database.createDocument(
            useRuntimeConfig().public.APPWRITE_DB_ID,
            useRuntimeConfig().public.APPWRITE_REVIEWS_COLL_ID,
            ID.unique(),
            reviewForm.value
        )
        forLoader.removeLoader('@uploadingReview')
        forNotifier(true, 'Your review was well received. Thank you and have a nice day 👋')

        reviewForm.value.name = ''
        reviewForm.value.title = ''
        reviewForm.value.message = ''
        reviewForm.value.stars = 5

        setTimeout(() => {
            router.push('/')
        }, 3000);

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@uploadingReview')
        forNotifier(false, `🥺 ${error.message}` || '🥺 Process failed. we could not accept your review')
    }
}

</script>

<style lang="scss" scoped>
.revCont {
    .inner {
        max-width: 800px;
        padding: 1rem;
        margin: auto;

        .top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;

            padding: 2rem;

            span {
                font-size: 5rem;
            }

            h2 {
                font-size: 2rem;
            }
        }

        .list {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .stars {
                display: flex;
                gap: 1rem;

                span {
                    font-size: 3rem;
                    cursor: pointer;
                }

                .active {
                    color: var(--color-orange-500);
                }
            }
        }
    }
}
</style>