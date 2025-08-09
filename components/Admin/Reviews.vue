<template>
    <div class="reviews">
        <div class="list" v-if="forReviewsList?.length > 0">
            <UCard v-for="value in forReviewsList" :key="value.$id">
                <template #header>
                    <h3>{{ value.title }}</h3>
                </template>

                <template #default>
                    <div class="info">
                        <div class="forImg">
                            <img v-if="value.image" :src="value.image" :alt="value.name">
                            <img v-else
                                :src="`https://ui-avatars.com/api/?name=${value.name}&background=random&size=500`"
                                :alt="value.name">
                            <input type="file" :id="`serviceMainImage-${value.$id}`" @change="updateProfileImg(value.$id, value.name, value.image)"
                                style="display: none;">
                            <label class="biLabel" :for="`serviceMainImage-${value.$id}`">
                                <Icon v-if="processingData" name="svg-spinners:ring-resize" />
                                <p v-else>Choose</p>
                            </label>
                        </div>
                        <h3>{{ value.name }}</h3>
                        <div class="stars">
                            <Icon name="solar:star-circle-bold-duotone" v-for="i in value.stars" :key="i" />
                        </div>
                        <p>{{ value.message }}</p>
                    </div>
                </template>

                <template #footer>
                    <div class="acts flex gap-4">
                        <UButton color="neutral" v-if="!value.visible"
                            @click="changeVisibility(true, value.name, value.$id)">Show</UButton>
                        <UButton color="primary" v-if="value.visible"
                            @click="changeVisibility(false, value.name, value.$id)">Hide</UButton>
                        <UButton color="error" variant="outline" @click="initialDelete(value)">Delete</UButton>
                    </div>
                </template>
            </UCard>
        </div>
        <empty-section section="Reviews" v-else />

        <UModal v-model:open="isDeleteModal" :ui="{ footer: 'justify-end' }">
            <template #header>
                <div class="to">
                    <h3>Delete Reviews</h3>
                    <p>Would you like to delete the review by {{ docToDelete?.name }}.</p>
                </div>
            </template>

            <template #body>
                <img class="delImg w-full h-52 object-cover" :src="docToDelete?.image" :alt="docToDelete?.title">
            </template>

            <template #footer="{ close }">
                <UButton label="keep" color="neutral" @click="close" />
                <UButton label="Yes! delete" color='error' variant="outline" />
            </template>
        </UModal>

    </div>
</template>

<script setup>
import { useReviews } from '#imports';

const forReviews = useReviews()
const forReviewsList = computed(() => forReviews.allReviews)

const docToDelete = ref(null)
const isDeleteModal = ref(false)
const initialDelete = (doc) => {
    docToDelete.value = doc
    isDeleteModal.value = true
}

const { database } = useAppwrite()
const forNotifier = useNotifier()
const forLoader = useLoader()
const forImageUpload = useImageUpload()
const processingData = useCookie('processingData', { sameSite: 'lax' })

const changeVisibility = async (val, name, revId) => {
    console.log(val)

    forLoader.showLoader('@changingVisibility', 'Updating Visiblity', `We are updating ${name}'s review status`)
    try {

        await database.updateDocument(
            useRuntimeConfig().public.APPWRITE_DB_ID,
            useRuntimeConfig().public.APPWRITE_REVIEWS_COLL_ID,
            revId,
            { 'visible': val }
        )

        forLoader.removeLoader('@changingVisibility')
        forNotifier(true, `👍 ${val ? `Everyone can see ${name}'s review on the website` : `${name}'s is now hidden from everyone on the website.`}`)

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@changingVisibility')
        forNotifier(false, error.message || `We are not able to update ${name}'s visibility status`)
    }
}

const updateProfileImg = async (docId, docName, docImage) => {
    const fileInput = document.getElementById(`serviceMainImage-${docId}`);
    const file = fileInput?.files?.[0]
    if (!file) {
        forNotifier(false, 'You need to choose an image to update the profile.')
        return
    }

    console.log(file)
    console.log(docId, docName, docImage)

    forLoader.showLoader('@updatingRevImage', `Updating ${docName}'s image`, 'Please wait while we update your review image')
    try {
        const url = await forImageUpload.handleUpload('ProfileImages', file, docName)

        if (url) {
            await forImageUpload.deleteExistingImage(docImage)
            await database.updateDocument(
                useRuntimeConfig().public.APPWRITE_DB_ID,
                useRuntimeConfig().public.APPWRITE_REVIEWS_COLL_ID,
                docId,
                { 'image': url }
            )
            forLoader.removeLoader('@updatingRevImage')
            forNotifier(true, `😎 ${docName}'s profile image has been updated successfully`)
        } else {
            forLoader.removeLoader('@updatingRevImage')
            forNotifier(false, 'process failed! It seems the image upload failed')
        }

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@updatingRevImage')
        forNotifier(false, error.message || 'process failed')
    }

}

</script>

<style lang="scss" scoped>
.reviews {
    position: relative;
    max-width: 1000px;
    margin: auto;
    padding: 1rem;

    .list {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

        .info {

            .forImg {

                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                width: fit-content;
                margin-bottom: 1rem;

                img {
                    height: 100px;
                    width: 100px;
                    object-fit: cover;
                    display: block;
                    border-radius: 50%;
                }

                .biLabel {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    opacity: 0;
                    cursor: pointer;
                }

                &:hover {
                    .biLabel {
                        opacity: 1;
                    }
                }
            }

            .stars {
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.4rem;

                span {
                    font-size: 1.5rem;
                    color: var(--color-orange-500);
                }
            }

            p {
                font-size: 1rem;

                line-clamp: 5;
                -webkit-line-clamp: 5;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

        }
    }

    .addButton {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 1rem;
    }
}

.to {
    h3 {
        font-size: 1.3rem;
    }

    p {
        font-size: 1rem;
    }
}

.delImg {
    border-radius: var(--ui-radius);
}
</style>