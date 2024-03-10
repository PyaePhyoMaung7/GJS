import { RouterLink, RouterView } from 'vue-router'
import { Head } from '@unhead/vue/components'
import {mapState} from 'vuex'
export default {
  name: 'adminLayout',
  components: {
    Head: Head
  },
  computed:{
    ...mapState(['title'])
  },
  methods: {
    logout() {
      this.$store.commit('changeUserInfo', null)
      sessionStorage.removeItem('user')
      window.location.reload()
    },

    makeScript(source) {
      return new Promise((resolve, reject) => {
        let sc = document.createElement('script');
        sc.src = source ;
        sc.onload = resolve;
        sc.onerror = reject;
        sc.setAttribute('type', 'text/javascript')
        document.body.appendChild(sc)
    })
  },
},
  // head: {
  //   script: [
  //     {
  //       type: 'text/javascript',
  //       src: ,
  //       async: true,
  //       body: true
  //     },
  //    ]
  // },
  async mounted() {
    await this.makeScript('../../../assets/vendor/chart.js/Chart.min.js')
    await this.makeScript('../../../assets/vendor/jquery/jquery.min.js')
    await this.makeScript('../../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js')
    await this.makeScript('../../../assets/vendor/jquery-easing/jquery.easing.min.js')
    await this.makeScript('../../../assets/js/sb-admin-2.min.js')
  }
}
