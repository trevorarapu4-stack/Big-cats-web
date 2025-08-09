<template>
    <div class="addBlo">
        <div class="inner">
            <UFileUpload color="neutral" highlight label="Drop your image here" description="SVG, PNG, JPG or GIF"
                class="w-full min-h-68" v-model="selectedImage" />
                <UFormField label="Title" class="mt-5">
                    <UInput placeholder="Title..." v-model="blogForm.title" class="w-full" />
                </UFormField>
            <UFormField label="Summary" class="mt-5">
                <UTextarea placeholder="summary..." v-model="blogForm.summary" class="w-full" autoresize />
            </UFormField>
            <UFormField label="Content" class="mt-5">
                <ClientOnly>
                    <ckeditor v-if="editor" v-model="blogForm.content" :editor="editor" :config="config" />
                </ClientOnly>
            </UFormField>
            <UButton class="mt-5" :disabled="processingData" @click="uploadData">
                <Icon v-if="processingData" name="svg-spinners:270-ring"
                    style="font-size: 1.3rem; margin-right: 0.2rem;" />
                Upload Blog
            </UButton>
        </div>
    </div>
</template>

<script setup>
import { useLoader } from '#imports';
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';

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

    const {
        Alignment,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        BlockToolbar,
        Bold,
        Bookmark,
        CloudServices,
        CodeBlock,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Heading,
        Highlight,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        ListProperties,
        Markdown,
        MediaEmbed,
        Paragraph,
        PasteFromMarkdownExperimental,
        PasteFromOffice,
        RemoveFormat,
        SimpleUploadAdapter,
        Strikethrough,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TodoList,
        Underline
    } = cloud.data.value.CKEditor;
    return {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'removeFormat',
                '|',
                'horizontalLine',
                'link',
                'bookmark',
                'insertImage',
                'insertImageViaUrl',
                'mediaEmbed',
                'insertTable',
                'highlight',
                'blockQuote',
                'codeBlock',
                '|',
                'alignment',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            Alignment,
            AutoImage,
            AutoLink,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            BlockToolbar,
            Bold,
            Bookmark,
            CloudServices,
            CodeBlock,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Heading,
            Highlight,
            HorizontalLine,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            ListProperties,
            Markdown,
            MediaEmbed,
            Paragraph,
            PasteFromMarkdownExperimental,
            PasteFromOffice,
            RemoveFormat,
            SimpleUploadAdapter,
            Strikethrough,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TodoList,
            Underline
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
        blockToolbar: [
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'insertImage',
            'insertTable',
            '|',
            'bulletedList',
            'numberedList',
            'outdent',
            'indent'
        ],
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage'
            ]
        },
        licenseKey: useRuntimeConfig().public.CKEDITOR_LICENSE_KEY,
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        menuBar: {
            isVisible: true
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    };
});

const bcName = useCookie('bcName', { sameSite: 'lax' })
const selectedImage = ref(null)
const blogForm = ref({
    image: null,
    title: '',
    summary: '',
    content: '',
    author: bcName.value
})

const processingData = useCookie('processingData', { sameSite: 'lax' })
const forLoader = useLoader()
const forNotifier = useNotifier()
const forImageUpload = useImageUpload()
const { database, ID } = useAppwrite()

const uploadData = async () => {

    // console.log(selectedImage.value)
    // console.log(blogForm.value)
    // return

    if (
        !blogForm.value.title &&
        !blogForm.value.summary &&
        !blogForm.value.content) {
        forNotifier(false, 'Please add a title, summary, and some content.')
    }

    forLoader.showLoader('@uploadingBlog', 'Please wait', 'Still working on uploading your blog ⚒️')
    try {
        const url = await forImageUpload.handleUpload('blogs', selectedImage.value, blogForm.value.title)
        if (url) {
            blogForm.value.image = url

            try {
                await database.createDocument(
                    useRuntimeConfig().public.APPWRITE_DB_ID,
                    useRuntimeConfig().public.APPWRITE_BLOGS_COLL_ID,
                    ID.unique(),
                    blogForm.value
                )

                forLoader.removeLoader('@uploadingBlog')
                forNotifier(true, '😎 Congratulations! your new blog has been uploaded successfully')

                blogForm.value.image = null
                blogForm.value.title = ''
                blogForm.value.summary = ''
                blogForm.value.content = ''
                selectedImage.value = null

            } catch (error) {
                console.log(error)
                forLoader.removeLoader('@uploadingBlog')
                forNotifier(false, error.message)
            }

        } else {
            forLoader.removeLoader('@uploadingBlog')
            forNotifier(false, 'Image upload failed or no image was selected')
        }

    } catch (error) {
        console.log(error)
        forLoader.removeLoader('@uploadingBlog')
        forNotifier(false, error.message)
    }
}

</script>

<style lang="scss" scoped>
.addBlo {

    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem;

    .inner {
        max-width: 800px;
        width: 100%;

        .info {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        }
    }
}
</style>