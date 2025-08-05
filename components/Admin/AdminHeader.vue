<template>
    <div class="sideMenu">
        <div class="inner">
            <div class="top" @click="goHome" >
                <img src="/logo/logo.png" alt="Big Cats Safari logo">
                <p>Big Cats Safari Admin</p>
            </div>

            <div class="jumps">
                <UButton icon="solar:chart-2-bold-duotone" color="primary" variant="solid" label="Dashboard" />
                <UButton icon="solar:notebook-minimalistic-bold-duotone" color="neutral" variant="ghost"
                    label="Itineraries" />
                <UButton icon="solar:info-circle-bold-duotone" color="neutral" variant="ghost" label="Blogs" />
                <UButton icon="solar:pen-new-square-bold-duotone" color="neutral" variant="ghost" label="Reviews" />
                <UButton icon="solar:gallery-edit-bold-duotone" color="neutral" variant="ghost" label="Gallery" />
                <UButton icon="solar:add-folder-bold-duotone" color="neutral" variant="ghost" label="Categories" />
                <UButton icon="solar:pin-bold-duotone" color="neutral" variant="ghost" label="Destinations" />
                <UButton icon="solar:users-group-rounded-bold-duotone" color="neutral" variant="ghost"
                    label="Members" />
                <UButton @click="forAuth.logOutUser" icon="solar:lock-keyhole-minimalistic-bold-duotone" color="error" variant="ghost"
                    label="Log out" />
            </div>
        </div>

    </div>
</template>

<script setup>

const router = useRouter()
const goHome = () => {
    router.push('/')
}

const forAuth = useAuth()

</script>

<style lang="scss" scoped>
.sideMenu {
    display: flex;
    flex-direction: column;
    background-color: #eeeeee;
    height: 100%;
    border-right: 1px solid #c7c7c7;
    position: relative;

    @media (prefers-color-scheme: 'dark') {
        background-color: #333333;
        border-right: 1px solid #3d3d3d;
    }

    .inner {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        padding: 1rem;

        .top {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            cursor: pointer;

            img {
                width: 70px;
                margin-right: 0.5rem;
            }

            p {
                display: -webkit-box;
                line-clamp: 1;
                -webkit-line-clamp: 1;
                overflow: hidden;
                -webkit-box-orient: vertical;
                font-weight: 700;
                font-size: 0.9rem;
            }
        }

        .jumps {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
}
</style>