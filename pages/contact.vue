<template>
	<div class="bg-syte-pink md:py-8 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <article class="max-w-3xl mx-auto shadow-2xl rounded-2xl">
		  	<div class="title">
		  		<img class="rounded-t-2xl object-cover h-64 w-full darker" src="~/assets/images/cafe.jpg" alt="Cover image of the cafe">
		  		<h3 class="font-extrabold bg-clip-text leading-relaxed text-transparent bg-gradient-to-r from-yellow-200 to-red-400 text-6xl text-6xl centered">Contact</h3>
		  	</div>
		  	<div class="p-6">
		  		<h4 class="font-bold mb-4">Where can you find us?</h4>
		  		<p class="mb-4">Visit our Instagram, <a href="https://www.instagram.com/syte.io/" class="text-blue-600 hover:text-blue-500" target="_blank">@syte.io</a> for more information, pictures and collaborations!</p>

		  		<p class="mb-6">Follow our tiktok, <a href="https://www.tiktok.com/@syteio/" class="text-blue-600 hover:text-blue-500" target="_blank">@syte.io</a> for the location directions, interior & good food.</p>

		  		<h4 class="font-bold mb-4">How can you contact us?</h4>
		  		<p class="mb-6">Email us at <a href="mailto:hello@syte.sg?subject=Hello Syte!&body=Your message goes here!" class="text-blue-600 hover:text-blue-500">hello@syte.sg</a></p>
		  	</div>
		  </article>
		</div>
	</div>
</template>
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