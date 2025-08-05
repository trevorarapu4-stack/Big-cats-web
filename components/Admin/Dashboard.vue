<template>
    <div class="dash">
        <div class="top1" :style="{
            backgroundImage: `url(/admin/intro.webp)`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }">
            <h2>Welcome {{ bcName }}</h2>
        </div>
        <div class="inner">
            <div class="each">
                <div class="top">
                    <Icon name="solar:notebook-minimalistic-bold-duotone" />
                    <p>Itineraries</p>
                </div>
                <div class="bot">
                    <h1>29</h1>
                </div>
            </div>
            <div class="each">
                <div class="top">
                    <Icon name="solar:info-circle-bold-duotone" />
                    <p>Blogs</p>
                </div>
                <div class="bot">
                    <h1>13</h1>
                </div>
            </div>
            <div class="each">
                <div class="top">
                    <Icon name="solar:pen-new-square-bold-duotone" />
                    <p>Reviews</p>
                </div>
                <div class="bot">
                    <h1>8</h1>
                </div>
            </div>
            <div class="each">
                <div class="top">
                    <Icon name="solar:gallery-edit-bold-duotone" />
                    <p>Gallery</p>
                </div>
                <div class="bot">
                    <h1>233</h1>
                </div>
            </div>
            <div class="each">
                <div class="top">
                    <Icon name="solar:add-folder-bold-duotone" />
                    <p>Categories</p>
                </div>
                <div class="bot">
                    <h1>6</h1>
                </div>
            </div>
            <div class="each">
                <div class="top">
                    <Icon name="solar:pin-bold-duotone" />
                    <p>Destinations</p>
                </div>
                <div class="bot">
                    <h1>13</h1>
                </div>
            </div>
            <div class="each">
                <div class="top">
                    <Icon name="solar:users-group-rounded-bold-duotone" />
                    <p>Members</p>
                </div>
                <div class="bot">
                    <h1>4</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { url } from 'valibot';


const bcId = useCookie('bcId', { sameSite: 'lax' })
const bcName = useCookie('bcName', { sameSite: 'lax' })
const bcEmail = useCookie('bcEmail', { sameSite: 'lax' })

</script>

<style lang="scss" scoped>
.dash {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    .top1 {
        max-width: 1000px;
        background-color: blue;
        width: 100%;
        margin-bottom: 1rem;
        height: 300px;

        display: flex;
        align-items: center;
        padding: 5%;
        border-radius: var(--ui-radius);

        h2 {
            font-size: 2rem;
            color: #ffffff;
        }
    }

    .inner {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        gap: 1rem;
        max-width: 1000px;
        // background-color: blue;
        width: 100%;

        .each {
            background-color: #eeeeee;
            border: 2px solid #eeeeee;
            padding: 2rem;
            min-height: 150px;
            border-radius: var(--ui-radius);
            cursor: pointer;

            &:hover {
                border: 2px solid var(--color-orange-500);
            }

            .top {
                margin-bottom: 3rem;

                span {
                    font-size: 3rem;
                }

                p {
                    font-size: 0.9rem;
                }
            }

            .bot {
                h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    font-family: 'Outfit';
                }
            }
        }
    }
}
</style>