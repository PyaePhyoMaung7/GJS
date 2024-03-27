import { RouterLink, RouterView } from 'vue-router'
import { Head } from '@unhead/vue/components'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'adminLayout',
  components: {
    Head: Head
  },
  data() {
    return {
      profileModalVisible: false,
      errors: {},
      profile: {
        id: this.$store.getters.getUserInfo.id,
        image: this.$store.getters.getUserInfo.image,
        name: this.$store.getters.getUserInfo.name,
        email: this.$store.getters.getUserInfo.email,
        phone: this.$store.getters.getUserInfo.phone,
        role: this.$store.getters.getUserInfo.role,
        gender: this.$store.getters.getUserInfo.gender,
        address: this.$store.getters.getUserInfo.address
      },
      passwordForm: {
        id: this.$store.getters.getUserId,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      profileImage: '',
      regex: /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/,
      passwordModalVisible: false
    }
  },
  computed: {
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
        let sc = document.createElement('script')
        sc.src = source
        sc.onload = resolve
        sc.onerror = reject
        sc.setAttribute('type', 'text/javascript')
        document.body.appendChild(sc)
      })
    },
    modalCancel() {
      this.errors = {}
      this.profile.image = this.$store.getters.getUserInfo.image
      this.profile.name = this.$store.getters.getUserInfo.name
      this.profile.phone = this.$store.getters.getUserInfo.phone
      this.profile.gender = this.$store.getters.getUserInfo.gender
      this.profile.address = this.$store.getters.getUserInfo.addres
    },

    profileFileSelected(e) {
      {
        const wrapper = document.querySelector('#editWrapper')
        const image = document.querySelector('#profileImage')
        const defaultBtn = document.querySelector('#profile-default-btn')
        const fileName = document.querySelector('#profile-file-name')

        console.log(e)
        // const file = this.$refs.defaultBtn.files[0];
        let file = e.target.files[0]
        this.profile.image = file

        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result
            image.src = result
            wrapper.classList.add('active')
          }

          reader.readAsDataURL(file)
        }

        if (defaultBtn.value) {
          // console.log(defaultBtn.value);
          let valueStore = defaultBtn.value.match(this.regex)
          fileName.textContent = valueStore
        }
      }
    },
    profileCancelBtnClicked() {
      this.profile.image = null
      document.querySelector('#profileImage').src = ''
      document.querySelector('#editWrapper').classList.remove('active')
      document.querySelector('#profile-default-btn').value = ''
    },

    profileSave() {
      console.log(this.profile)
      axios
        .post('http://localhost:8000/api/profile/update', this.profile, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response.data.user)
          // this.$store.commit('changeUserInfo',response.data.user);
          sessionStorage.setItem('user', JSON.stringify(response.data.user))
          window.$('#profileModal').modal('hide')
          window.location.reload()
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },

    profileDefaultBtnActivate() {
      const defaultBtn = document.querySelector('#profile-default-btn')
      defaultBtn.click()
    },

    passwordClicked() {
      this.passwordModalVisible = true
    },

    passwordToggle() {
      console.log('clicked');
      const oldPasswordField = document.getElementsByClassName('old-password')[0];
      const passwordFields = document.querySelectorAll('.password');
      const togglePassword = document.querySelector('.password-toggle-icon i');

      // console.log(oldPasswordField);
      if (oldPasswordField.type === 'password') {
        passwordFields.forEach(passwordField => {
          passwordField.type = 'text';
        });
        togglePassword.classList.remove('fa-eye-slash')
        togglePassword.classList.add('fa-eye')
      } else {
        passwordFields.forEach(passwordField => {
          passwordField.type = 'password';
        });
        togglePassword.classList.remove('fa-eye')
        togglePassword.classList.add('fa-eye-slash')
      }

    },

    passwordSave() {
      // console.log(this.passwordForm);
      axios
        .post('http://localhost:8000/api/password/update', this.passwordForm)
        .then((response) => {
          console.log(response)

            window.$('#passwordModal').modal('hide');
            // this.$router.go('admin/category/list');
            window.location.reload();
            
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    }
  },

  async mounted() {
    console.log(this.$store.getters.getUserInfo);
    await this.makeScript('../../../assets/vendor/chart.js/Chart.min.js')
    await this.makeScript('../../../assets/vendor/jquery/jquery.min.js')
    await this.makeScript('../../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js')
    await this.makeScript('../../../assets/vendor/jquery-easing/jquery.easing.min.js')
    await this.makeScript('../../../assets/js/sb-admin-2.min.js')
  }
}
