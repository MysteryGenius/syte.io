<template>
	<div class="bg-syte-pink md:py-8 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <article class="max-w-3xl mx-auto shadow-2xl rounded-2xl bg-white">
		  	<div class="title">
		  		<img class="rounded-t-2xl object-cover h-64 w-full darker" :src="require(`@/${listing.splash_image}`)" alt="Cover image of the cafe">
		  		<h3 class="font-extrabold bg-clip-text leading-relaxed text-transparent bg-gradient-to-r from-yellow-500 to-red-400 text-6xl text-6xl centered">Booking!</h3>
		  	</div>
		  	<div class="p-6">
		  		<h4 class="font-bold mb-4">Booking for {{listing.title}}? We just need a few things from you!</h4>

		  		<p v-if="errors.length">
				    <h4 class="text-red-800 font-bold">Please correct the following error(s):</h4>
				    <ul>
				      <li v-for="error in errors" class="text-red-800 text-xs">{{ error }}</li>
				    </ul>
				  </p>

		  		<form class="space-y-6" @submit="checkForm" novalidate="true">

		  			<div class="mb-6">
		  				<p class="text-md">
		  					Remember to select timing within the location's available slots: 
		  				</p>
		  					<div>
		  						<span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800" 
						  		v-for="slot in listing.slots" 
			        		:key="slot">
			              {{slot.slot}}
			            </span>
		  					</div>
					  	<p>Also do try to booking at least 3 days in advance</p>
		  			</div>

		  			<div class="z-50 md:flex justify-between">
		  				<div>
		  					<label for="email" class="block text-sm font-medium text-gray-700">
			            Date
			          </label>
			          <div class="mt-1">
			          	<client-only>
				            <date-picker v-model="bookingDate" valueType="format" placeholder="Date you're visiting"></date-picker>
				          </client-only>	
			          </div>
		  				</div>
		  				<div>
		  					<label for="email" class="block text-sm font-medium text-gray-700">
			            Time
			          </label>
			          <div class="mt-1">
			          	<client-only>
				            <date-picker 
				            	v-model="bookingTime" 
				            	valueType="format"
								      :time-picker-options="{
								        start: '01:00',
								        step: '00:30',
								        end: '24:00',
								      }"
								      format="hh:mm a"
								      type="time"
								      placeholder="Time you're visiting">
								    </date-picker>
								  </client-only>
			          </div>
		  				</div>
		        </div>

		        <div class="z-30">
		          <label for="email" class="block text-sm font-medium text-gray-700">
		            Email address
		          </label>
		          <div class="mt-1">
		            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm z-0" placeholder="hello@syte.com">
		          </div>
		        </div>

		        <div class="z-10">
		          <label for="email" class="block text-sm font-medium text-gray-700">
		            Name
		          </label>
		          <div class="mt-1">
		            <input v-model="name" id="name" name="name" type="text" autocomplete="name" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm z-0" placeholder="Your Name | 君の名は">
		          </div>
		        </div>

		        <div class="z-10">
		          <label for="email" class="block text-sm font-medium text-gray-700">
		            Number of vistors
		          </label>
		          <div class="mt-1">
		            <input v-model="visitors" id="visitors" name="visitors" type="number" step="1" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm z-0" placeholder="People you're bringing along">
		          </div>
		          <p class="text-xs text-gray-500">People you're bringing along including yourself</p>
		        </div>

		        <button class="block w-full py-1 px-20 button mt-4" type="submit">Book now</button>
		      </form>
			  	
		  	</div>
		  </article>
		</div>
	</div>
</template>
<script>
	import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

	export default {
		components: { DatePicker },
		data() {
      return {
      	errors: [],
      	name: "",
      	email: "",
      	visitors: 1,
      	bookingDate: "",
      	bookingTime: "",
      }
    },
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
	  },
	  methods: {
	  	checkForm: function (e) {
	      this.errors = [];

	      if (!this.name) {
	        this.errors.push("Name required.");
	      }
	      if (!this.email) {
	        this.errors.push('Email required.');
	      } else if (!this.validEmail(this.email)) {
	        this.errors.push('Valid email required.');
	      }
	      if (!this.bookingDate) {
	        this.errors.push('Booking Date required.');
	      } 
	      if (!this.bookingTime) {
	        this.errors.push('Booking Time required.');
	      } 

	      if (!this.errors.length) {
	        this.processBooking()
	      }

	      e.preventDefault();
	    },
	    validEmail: function (email) {
	      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	      return re.test(email);
	    },
	  	async processBooking() {
	  		const ref = this.$fire.database.ref('bookings')
				await ref.push({
					name: this.name,
					email: this.email,
					visitors: this.visitors,
					bookingDate: this.bookingDate,
					bookingTime: this.bookingTime,
					createDatetime: new Date(),
					locationName: this.listing.title,
				})
				.then(function(res) {
            console.log("Document successfully written!");
            window.location.replace("/thanks");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      },
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

	input[type=number]::-webkit-outer-spin-button,
	input[type=number]::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
	}

	input[type=number] {
	    -moz-appearance:textfield;
	}
</style>