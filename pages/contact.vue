<template>
    <div class="contact">
        <div class="inner">
            <top-intro-section :intro-data="pageData" />

            <div class="first">
                <h2>We are here to help</h2>
                <p>Our team is always ready to provide quick and friendly support to ensure all your queries are answered. Whether it’s about bookings, special requests, or general inquiries, don’t hesitate to contact us your adventure starts with a conversation!</p>
            </div>

            <div class="content">
                <div class="left">
                    <div class="topp">
                        <h3>Get In Touch</h3>
                        <p>We are here to provide you with exceptional service, answer your inquiries, and ensure your
                            journey is nothing short of extraordinary.</p>
                    </div>
                    <div class="tabs">
                        <div class="one">
                            <a href="https://www.google.com">
                                <Icon name="solar:map-point-wave-bold-duotone" />
                            </a>
                            <div class="side">
                                <h3>Office</h3>
                                <p>Rwinkwavu, Kayonza, East, Rwanda</p>
                            </div>
                        </div>
                        <div class="one">
                            <a href="tel:+250793468377">
                                <Icon name="solar:phone-bold-duotone" />
                            </a>
                            <div class="side">
                                <h3>Mobile</h3>
                                <p>+250 793 468377</p>
                            </div>
                        </div>
                        <div class="one">
                            <a href="mailto:info@bigcatsafaris.rw">
                                <Icon name="solar:mailbox-bold-duotone" />
                            </a>
                            <div class="side">
                                <h3>Email</h3>
                                <p>info@bigcatsafaris.rw</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <h3>Send us a message</h3>
                    <div class="us">
                        <UFormField label="Name" name="name">
                            <UInput v-model="contactData.name" class="w-full" />
                        </UFormField>
                        <UFormField label="Email" name="email">
                            <UInput v-model="contactData.email" class="w-full" />
                        </UFormField>
                    </div>
                    <UFormField label="Subject" name="subject">
                        <UInput v-model="contactData.subject" class="w-full" />
                    </UFormField>
                    <UFormField label="Message" name="message">
                        <UTextarea v-model="contactData.message" class="w-full"
                            autoresize />

                    </UFormField>
                    <UButton label="Send Message" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { UButton } from '#components';


const pageData = ref({
    image: '/images/contact.webp',
    heading: 'Contact Big cats Safaris',
    paragraph: 'We’re here to help! If you have any questions, need more information, or would like assistance planning your perfect trip, feel free to reach out to us.'
})

const contactData = ref({
    name: '',
    email: '',
    message: '',
    subject: ''
})

</script>

<style lang="scss" scoped>
.contact {
    .inner {

        .first {
            display: flex;
            flex-direction: column;
            text-align: center;
            max-width: 1000px;
            margin: 3rem auto;
            padding: 1rem;

            h2 {
                font-size: 2rem;
            }

            p {
                font-size: 1.1rem;
            }
        }

        .content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
            gap: 1rem;
            padding: 1rem;
            max-width: 1050px;
            margin: 2rem auto;

            .left {
                display: flex;
                flex-direction: column;

                .topp {
                    h3 {
                        font-size: 1.5rem;
                    }

                    p {
                        font-size: 1rem;
                    }
                }

                .tabs {
                    display: flex;
                    flex-direction: column;
                    margin-top: 2rem;
                    gap: 1.5rem;

                    .one {
                        display: flex;

                        a {
                            span {
                                font-size: 3rem;
                            }
                        }

                        .side {
                            margin-left: 1rem;

                            h3 {
                                font-size: 1rem;
                                font-weight: 700;
                            }

                            p {
                                font-size: 0.9rem;
                            }
                        }
                    }
                }
            }

            .right {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .us {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
                    gap: 1rem;
                }
            }
        }
    }
}
</style>