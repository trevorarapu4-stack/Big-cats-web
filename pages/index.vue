<template>
    <div>
        <Head>
            <Title>Big Cat Safaris | Home</Title>
            <Meta name="description" :content="desCont" />
        </Head>
        <HeroSection />
        <HomeDestinations />
        <FeaturedItineraries />
        <Welcome />
        <TheTeam :isHome="true" />
        <HomeCategories />
        <HomeReviews />
        <HomeBlogs />
    </div>
</template>

<script setup>

const desCont = `At Big Cat Safaris Ltd, we offer unforgettable wildlife experiences, showcasing Rwanda's stunning landscapes and the majestic Big Five animals. Our expert guides and diverse wildlife encounters ensure a unique and immersive safari adventure for our guests.`

</script>

<style lang="scss" scoped>

</style>