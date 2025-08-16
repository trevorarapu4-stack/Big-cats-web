<template>
    <div class="singleTour">
        <Head>
            <Title>{{ forBlogDoc?.title }} From Big Cat Safaris</Title>
            <Meta name="description" :content="forBlogDoc?.summary" />
        </Head>
        <div class="inner">
            <h1 v-if="forBlogDoc?.title" >{{ forBlogDoc?.title }}</h1>
            <USkeleton v-else class="h-18 w-full" />
            <p v-if="forBlogDoc?.title" >Written By Big Cat Safaris</p>
            <USkeleton v-else class="h-6 mt-5 w-[200px]" />
            <div class="bb">
                <u-button icon="solar:square-share-line-bold-duotone" variant="outline" label="Share this blog" />
            </div>
            <img v-if="forBlogDoc?.image" :src="forBlogDoc?.image" :alt="forBlogDoc?.title">
            <USkeleton v-else class="h-80 w-full" />
            <div class="bCont" v-if="forBlogDoc?.content" v-html="getHtml(forBlogDoc?.content)"></div>
            <div class="bCont" v-else >
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
                <USkeleton class="h-4 mt-5 w-fill" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSingleBlog } from '#imports';
import { marked } from 'marked';

const forBlog = useSingleBlog()
const forBlogDoc = computed(() => forBlog.singleBlog)
const route = useRoute()

onMounted(async () => {
    await forBlog.setAndWatchBlog(route.params.id)
})

const getHtml = (cont) => {
    return cont ? marked(cont) : ''
}

</script>

<style lang="scss" scoped>
.singleTour {
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {

        display: flex;
        // align-items: center;
        justify-content: center;
        flex-direction: column;
        max-width: 900px;
        width: 100%;
        margin: auto;
        padding: 5rem 1rem;

        h1,
        p,
        img,
        .bCont {
            width: 100%;
        }

        h1 {
            font-size: 3rem;
        }
        
        .bb {
            margin: 2rem 0;
            button {
                width: fit-content;
            }
        }

        img {
            border-radius: var(--ui-radius);
            margin-bottom: 2rem;
        }

        .bCont {
            :deep(p) {
                line-height: 2.7rem;
                margin-bottom: 1.5rem;
            }
        }

    }
}
</style>