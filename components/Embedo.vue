<template>
    <div v-html="graph" v-if="graph.length != 0">
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
    head: {
      script: [
        { hid: 'instagram', type: 'text/javascript', src: 'https://platform.instagram.com/en_US/embeds.js', async: true, defer: true }
      ]
    },
    methods: {
      async getEmbed() {

        let url = 'https://graph.facebook.com/v10.0/instagram_oembed?url=';
        let FACEBOOK_APP_ID = '203690988214686'
        let FACEBOOK_CLIENT_TOKEN = 'd6f0126d2211e471954e402475e62e80'

        await this.$axios.$get(`${url}${this.toEmbed}&access_token=${FACEBOOK_APP_ID}|${FACEBOOK_CLIENT_TOKEN}&hidecaption=true`)
          .then(res => {
            this.graph = res.html;
            console.log(res);
          })

        window.instgrm.Embeds.process();
      }
    }
  }
</script>