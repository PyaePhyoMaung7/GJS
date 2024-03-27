// import { RouterLink} from 'vue-router'
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      },
      errors: {}
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.errors = {}
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')

      await axios
        .post('http://localhost:8000/api/login', this.form)
        .then((response) => {
          this.loading = false
          this.$store.commit('changeUserInfo', response.data.user)

          if(this.$store.getters.getUserRole === 'admin'){
            this.$router.push('admin/dashboard')
          }else{
            this.$router.push('user')
          }

          sessionStorage.setItem('user', JSON.stringify(this.$store.getters.getUserInfo))
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          this.loading = false;
        })
    }
  }
}
