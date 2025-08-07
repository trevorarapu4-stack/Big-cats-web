<template>
    <div class="addMem">
        <div class="inner">
            <UFileUpload color="neutral" highlight label="Drop your image here" description="SVG, PNG, JPG or GIF"
                class="w-68 min-h-68" v-model="selectedImage" />
            <UFormField label="Name" class="mt-5">
                <UInput placeholder="Name..." v-model="memberForm.name" class="w-full" />
            </UFormField>
            <UFormField label="Position" class="mt-5">
                <UInput placeholder="Position..." v-model="memberForm.position" class="w-full" />
            </UFormField>
            <UFormField label="About" class="mt-5">
                <ClientOnly>
                    <ckeditor v-if="editor" v-model="memberForm.about" :editor="editor" :config="config" />
                </ClientOnly>
            </UFormField>
            <UButton class="mt-5" :disabled="processingData" @click="uploadData">
                <Icon v-if="processingData" name="svg-spinners:270-ring"
                    style="font-size: 1.3rem; margin-right: 0.2rem;" />
                Upload Member
            </UButton>
        </div>
    </div>
</template>

<script setup>
import { useLoader } from '#imports';
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';

const selectedImage = ref(null)
const memberForm = ref({
    image: null,
    name: '',
    position: '',
    about: '',
})

const processingData = useCookie('processingData', { sameSite: 'lax' })
const forLoader = useLoader()
const forNotifier = useNotifier()
const forImageUpload = useImageUpload()
const { database, ID } = useAppwrite()

const uploadData = async () => {

    // console.log(selectedImage.value)
    // console.log(memberForm.value)
    // return

    if (!memberForm.value.name && !memberForm.value.position) {
        forNotifier(false, 'Please add a title and summary')
    }

    forLoader.showLoader('@uploadingMember', 'Please wait', 'Still working on uploading your member ⚒️')
    try {
        const url = await forImageUpload.handleUpload('members', selectedImage.value, memberForm.value.name)
        if (url) {
            memberForm.value.image = url

            try {
                await database.createDocument(
                    useRuntimeConfig().public.APPWRITE_DB_ID,
                    useRuntimeConfig().public.APPWRITE_MEMBERS_COLL_ID,
                    ID.unique(),
                    memberForm.value
                )

                forLoader.removeLoader('@uploadingMember')
                forNotifier(true, '😎 Congratulations! your new member has been uploaded successfully')

                memberForm.value.image = null
                memberForm.value.name = ''
                memberForm.value.position = ''
                memberForm.value.about = ''
                selectedImage.value = null

            } catch (error) {
                console.log(error)
                forLoader.removeLoader('@uploadingMember')
                forNotifier(false, error.message)
            }

        } else {
            forLoader.removeLoader('@uploadingMember')
            forNotifier(false, 'Image upload failed or no image was selected')
        }

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@uploadingMember')
        forNotifier(false, error.message)
    }
}

// editor
const cloud = useCKEditorCloud({
    version: '46.0.0',
    premium: false
});

const editor = computed(() => {
    if (!cloud.data.value) {
        return null;
    }

    return cloud.data.value.CKEditor.ClassicEditor;
});

const config = computed(() => {
    if (!cloud.data.value) {
        return null;
    }

    const { Essentials, Paragraph, Bold, Italic } = cloud.data.value.CKEditor;
    return {
        licenseKey: useRuntimeConfig().public.CKEDITOR_LICENSE_KEY,
        plugins: [Essentials, Paragraph, Bold, Italic],
        toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|']
    };
});

</script>

<style lang="scss" scoped>
.addMem {

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