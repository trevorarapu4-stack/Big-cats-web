<template>
    <div class="gallery">
        <div class="list" v-if="forGalleryAllGallery.length > 0">
            <UCard v-for="value in forGalleryAllGallery" :key="value.$id">
                <template #header>
                    <h3>{{ value.name }}</h3>
                </template>

                <template #default>
                    <img :src="value.image" :alt="value.name">
                    <p>{{ value.description }}</p>
                </template>

                <template #footer>
                    <div class="acts flex gap-4">
                        <UButton color="neutral">Edit</UButton>
                        <UButton color="error" variant="outline" @click="initialDelete(value)">Delete</UButton>
                    </div>
                </template>
            </UCard>
        </div>
        <empty-section section="Gallery" v-else />

        <div class="add">
            <UButton @click="isAddModal = true" icon="solar:add-circle-bold-duotone" label="Add images" />
        </div>

        <UModal v-model:open="isAddModal">
            <template #content>
                <div class="galCont">
                    <div class="selects">
                        <UFileUpload layout="list" multiple label="Drop your images here"
                            description="SVG, PNG, JPG or GIF (max. 2MB)" class="w-full" :ui="{
                                base: 'min-h-48'
                            }" v-model="selectedImages" />
                    </div>
                    <div class="side">
                        <UFormField label="Image(s) title" required class="mt-5">
                            <UInput placeholder="Title..." v-model="imageContent.name" class="w-full" />
                        </UFormField>
                        <UFormField label="Image(s) description" required class="mt-5">
                            <UTextarea placeholder="summary..." v-model="imageContent.description" class="w-full"
                                autoresize />
                        </UFormField>
                        <UButton class="mt-5" :disabled="processingData" @click="uploadData">
                            <Icon v-if="processingData" name="svg-spinners:270-ring"
                                style="font-size: 1.3rem; margin-right: 0.2rem;" />
                            Upload Image(s)
                        </UButton>
                    </div>
                </div>
            </template>
        </UModal>

        <UModal v-model:open="isDeleteModal" :ui="{ footer: 'justify-end' }">
            <template #header>
                <div class="to">
                    <h3>Delete Image</h3>
                    <p>Would you like to delete the destinations {{ docToDelete?.title }}.</p>
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
import { useGallery } from '#imports'

const forGallery = useGallery()
const forGalleryAllGallery = computed(() => forGallery.allGallery)

const processingData = useCookie('processingData', { sameSite: 'lax' })
const isAddModal = ref(false)
const forNotifier = useNotifier()
const forLoader = useLoader()
const forImageUpload = useImageUpload()
const { database, ID } = useAppwrite()

const selectedImages = ref(null)
const imageContent = ref({
    image: '',
    name: '',
    description: ''
})

const uploadData = async () => {
    console.log(selectedImages.value)
    console.log(imageContent.value)

    if (!selectedImages.value || selectedImages.value.length < 0) {
        forNotifier(false, 'Please select one or two images.')
        return
    }
    if (!imageContent.value.name || !imageContent.value.description) {
        forNotifier(false, 'Please give the images a title and a descriptions')
        return
    }

    for (const [index, element] of selectedImages.value.entries()) {

        forLoader.showLoader(`@galleryImg${index}`, `Uploading to gallery`, `Currently uploading image number ${index + 1}`)
        const url = await forImageUpload.handleUpload('Gallery', element, element.name)

        if (url) {
            imageContent.value.image = url

            await database.createDocument(
                useRuntimeConfig().public.APPWRITE_DB_ID,
                useRuntimeConfig().public.APPWRITE_GALLERY_COLL_ID,
                ID.unique(),
                imageContent.value
            )

            forLoader.removeLoader(`@galleryImg${index}`)
            forNotifier(true, `Image number ${index + 1} was uploaded successfully`)

            if (index + 1 === selectedImages.value.length) {
                imageContent.value.image = ''
                imageContent.value.name = ''
                imageContent.value.description = ''
                selectedImages.value = null
            }

        } else {
            forLoader.removeLoader(`@galleryImg${index}`)
            forNotifier(false, 'No image location was found')
        }
    }
}

const docToDelete = ref(null)
const isDeleteModal = ref(false)
const initialDelete = (doc) => {
    docToDelete.value = doc
    isDeleteModal.value = true
}

</script>

<style lang="scss" scoped>
.gallery {
    padding: 1rem;
    .list {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

        img {
            height: 200px;
            width: 100%;
            object-fit: cover;
            display: block;
            border-radius: var(--ui-radius);
            margin-bottom: 1rem;
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

    .add {
        position: fixed;
        right: 0;
        bottom: 0;
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

.galCont {
    // background-color: red;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    padding: 1.5rem;
    max-height: 70vh;
    overflow: auto;

    /* width */
    &::-webkit-scrollbar {
        width: 15px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #ffffff;

        @media (prefers-color-scheme: 'dark') {
            background-color: #181818;
        }
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: var(--color-orange-500);
        border-radius: 2rem;
        border: 3px solid #181818;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #000;
    }

}
</style>