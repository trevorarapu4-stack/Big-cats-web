<template>
    <div class="sideMenu">
        <div class="inner">
            <div class="top" @click="goHome" >
                <img src="/logo/logo.png" alt="Big Cats Safari logo">
                <p>Big Cats Safari Admin</p>
            </div>

            <div class="jumps">
                <UButton icon="solar:chart-2-bold-duotone" @click="adminComponent = 'Dashboard'" :color="adminComponent !== 'Dashboard'? 'neutral':'primary'" :variant="adminComponent !== 'Dashboard'? 'ghost':'solid'" label="Dashboard" />
                <UButton icon="solar:notebook-minimalistic-bold-duotone" @click="adminComponent = 'Itineraries'" :color="adminComponent !== 'Itineraries'? 'neutral':'primary'" :variant="adminComponent !== 'Itineraries'? 'ghost':'solid'" label="Itineraries" />
                <UButton icon="solar:info-circle-bold-duotone" @click="adminComponent = 'Blogs'" :color="adminComponent !== 'Blogs'? 'neutral':'primary'" :variant="adminComponent !== 'Blogs'? 'ghost':'solid'" label="Blogs" />
                <UButton icon="solar:pen-new-square-bold-duotone" @click="adminComponent = 'Reviews'" :color="adminComponent !== 'Reviews'? 'neutral':'primary'" :variant="adminComponent !== 'Reviews'? 'ghost':'solid'" label="Reviews" />
                <UButton icon="solar:gallery-edit-bold-duotone" @click="adminComponent = 'Gallery'" :color="adminComponent !== 'Gallery'? 'neutral':'primary'" :variant="adminComponent !== 'Gallery'? 'ghost':'solid'" label="Gallery" />
                <UButton icon="solar:add-folder-bold-duotone" @click="adminComponent = 'Categories'" :color="adminComponent !== 'Categories'? 'neutral':'primary'" :variant="adminComponent !== 'Categories'? 'ghost':'solid'" label="Categories" />
                <UButton icon="solar:pin-bold-duotone" @click="adminComponent = 'Destinations'" :color="adminComponent !== 'Destinations'? 'neutral':'primary'" :variant="adminComponent !== 'Destinations'? 'ghost':'solid'" label="Destinations" />
                <UButton icon="solar:users-group-rounded-bold-duotone" @click="adminComponent = 'Members'" :color="adminComponent !== 'Members'? 'neutral':'primary'" :variant="adminComponent !== 'Members'? 'ghost':'solid'" label="Members" />
                <UButton @click="forAuth.logOutUser" icon="solar:lock-keyhole-minimalistic-bold-duotone" color="error" variant="ghost" label="Log out" />
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

const adminComponent = useCookie('adminComponent', { sameSite: 'lax' })

onMounted(() => {
    adminComponent.value = 'Dashboard'
})

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