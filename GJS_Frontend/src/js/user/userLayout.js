import { RouterLink, RouterView } from 'vue-router'
import { Head } from '@unhead/vue/components'


export default {
  name: 'userLayout',
  components:{
    Head: Head
  },
  methods: {
    logout() {
      this.$store.commit('changeUserInfo', null)
      sessionStorage.removeItem('user')
      window.location.reload()
    },
    makeScript(source){
      let sc = document.createElement('script')
      sc.setAttribute('src', source)
      sc.setAttribute('type', 'text/javascript')
      document.head.appendChild(sc)
    }
  },
  async mounted() {
    await this.makeScript("../../../user/assets/js/jquery-1.11.3.min.js")
    await this.makeScript("../../../user/assets/bootstrap/js/bootstrap.min.js");
    await this.makeScript("../../../user/assets/js/jquery.countdown.js");
    await this.makeScript("../../../user/assets/js/jquery.isotope-3.0.6.min.js");
    await this.makeScript("../../../user/assets/js/waypoints.js");
    await this.makeScript("../../../user/assets/js/owl.carousel.min.js");
    await this.makeScript("../../../user/assets/js/jquery.magnific-popup.min.js");
    await this.makeScript("../../../user/assets/js/jquery.meanmenu.min.js");
    await this.makeScript("../../../user/assets/js/sticker.js");
    await this.makeScript("../../../user/assets/js/main.js");

  }
}
