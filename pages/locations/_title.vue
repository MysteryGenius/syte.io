<template>
	<div class="bg-syte-pink md:py-8 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <article class="max-w-3xl mx-auto shadow-2xl rounded-2xl">
		  	<div class="title">
		  		<img class="rounded-t-2xl object-cover h-64 w-full darker" :src="require(`@/${listing.splash_image}`)" alt="Cover image of the cafe">
		  		<h3 class="font-extrabold bg-clip-text leading-relaxed text-transparent bg-gradient-to-r from-yellow-200 to-red-400 text-4xl centered">{{listing.title}}</h3>
		  	</div>
		  	<div class="p-6">
		  		<h4 class="font-bold mb-4">Who are they?</h4>
			  	<p class="text-md mb-4">
			  		{{listing.description}}
			  	</p>
			  	<h4 class="font-bold mb-4">Where are they?</h4>
			  	<p class="text-md mb-4">
			  		{{listing.address}}
			  	</p>
			  	<h4 class="font-bold mb-4"  v-if="listing.promotions.length !== 0">Got discount anot?</h4>
			  	<p class="text-md mb-4" v-if="listing.promotions.length !== 0">
			  		{{listing.promotions}}
			  	</p>
			  	<h4 class="font-bold mb-4">When can I study/work there?</h4>
			  	<p class="text-md mb-6">
			  		<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800" 
			  		v-for="slot in listing.slots" 
        		:key="slot.slot">
              {{slot.slot}}
            </span>
			  	</p>

			  	<div class="max-w-2xl md:max-w-md mx-auto my-4">
			  		<client-only placeholder="Loading instagram post...">
				  		<!-- this component will only be rendered on client-side -->
					  	<Embedo :toEmbed="listing.instagram_post"/>
					  </client-only>	
			  	</div>			  	

			  	<NuxtLink :to="{ name: 'booking-title', params: { title: listing.title.toLowerCase().replace(' ','-') }}">
				  	<button class="block w-full py-1 px-20 button mt-4">Book now</button>
				  </NuxtLink>	
		  	</div>
		  </article>
		</div>
	</div>
</template>
<script>
export default {
  async asyncData({ params, redirect }) {
    const allListings = await require.context("~/content/listings/", true, /\.md$/)
    const listings =  allListings.keys().map((key) => {
      return allListings(key)
    });
    

    const filteredLocation = listings.find(
      (el) =>
        el.attributes.title.toLowerCase() === params.title.toLowerCase().replace('-',' ')
    )
    return {
      listing: filteredLocation.attributes
    }
  }
}
</script>
<style>
	.darker {
		filter: brightness(30%)
	}
	.title {
		position: relative;
  	text-align: center;
	}
	.centered {
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
</style>