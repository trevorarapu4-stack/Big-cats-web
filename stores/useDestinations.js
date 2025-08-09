import { defineStore } from "pinia";

export const useDestinations = defineStore('dataStoreUseDestinations', ({
    state: () => ({
        allDestinations: []
    }),

    actions: {
        async fetchAndWatchDestinations() {

            const { database, Query, client } = useAppwrite()
            const forLoader = useLoader()

            let allDocuments = [];
            let hasMore = true;
            let lastId = null;

            try {

                forLoader.showLoader('@fetchingDestinations', 'Please wait', 'Still working on getting destinations')
                while (hasMore) {
                    const query = [Query.limit(100)];
                    if (lastId) {
                        query.push(Query.cursorAfter(lastId));
                    }

                    const response = await database.listDocuments(
                        useRuntimeConfig().public.APPWRITE_DB_ID,
                        useRuntimeConfig().public.APPWRITE_DESTINATIONS_COLL_ID,
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

                forLoader.removeLoader('@fetchingDestinations')
                this.allDestinations = allDocuments;

                client.subscribe(
                    `databases.${useRuntimeConfig().public.APPWRITE_DB_ID}.collections.${useRuntimeConfig().public.APPWRITE_DESTINATIONS_COLL_ID}.documents`,
                    (response) => {
                        const document = response.payload;
                        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
                            const there = this.allDestinations.some(doc => doc.$id === document.$id)
                            if (!there) {
                                this.allDestinations.push(document);
                            }
                        }
                        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
                            const index = this.allDestinations.findIndex(doc => doc.$id === document.$id);
                            if (index !== -1) {
                                this.allDestinations[index] = document;
                            }
                        }
                        if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
                            this.allDestinations = this.allDestinations.filter(doc => doc.$id !== document.$id);
                        }
                    }
                );

            } catch (error) {
                forLoader.removeLoader('@fetchingDestinations')
                console.error('Failed to fetch data:', error);
            }
        }
    }
}))