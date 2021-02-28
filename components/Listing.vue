<template>
  <section class="container mx-auto max-w-4xl gray-section rounded-2xl">
    <h3 class="logo text-center pt-4">Our Partners</h3>
    <ul class="space-y-4 p-8">
      <li class="col-span-1 md:flex-row flex-col flex shadow-md rounded-3xl max-w-4xl" 
        v-for="listing in listings" 
        :key="listing.attributes.title" >
        <img class="flex-shrink-0 flex items-center justify-center md:max-w-xs md:rounded-l-3xl" src="~/assets/images/cafe.jpg" alt="Cover image of the cafe" 
          v-if="listing.attributes.splash_image.length === 0">
        <img class="flex-shrink-0 flex items-center justify-center md:max-w-xs md:rounded-l-3xl" :src="require(`@/${listing.attributes.splash_image}`)" alt="Cover image of the cafe" v-else>
        <div class="flex-1 flex border-gray-200 bg-white md:rounded-r-3xl p-4">
          <div class="flex-1 px-4 py-2 text-sm truncate justify-between h-full flex flex-col space-y-4">
            <p class="flex justify-between">
              <a href="#" class="text-gray-900 font-bold hover:text-gray-600 text-2xl">{{ listing.attributes.title }}</a>
              <span class="px-2 py-2 text-yellow-800 text-xs font-medium bg-yellow-200 rounded-full">{{ listing.attributes.affordability }}</span>
            </p>
            <p class="text-gray-500">{{ listing.attributes.address }}</p>
            <NuxtLink :to="{ name: 'locations-title', params: { title: listing.attributes.title.toLowerCase().replace(' ','-') }}">
              <button class="block w-full py-1 px-20 button">Learn more...</button>
            </NuxtLink>
          </div>
        </div>
      </li>         
    </ul>
  </section>                       
</template>
<script>
  export default {
    props: {
      listings: {
        type: Array,
        required: true
      }        
    }, 
    methods: {
      formatSlug(title) {
        const regex = / /gi;
        return title.toLowerCase().trim().replace(regex, "-")
      }
    }
  }
</script>
