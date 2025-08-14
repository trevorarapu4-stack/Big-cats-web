import { defineStore } from "pinia";
import { useBlogs } from "#imports";

export const useSingleBlog = defineStore('dataStoreUseSingleBlog', {

    state: () => ({
        singleBlog: null
    }),

    actions: {

        async setAndWatchBlog(id) {

            const forBlogs = useBlogs()
            const forBlogsList = computed(() => forBlogs.blogs)
            const { database, client } = useAppwrite()
            const forLoader = useLoader()

            forLoader.showLoader('@fetchingSingleBlog', 'Just a moment', '⚒️ Lets get your Blog ready.')
            if (forBlogsList.value && forBlogsList.value.length > 0) {
                const found = forBlogsList.value.find(doc => doc.$id === id)
                if (found) {
                    this.singleBlog = found
                }
            } else {
                try {
                    const fetchedDoc = await database.getDocument(
                        useRuntimeConfig().public.APPWRITE_DB_ID,
                        useRuntimeConfig().public.APPWRITE_BLOGS_COLL_ID,
                        id
                    )
                    this.singleBlog = fetchedDoc
                } catch (error) {
                    console.log(error)
                }
            }
            forLoader.removeLoader('@fetchingSingleBlog')

            client.subscribe(
                `databases.${useRuntimeConfig().public.APPWRITE_DB_ID}.collections.${useRuntimeConfig().public.APPWRITE_BLOGS_COLL_ID}.documents.${id}`,
                (response) => {
                    const document = response.payload;
                    if (response.events.includes('databases.*.collections.*.documents.*.update')) {
                        this.singleBlog = document;
                    }
                }
            );

        }

    }

})