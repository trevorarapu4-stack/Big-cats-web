<template>
    <div class="mainFooter">
        <GalleryMarquee />
        <div class="inner">
            <div class="toping">
                <nuxt-link to="/">
                    <img src="/logo/logo.png" alt="big cat safaris logo">
                    <p>Big Cat Safaris</p>
                </nuxt-link>
                <a href="tel:+250793468377">
                    Call mobile +250 793 468377
                </a>
            </div>
            <div class="center">
                <div class="one">
                    <h3>Company</h3>
                    <div class="jumps">
                        <nuxt-link to="/" >About us</nuxt-link>
                        <nuxt-link to="/contact" >Contact us</nuxt-link>
                        <nuxt-link to="/" >Our clients reviews</nuxt-link>
                        <nuxt-link to="/reviewBigCatSafaris" >Review Big Cat Safaris</nuxt-link>
                        <u-button class="mt-4 w-fit" icon="solar:shield-bold-duotone" variant="outline" color="neutral" label="Log in" />
                    </div>
                </div>
                <div class="one">
                    <h3>For You</h3>
                    <div class="jumps">
                        <nuxt-link to="/categories" >Categories</nuxt-link>
                        <nuxt-link to="/destinations" >Destinations</nuxt-link>
                        <nuxt-link to="/" >Our Blog</nuxt-link>
                        <nuxt-link to="/" >Tour packages</nuxt-link>
                    </div>
                </div>
                <div class="one">
                    <h3>Company</h3>
                    <div class="jumps">
                        <nuxt-link to="/" >Terms of service</nuxt-link>
                        <nuxt-link to="/" >Privacy</nuxt-link>
                    </div>
                </div>
                <div class="one">
                    <h3>Get in touch</h3>
                    <div class="jumps">
                        <a href="http://">
                            Find us in Rwinkwavu, Kayonza, East, Rwanda
                        </a>
                        <a href="tel:+250793468377">
                            call us on mobile with +250 793 468377
                        </a>
                        <a href="mailto:info@bigcatsafaris.rw">
                            Send us an email at info@bigcatsafaris.rw
                        </a>
                    </div>
                </div>
            </div>
            <div class="bott">
                <div class="socials">
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
                </div>
                <p>&copy; 2025 Big cat Safaris LTD</p>
            </div>
        </div>
    </div>
</template>

<script setup>



</script>

<style lang="scss" scoped>

.mainFooter {
    margin-top: 7rem;
    .inner {
        background-color: #000000;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .toping, .center, .bott {
            max-width: 1200px;
            width: 100%;
            margin: auto;
            color: #ffffff;
            padding: 1rem;
        }

        .toping {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 3rem;
            border-bottom: 1px solid #333333;

            a {
                display: flex;
                align-items: center;
                img {
                    width: 60px;
                    height: auto;
                }
                p {
                    font-size: 0.9rem;
                }
            }
        }
        
        .center {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
            margin-bottom: 2rem;
            padding-bottom: 3rem;
            border-bottom: 1px solid #333333;

            .one {
                h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .jumps {
                    display: flex;
                    flex-direction: column;
                    margin-top: 1rem;

                    a {
                        margin-top: 1rem;

                        &:hover {
                            color: var(--color-orange-500);
                        }
                    }
                }
            }
        }

        .bott {
            display: flex;
            gap: 2rem;
            justify-content: space-between;

            .socials {
                display: flex;
                align-items: center;
                gap: 1.5rem;

                a {
                    span {
                        font-size: 2rem;
                    }
                }
            }

            p {
                font-size: 0.9rem;
            }
        }
    }
}

</style>