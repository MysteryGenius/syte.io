<template>
    <header class="relative bg-syte-pink">
      <div class="pt-8">
        <nav class="relative max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 md:flex hidden" aria-label="Global">
          <div class="flex items-center flex-1">
            <div class="flex items-center justify-between w-full md:w-auto">
              <NuxtLink to="/">
                <span class="sr-only">syte.</span>
                <!-- <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/syte.-mark-teal-200-cyan-400.svg" alt=""> -->
                <h1 class="logo">syte.</h1>
              </NuxtLink>
              <div class="-mr-2 flex items-center md:hidden">
                <button type="button" class="bg-syte-pink rounded-md p-2 inline-flex items-center justify-center text-gray-400" id="main-menu" aria-haspopup="true">
                  <span class="sr-only">Open main menu</span>
                  <!-- Heroicon name: outline/menu -->
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden md:flex md:items-center md:space-x-12">
            <NuxtLink to="/about" class="navlink">About</NuxtLink>

            <NuxtLink to="/location" class="navlink">Locations</NuxtLink>

            <NuxtLink to="/contact" class="navlink">Contact</NuxtLink>
          </div>
        </nav>
      </div>

      <div class="absolute top-0 inset-x-0 transition transform origin-top md:hidden z-50">
        <div class="bg-syte-pink">
          <div class="px-5 pt-4 flex items-center justify-between">
            <NuxtLink to="/">
                <span class="sr-only">syte.</span>
                <!-- <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/syte.-mark-teal-200-cyan-400.svg" alt=""> -->
                <h1 class="logo">syte.</h1>
              </NuxtLink>
            <div class="flex items-center md:hidden">
              <!-- Mobile menu button -->
              <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <div id="menuToggle">
                  <input type="checkbox" v-on:click="menuOpen = !menuOpen" class="" />

                  <span></span>
                  <span></span>
                  <span></span>
                  <div></div>
                </div>
              </button>
            </div>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100 transform"
            enter-class="opacity-0 scale-x-50"
            enter-to-class="opacity-100 scale-x-100"
            leave-active-class="transition ease-in duration-75 transform"
            leave-class="opacity-100 scale-x-100"
            leave-to-class="opacity-0 scale-x-50"
          >
            <div class="bg-syte-pink shadow-lg" role="menu" aria-orientation="vertical" aria-labelledby="main-menu" v-show="menuOpen">
              <div class="px-2 space-y-1" role="none">
                <NuxtLink to="/about" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" role="menuitem">About</NuxtLink>

                <NuxtLink to="/location" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" role="menuitem">Locations</NuxtLink>

                <NuxtLink to="/contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" role="menuitem">Contact</NuxtLink>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>
</template>

<script>
	export default {
		data() {
			return {
        menuOpen: false,
      }
		}
	}
</script>