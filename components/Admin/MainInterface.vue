<template>
    <div class="interface">
        <div class="first">
            <h2>Dashboard</h2>
            <UDropdownMenu :items="items" :ui="{ content: 'w-48' }" :popper="{ placement: 'bottom-end', offset: 8 }">
                <UButton :label="getShortName(bcName)" color="neutral" size="xl" variant="ghost"
                    icon="solar:user-circle-bold-duotone" />
            </UDropdownMenu>
        </div>
        <Dashboard />

    </div>
</template>

<script setup>
import Dashboard from './Dashboard.vue';

const bcId = useCookie('bcId', { sameSite: 'lax' })
const bcName = useCookie('bcName', { sameSite: 'lax' })
const bcEmail = useCookie('bcEmail', { sameSite: 'lax' })

const items = [
    [
        {
            label: bcName.value || 'User name',
            icon: 'solar:user-bold-duotone',
            disabled: true
        },
        {
            label: bcEmail.value || 'User email',
            icon: 'solar:mailbox-bold-duotone',
            disabled: true
        },
        {
            label: bcId.value || 'User id',
            icon: 'solar:user-id-bold-duotone',
            disabled: true
        }
    ],
    [
        {
            label: 'Log out',
            color: 'error',
            icon: 'solar:lock-keyhole-minimalistic-bold-duotone'
        }
    ]
]

const getShortName = (name) => {
    return name.length > 6 ? `${name.slice(0, 6)}...` : name
}

</script>

<style lang="scss" scoped>
.interface {
    .first {
        width: 100%;
        background-color: #eeeeee;
        padding: 1rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #c7c7c7;
        position: relative;

        @media (prefers-color-scheme: 'dark') {
            background-color: #333333;
            border-right: 1px solid #3d3d3d;
        }

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
        }
    }
}
</style>