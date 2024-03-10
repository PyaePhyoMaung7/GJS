import axios from 'axios'
import {Bootstrap5Pagination} from 'laravel-vue-pagination'

export default {
  name: 'userList',
  components:{
    Bootstrap5Pagination,
  },
  data() {
    return {
      users: null,
      reverseUsers: null,
      currentUserId: this.$store.getters.getUserId,
      order: 'desc',
      loading: true,
    }
  },

  methods: {
    getUserData( page = 1){
      this.loading = true;
      axios.get(`http://localhost:8000/api/user/list?page=${page}`).then((response) => {
      this.reverseUsers = response.data.users;
      this.loading = false;
      this.users = this.reverseUsers.data.slice().reverse();
      console.log(response.data.users)
    })
    },
    ascClicked(){
        document.getElementById('ascBtn').classList.remove('btn-white');
        document.getElementById('ascBtn').classList.add('btn-primary');
        document.getElementById('descBtn').classList.remove('btn-primary');
        document.getElementById('descBtn').classList.add('btn-white');
        this.order = 'asc';
    },
    descClicked(){
        document.getElementById('descBtn').classList.remove('btn-white');
        document.getElementById('descBtn').classList.add('btn-primary');
        document.getElementById('ascBtn').classList.remove('btn-primary');
        document.getElementById('ascBtn').classList.add('btn-white');
        this.order = 'desc';
    },
    roleChange(e){
      axios.post('http://localhost:8000/api/user/role/change',{id: e.target.id, role: e.target.value}).then((response) => {
        console.log(response);
        console.log(this.$store.getters.getUserId);

      }).catch((error)=>{ console.log(error) })
    }
  },

  mounted() {
    this.getUserData();
  }
}