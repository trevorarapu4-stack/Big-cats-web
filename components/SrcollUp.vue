<template>
    <div>
        <div class="toTop" id="toTop" @click="goUp">
            <Icon name="solar:square-double-alt-arrow-up-bold-duotone" />
        </div>
    </div>
</template>

<script setup>

// activate litsener
onMounted(() => {
    window.addEventListener('scroll', scrolledDown)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrolledDown)
})

// show scroll to top button
const scrolledDown = () => {
    const goUpBtn = document.getElementById('toTop')

    if (window.scrollY > 100) {
        goUpBtn.classList.add('show')
    } else {
        goUpBtn.classList.remove('show')
    }
}

// scroll to top button
const goUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

</script>

<style scoped lang="scss" >
.toTop {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: fixed;
    bottom: 0;
    right: 0;
    width: fit-content;
    margin: 2rem;
    cursor: pointer;
    display: none;
    z-index: 10;
}

.toTop span {
    font-size: 2.5rem;
    color: var(--color-orange-500);
    padding: 0;
    margin: 0;
}

.show {
    display: block;
    animation: normal bringUp 1s;
}

@keyframes bringUp {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>