<template>
    <div class="mainHeader">
        <div class="inner">
            <div class="top">
                <div class="cent">
                    <nuxt-link to="#">
                        <Icon name="svg-spinners:pulse-multiple" />
                        <p>Book featured tour</p>
                    </nuxt-link>
                </div>
                <div class="left">
                    <a href="tel:+">
                        <Icon name="solar:phone-calling-bold" />
                        <p>+250 793 468 377</p>
                    </a>

                    <a href="mailto:">
                        <Icon name="solar:streets-navigation-bold-duotone" />
                        <p>Info@bigcatsafaris.rw</p>
                    </a>
                </div>
                <div class="right">
                    <a href="http://">
                        <Icon name="cib:facebook" />
                    </a>
                    <a href="http://">
                        <Icon name="mage:instagram-circle" />
                    </a>
                    <a href="http://">
                        <Icon name="streamline:whatsapp-solid" />
                    </a>
                    <a href="http://">
                        <Icon name="entypo-social:linkedin-with-circle" />
                    </a>
                    <Icon @click="toggleLoginForm" v-if="!bcId" name="solar:shield-bold-duotone" />
                    <Icon @click="goToAdmin" v-else name="solar:user-circle-bold-duotone" />
                </div>
            </div>
            <div class="nav">
                <nuxt-link to="/" class="homeLink">
                    <img src="/public/logo/logo.png" alt="big cat safari">
                    <h3>Big Cat Safaris</h3>
                </nuxt-link>
                <div class="center">
                    <nuxt-link to="#">Home</nuxt-link>
                    <nuxt-link to="#">About</nuxt-link>
                    <nuxt-link to="#">Tours</nuxt-link>
                    <nuxt-link to="#">Destinations</nuxt-link>
                    <nuxt-link to="#">Categories</nuxt-link>
                    <nuxt-link to="#">Gallery</nuxt-link>
                </div>
                <UButton>Contact us</UButton>
            </div>
        </div>
    </div>
</template>

<script setup>

const bcId = useCookie('bcId', { sameSite: 'lax' })

const isLoginModal = useCookie('isLoginModal', { sameSite: 'lax' })
const toggleLoginForm = () => {
    isLoginModal.value = true
}

const router = useRouter()
const goToAdmin = () => {
    router.push('/admin')
}

</script>

<style lang="scss" scoped>
.mainHeader {
    .inner {
        background-color: #ffffff;

        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: nowrap;
            overflow: auto;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid #eeeeee;

            .left {
                display: flex;
                align-items: center;
                gap: 3rem;

                a {
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: 0.5rem;
                        color: var(--color-orange-500);
                        font-size: 1.5rem;
                    }

                    p {
                        font-size: 0.9rem;
                    }
                }
            }

            .cent {
                a {
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;

                    span {
                        margin-right: 0.5rem;
                        color: var(--color-orange-500);
                        font-size: 1.5rem;
                    }

                    p {
                        font-size: 0.9rem;
                    }
                }
            }

            .right {
                display: flex;
                align-items: center;

                a {
                    margin-right: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        color: #000000;
                    }
                }

                span {
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: var(--color-orange-500);
                }
            }
        }

        .nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 1rem;

            .homeLink {
                display: flex;
                align-items: center;

                img {
                    width: 50px;
                    margin-right: 1rem;
                }
            }

            .center {
                display: flex;
                align-items: center;
                gap: 2rem;
            }
        }
    }
}
</style>