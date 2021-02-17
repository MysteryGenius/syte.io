<template>
  <section class="container mx-auto max-w-4xl gray-section rounded-2xl">
    <h3 class="logo text-center pt-4">Our Partners</h3>
    <ul class="space-y-4 p-8">
      <li class="col-span-1 flex shadow-md rounded-3xl" 
        v-for="listing in listings" 
        :key="listing.attributes.title" >
        <img class="flex-shrink-0 flex items-center justify-center max-w-xs rounded-l-3xl" src="~/assets/images/cafe.jpg" alt="">
        <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-3xl">
          <div class="flex-1 px-4 py-2 text-sm space-y-4">
            <a href="#" class="card-title">{{ listing.attributes.title }}</a>
            <p class="card-text">{{ listing.attributes.description }}</p>
            <!-- <dd class="mt-3">
              <span class="px-2 py-1 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">{{ listing.attributes.affordability }}</span>
            </dd> -->

            <button type="submit" class="block w-full py-1 px-20 button ">Book now</button>
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
