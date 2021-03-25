<template>
	<div class="bg-syte-pink h-screen">
		<article class="max-w-3xl mx-auto shadow-2xl rounded-2xl">
	  	<div class="title">
	  		<img class="rounded-t-2xl object-cover h-64 w-full darker" src="~/assets/images/cafe.jpg" alt="Cover image of the cafe">
	  		<h3 class="font-extrabold bg-clip-text leading-relaxed text-transparent bg-gradient-to-r from-yellow-200 to-red-400 text-6xl text-6xl centered">
	  			Thank You
	  		</h3>
	  	</div>
	  	<div class="p-6">
	  		<p class="text-center my-6">
	  			Thank you so much for booking through Syte! <br>
	  			You will receive a confirmation email within the next 24 hour.
	  		</p>
		  	<NuxtLink to="/">
			  	<button class="block w-full py-1 px-20 button">Back home</button>
			  </NuxtLink>	
	  	</div>
	  </article>
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