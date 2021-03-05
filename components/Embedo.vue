<template>
  <div v-html="graph.html">
  </div>
</template>
<script>
	export default {
    data() {
      return {
        graph: [],
      }
    },
    created() {
      this.getEmbed()
    },
    props: ['toEmbed'],
    methods: {
      async getEmbed() {

        let url = 'https://graph.facebook.com/v9.0/instagram_oembed?url=';
        let FACEBOOK_APP_ID = '203690988214686'
        let FACEBOOK_CLIENT_TOKEN = 'b737b6a36546d61f8a0a3c1f1f696acf'

        await this.$axios.$get(`${url}${this.toEmbed}&access_token=${FACEBOOK_APP_ID}|${FACEBOOK_CLIENT_TOKEN}&hidecaption=true`)
          .then(res => {
            this.graph = res.data;
          })

        window.instgrm.Embeds.process();
      }
    }
  }
</script>