<template>
    <div class="members">
        <div class="list" v-if="forMembersList.length > 0">
            <UCard v-for="value in forMembersList" :key="value.$id">
                <template #header>
                    <h3>{{ value.title }}</h3>
                </template>

                <template #default>
                    <img :src="value.image" :alt="value.title">
                    <p>{{ value.summary }}</p>
                </template>

                <template #footer>
                    <div class="acts flex gap-4">
                        <UButton color="neutral">Edit</UButton>
                        <UButton color="error" variant="outline" @click="initialDelete(value)">Delete</UButton>
                    </div>
                </template>
            </UCard>
        </div>
        <empty-section section="Members" v-else />
        <div class="addButton">
            <UButton @click="adminComponent = 'Add Members'" icon="solar:add-circle-bold-duotone" label="Add New Member" />
        </div>

        <UModal v-model:open="isDeleteModal" :ui="{ footer: 'justify-end' }">
            <template #header>
                <div class="to">
                    <h3>Delete Members</h3>
                    <p>Would you like to delete the member {{ docToDelete?.title }}.</p>
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
import { useMembers } from '#imports';

const forMembers = useMembers()
const forMembersList = computed(() => forMembers.allMembers)
const adminComponent = useCookie('adminComponent', { sameSite: 'lax' })

const docToDelete = ref(null)
const isDeleteModal = ref(false)
const initialDelete = (doc) => {
    docToDelete.value = doc
    isDeleteModal.value = true
}

</script>

<style lang="scss" scoped>
.members {
    position: relative;
    max-width: 1000px;
    margin: auto;
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