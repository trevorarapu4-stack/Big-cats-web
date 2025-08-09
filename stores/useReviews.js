import { defineStore } from "pinia";

export const useReviews = defineStore('dataStoreUseReviews', ({
    state: () => ({
        allReviews: []
    }),

    actions: {
        async fetchAndWatchReviews() {

            const { database, Query, client } = useAppwrite()
            const forLoader = useLoader()

            let allDocuments = [];
            let hasMore = true;
            let lastId = null;

            try {

                forLoader.showLoader('@fetchingReviews', 'Please wait', 'Still working on getting reviews')
                while (hasMore) {
                    const query = [Query.limit(100)];
                    if (lastId) {
                        query.push(Query.cursorAfter(lastId));
                    }

                    const response = await database.listDocuments(
                        useRuntimeConfig().public.APPWRITE_DB_ID,
                        useRuntimeConfig().public.APPWRITE_REVIEWS_COLL_ID,
                        query
                    );

                    // Append the newly fetched documents to the allDocuments array
                    allDocuments = [...allDocuments, ...response.documents];

                    if (response.documents.length > 0) {
                        lastId = response.documents[response.documents.length - 1].$id;
                        hasMore = response.documents.length === 100; // Continue if batch is full
                    } else {
                        hasMore = false; // Stop if no more documents are found
                    }
                }

                forLoader.removeLoader('@fetchingReviews')
                this.allReviews = allDocuments;

                client.subscribe(
                    `databases.${useRuntimeConfig().public.APPWRITE_DB_ID}.collections.${useRuntimeConfig().public.APPWRITE_REVIEWS_COLL_ID}.documents`,
                    (response) => {
                        const document = response.payload;
                        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
                            const there = this.allReviews.some(doc => doc.$id === document.$id)
                            if (!there) {
                                this.allReviews.push(document);
                            }
                        }
                        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
                            const index = this.allReviews.findIndex(doc => doc.$id === document.$id);
                            if (index !== -1) {
                                this.allReviews[index] = document;
                            }
                        }
                        if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
                            this.allReviews = this.allReviews.filter(doc => doc.$id !== document.$id);
                        }
                    }
                );

            } catch (error) {
                forLoader.removeLoader('@fetchingReviews')
                console.error('Failed to fetch data:', error);
            }
        }
    }
}))