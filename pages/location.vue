<template>
	<div class="bg-pink-50 py-8 z-0">
		<Listing :listings=listings></Listing>
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