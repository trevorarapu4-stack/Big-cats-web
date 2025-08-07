<template>
    <div class="addCate">
        <div class="inner">
            <UFileUpload color="neutral" highlight label="Drop your image here" description="SVG, PNG, JPG or GIF"
                class="w-full min-h-68" v-model="selectedImage" />
            <UFormField label="Category Title" class="mt-5">
                <UInput placeholder="Title..." v-model="categoryForm.title" class="w-full" />
            </UFormField>
            <UFormField label="Category Summary" class="mt-5">
                <UTextarea placeholder="summary..." v-model="categoryForm.summary" class="w-full" autoresize />
            </UFormField>
            <UButton class="mt-5" :disabled="processingData" @click="uploadData">
                <Icon v-if="processingData" name="svg-spinners:270-ring"
                    style="font-size: 1.3rem; margin-right: 0.2rem;" />
                Upload Category
            </UButton>
        </div>
    </div>
</template>

<script setup>
import { useLoader } from '#imports';

const selectedImage = ref(null)
const categoryForm = ref({
    image: null,
    title: '',
    summary: ''
})

const processingData = useCookie('processingData', { sameSite: 'lax' })
const forLoader = useLoader()
const forNotifier = useNotifier()
const forImageUpload = useImageUpload()
const { database, ID } = useAppwrite()

const uploadData = async () => {

    console.log(selectedImage.value)
    console.log(categoryForm.value)

    if (!categoryForm.value.title && !categoryForm.value.summary) {
        forNotifier(false, 'Please add a title and summary')
    }

    forLoader.showLoader('@uploadingCategory', 'Please wait', 'Still working on uploading your category ⚒️')
    try {
        const url = await forImageUpload.handleUpload('categories', selectedImage.value, categoryForm.value.title)
        if (url) {

            categoryForm.value.image = url
            try {
                await database.createDocument(
                    useRuntimeConfig().public.APPWRITE_DB_ID,
                    useRuntimeConfig().public.APPWRITE_CATEGORIES_COLL_ID,
                    ID.unique(),
                    categoryForm.value
                )

                forLoader.removeLoader('@uploadingCategory')
                forNotifier(true, '😎 Congratulations! your new category has been uploaded successfully')

                categoryForm.value.image = null
                categoryForm.value.title = ''
                categoryForm.value.summary = ''
                selectedImage.value = null

            } catch (error) {
                console.log(error)
                forLoader.removeLoader('@uploadingCategory')
                forNotifier(false, error.message)
            }

        } else {
            forLoader.removeLoader('@uploadingCategory')
            forNotifier(false, 'Image upload failed or no image was selected')
        }

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@uploadingCategory')
        forNotifier(false, error.message)
    }
}

</script>

<style lang="scss" scoped>
.addCate {

    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem;

    .inner {
        max-width: 800px;
        width: 100%;
    }
}
</style>