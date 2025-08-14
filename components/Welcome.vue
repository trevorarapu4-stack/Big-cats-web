<template>
    <div class="wel">
        <div class="inner">
            <div class="start">
                <img src="/public/images/bigCats.webp" alt="big cat safaris image of the big five">
            </div>
            <div class="end">
                <h4>About us</h4>
                <h2>Welcome to Big Cat Safaris</h2>
                <p>At Big Cat Safaris Ltd, we offer unforgettable wildlife experiences, showcasing Rwanda's stunning landscapes and the majestic Big Five animals. Our expert guides and diverse wildlife encounters ensure a unique and immersive safari adventure for our guests</p>
                <p>We also provide a range of top-notch accommodations tailored to suit various preferences and budgets. Our focus on excellence and responsible tourism practices ensures an unforgettable experience while supporting the conservation of Rwanda's precious ecosystems.</p>

                <div class="points">
                    <div class="each" v-for="(value, idx) in points" :key="idx" >
                        <Icon name="solar:check-read-bold-duotone" />
                        <h3>{{ value }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const points = ref([
    'Exclusive Vacation Packages',
    'Handpicked Hotels',
    'Good Accommodations',
    'Latest Model Vehicles',
    'Premium Parks Or City Tours',
    '24/7 Service'
])


</script>

<style lang="scss" scoped>

.wel {
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
        max-width: 1100px;
        margin: 1rem auto;
        padding: 1rem;

        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

        .end {
            display: flex;
            flex-direction: column;

            h4 {
                font-weight: 600;
                color: var(--color-orange-500);
                margin-bottom: 1rem;
            }

            h2 {
                font-size: 2rem;
            }

            p {
                font-size: 1.2rem;
                margin: 1rem 0;
            }

            .points {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
                gap: 0.5rem;
                margin-top: 1rem;

                .each {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;

                    span {
                        margin-right: 0.5rem;
                        color: var(--color-orange-500);
                        font-size: 1.5rem;
                    }
                }
            }
        }
    }
}

</style>