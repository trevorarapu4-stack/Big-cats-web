<template>
    <div class="contact">

        <Head>
            <Title>{{ pageData?.heading }}</Title>
            <Meta name="description" :content="pageData?.paragraph" />
        </Head>
        <div class="inner">
            <top-intro-section :intro-data="pageData" />

            <div class="first">
                <h2>We are here to help</h2>
                <p>Our team is always ready to provide quick and friendly support to ensure all your queries are
                    answered. Whether it’s about bookings, special requests, or general inquiries, don’t hesitate to
                    contact us your adventure starts with a conversation!</p>
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
                        <UFormField label="Name" name="name" required>
                            <UInput v-model="contactData.name" class="w-full" size="xl" />
                        </UFormField>
                        <UFormField label="Email" name="email" required>
                            <UInput v-model="contactData.email" class="w-full" size="xl" />
                        </UFormField>
                    </div>
                    <UFormField label="Subject" name="subject" required>
                        <UInput v-model="contactData.subject" class="w-full" size="xl" />
                    </UFormField>
                    <UFormField label="Message" name="message" required>
                        <UTextarea v-model="contactData.message" class="w-full" autoresize size="xl" />
                    </UFormField>
                    <UButton label="Send Message" class="w-fit" @click="sendContactMessage" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { UButton } from '#components';
import { CalendarDate } from '@internationalized/date'
import emailjs from '@emailjs/browser'

const forLoader = useLoader()
const forNotifier = useNotifier()
const router = useRouter()

const pageData = ref({
    image: '/images/contact.webp',
    heading: 'Contact Big cats Safaris',
    paragraph: 'We’re here to help! If you have any questions, need more information, or would like assistance planning your perfect trip, feel free to reach out to us.'
})

const nowDate = new Date()
const contactData = ref({
    name: '',
    email: '',
    message: '',
    subject: '',
    time: nowDate.toISOString().split('T')[0]
})

const sendContactMessage = async () => {
    if (contactData.value.name && contactData.value.email && contactData.value.subject && contactData.value.subject) {
        console.log(contactData.value)

        forLoader.showLoader('@sendingContactUs', 'Just A Moment', 'Sending your message to Big Cat Safaris')

        try {
            emailjs
                .send(useRuntimeConfig().public.EMAILJS_SERVICE_ID, useRuntimeConfig().public.EMAILJS_MESSAGE_TEMPLATE_ID, {
                    name: contactData.value.name,
                    email: contactData.value.email,
                    subject: contactData.value.subject,
                    message: contactData.value.message,
                    time: new Date().toLocaleString() // Format the date properly
                }, {
                    publicKey: useRuntimeConfig().public.EMAILJS_YOUR_PUBLIC_KEY,
                })
                .then(
                    () => {
                        forLoader.removeLoader('@sendingContactUs')
                        forNotifier(true, 'Message Received, Thank you and have a nice day')
                        router.push('/')
                    },
                    (error) => {
                        console.log('FAILED...', error);
                        forLoader.removeLoader('@sendingContactUs')
                        forNotifier(false, error.message || 'There was a problem sending your message')
                    },
                );
        } catch (error) {
            console.log('FAILED LAST...', error);
            forLoader.removeLoader('@sendingContactUs')
            forNotifier(false, error.message || 'There was a problem sending your message')
        }

    } else {
        forNotifier(false, 'Please fill all the available fields')
    }
}

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