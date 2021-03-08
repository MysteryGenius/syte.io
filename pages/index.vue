<template>
  <div class="container mx-auto z-0 bg-syte-pink">
    <!-- <Listing :listings="listings"/> -->
    <div class="relative overflow-hidden">
      <main>
        <div class="pt-10 bg-syte-pink sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden z-0 h-screen">
          <div class="mx-auto max-w-7xl lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8">
              <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div class="lg:py-24">
                  <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl z-0">
                    <span class="block">A better way to</span>
                    <span class="bg-clip-text leading-relaxed text-transparent bg-gradient-to-r from-yellow-200 to-red-400 block z-0">study out</span>
                  </h1>
                  <p class="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Trouble looking for available spaces to study? We hear you. And we are hear to help!
                  </p>
                  <div class="mt-10 sm:mt-12">
                    <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                      <div class="sm:flex">
                        <div class="mt-3 sm:mt-0">
                          <NuxtLink to="/location">
                            <button class="block w-full py-2 px-20 button">Book now</button>
                          </NuxtLink>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                  <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="~/assets/svg/splash.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData() {
    // create context via webpack to map over all blog posts
    const allListings = await require.context("~/content/listings/", true, /\.md$/)
    const listings =  allListings.keys().map((key) => {
      return allListings(key)
    });
    return {
      listings
    }
  }
}
</script>

