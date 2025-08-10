import { defineStore } from "pinia";
import { useItineraries } from "#imports";

export const useSingleItinerary = defineStore('dataStoreUseSingleItinerary', {

    state: () => ({
        singleItinerary: null
    }),

    actions: {

        async setAndWatchItinerary(id) {

            const forItineraries = useItineraries()
            const forItinerariesList = computed(() => forItineraries.allItineraries)
            const { database, client } = useAppwrite()
            const forLoader = useLoader()

            forLoader.showLoader('@fetchingSingleTour', 'Just a moment', '⚒️ Lets get your itinerary ready.')
            if (forItinerariesList.value && forItinerariesList.value.length > 0) {
                const found = forItinerariesList.value.find(doc => doc.$id === id)
                if (found) {
                    this.singleItinerary = found
                }
            } else {
                try {
                    const fetchedDoc = await database.getDocument(
                        useRuntimeConfig().public.APPWRITE_DB_ID,
                        useRuntimeConfig().public.APPWRITE_ITINERARIES_COLL_ID,
                        id
                    )
                    this.singleItinerary = fetchedDoc
                } catch (error) {
                    console.log(error)
                }
            }
            forLoader.removeLoader('@fetchingSingleTour')

            client.subscribe(
                `databases.${useRuntimeConfig().public.APPWRITE_DB_ID}.collections.${useRuntimeConfig().public.APPWRITE_ITINERARIES_COLL_ID}.documents.${id}`,
                (response) => {
                    const document = response.payload;
                    if (response.events.includes('databases.*.collections.*.documents.*.update')) {
                        this.singleItinerary = document;
                    }
                }
            );

        }

    }

})