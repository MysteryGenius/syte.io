<template>
  <section class="container mx-auto">
    <ul class="space-y-4 mt-6">
      <li class="col-span-1 flex flex-col text-center bg-white rounded-xl shadow-md divide-y divide-gray-200"
        v-for="listing in listings" 
        :key="listing.attributes.title" 
      >
        <div class="flex-1 flex flex-col p-8">
          <img class="flex-shrink-0 mx-auto bg-black" :src="listing.attributes.splash_image" alt="">
          <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ listing.attributes.title }}</h3>
          <dl class="mt-1 flex-grow flex flex-col justify-between">
            <dt class="sr-only">Title</dt>
            <dd class="text-gray-500 text-sm">{{ listing.attributes.description }}</dd>
            <dt class="sr-only">Role</dt>
            <dd class="mt-3">
              <span class="px-2 py-1 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">{{ listing.attributes.affordability }}</span>
            </dd>
          </dl>
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
