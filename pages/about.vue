<template>
	<div class="bg-pink-50 md:py-8 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <article class="max-w-3xl mx-auto shadow-2xl rounded-2xl">
		  	<div class="title">
		  		<img class="rounded-t-2xl object-cover h-64 w-full darker" src="~/assets/images/cafe.jpg" alt="Cover image of the cafe">
		  		<h3 class="font-extrabold bg-clip-text leading-relaxed text-transparent bg-gradient-to-r from-yellow-200 to-red-400 text-6xl text-6xl centered">About</h3>
		  	</div>
		  	<div class="p-6">
		  		<h4 class="font-bold mb-4">Who are we?</h4>
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