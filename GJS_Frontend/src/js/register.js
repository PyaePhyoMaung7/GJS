import axios from 'axios'

export default{
    name: 'register',
    data(){
        return {
            form:{
                user_name: null,
                email: null,
                password: null,
                confirm_password: null,
            },
            errors:{},
        }
    },
    methods:{
        registerAccount(){
            axios.post('http://localhost:8000/api/register', this.form).then((response)=>{
                console.log(response);
                this.$store.commit('changeUserInfo', response.data.user)
                sessionStorage.setItem('user',JSON.stringify(this.$store.getters.getUserInfo))
                this.$router.push('/user/products')
                
            }).catch((error)=>{
                // console.log(error.response.data.errors);
                this.errors = error.response.data.errors;
            })
        }
    }
}