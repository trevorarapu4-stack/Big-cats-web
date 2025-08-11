<template>
    <div class="about">
        <top-intro-section :intro-data="pageData" />
        <div class="inner">
            <div class="top">
                <h2>The Big Cat Safaris</h2>
                <p>The Big Cat Safaris offer an unparalleled opportunity to witness Africa's most majestic and elusive
                    feline species in their natural habitat. Join us on a journey to explore the captivating world of
                    big cats and experience the thrill of encountering these magnificent creatures up close.</p>
                <p>From the stealthy leopard to the iconic lion, our safaris are designed to provide you with
                    unforgettable moments and insights into the lives of these apex predators. Our expert guides and
                    carefully curated itineraries ensure a truly immersive and educational adventure.</p>
            </div>
            <div class="story">
                <div class="left">
                    <h2>Our Company Story</h2>
                    <p>Isaac MBARUSHIMANA, the Rwanda Akagera safaris expert, and Rita MPINGANZIMA, the CEO and
                        passionate multilingual guide, are partners who work day and night to create an unforgettable
                        savannah experience for their guests.</p>
                    <p>Isaac has dedicated 8 years of his life to working in Akagera, witnessing the growth of animal
                        families and the introduction of new species. With a tourism management degree from China and
                        further training in Zambia, Isaac combines professional hospitality and education during every
                        driving, boating, or walking excursion.</p>
                </div>
                <div class="right">
                    <img src="/public/images/ourStory.webp" alt="an image of the big cat safaris members">
                </div>
            </div>
            <div class="miss">
                <p>Rita pursued her studies at the University of Tourism, Technology, and Business Studies, where
                    she obtained her degree in travel and tourism management.</p>
                <p>Big Cat Safaris delivers an unforgettable experience in English, French, Chinese, Swahili, and Kinyarwanda.</p>
            </div>
            <the-team :isHome="false" />
            <div class="miss">
                <h2>Our Goal</h2>
                <p>Our goal is to provide personalized itineraries for our guests, striving to spot the Big Five,
                    offering breathtaking views, and ensuring that Rwanda becomes an unforgettable part of your trip.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

const pageData = ref({
    image: '/images/about.webp',
    heading: 'About Big Cats Safaris',
    paragraph: 'Learn more about who we are, our passion for wildlife, and our commitment to creating unforgettable safari adventures. Discover the story behind Big Cats Safaris and the team dedicated to making your journey extraordinary.'

})

</script>

<style lang="scss" scoped>
.about {
    .inner {
        max-width: 1100px;
        margin: auto;
        padding: 2rem 1rem;

        p {
            line-height: 2.3rem;
            font-size: 1.1rem;
        }

        .top {
            h2 {
                font-size: 2rem;
            }

            p {
                margin-top: 2rem;
            }
        }

        .story {
            margin-top: 4rem;
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

            .left {
                h2 {
                    font-size: 2rem;
                }

                p {
                    margin-top: 1rem;
                }
            }

            .right {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    display: block;
                }
            }
        }
        .miss {
            margin-top: 2rem;

            h2 {
                font-size: 2rem;
            }
            p {
                margin-top: 1rem;
            }
        }
    }
}
</style>