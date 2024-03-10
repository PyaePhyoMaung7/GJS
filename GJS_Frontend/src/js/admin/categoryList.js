import axios from 'axios'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import Modal from '../../components/Modal.vue'


export default {
  name: 'categoryList',
  components: {
    Bootstrap5Pagination,
    Modal,
  },
  data() {
    return {
      categories: null,
      reverseCategories: null,
      order: 'desc',
      loading: true,
      createForm: {
        category: null,
      },
      editForm: {
        id: null,
        category: null,
      },
      errors: {},
      createModalVisible: false,
      editModalVisible: false,
      currentPage: 1,
      searchKey: '',
    }
  },

  methods: {
    getCategoryData(page = this.currentPage) {
      this.loading = true
      axios.post(`http://localhost:8000/api/category/list?page=${page}`,{'key': this.searchKey}).then((response) => {
        this.reverseCategories = response.data.categories
        this.loading = false
        this.categories = this.reverseCategories.data.slice().reverse()
        // console.log(response.data.categories)
        this.currentPage = response.data.categories.current_page;
        console.log(this.currentPage);
      })
    },
    ascClicked() {
      document.getElementById('ascBtn').classList.remove('btn-white')
      document.getElementById('ascBtn').classList.add('btn-primary')
      document.getElementById('descBtn').classList.remove('btn-primary')
      document.getElementById('descBtn').classList.add('btn-white')
      this.order = 'asc'
    },
    descClicked() {
      document.getElementById('descBtn').classList.remove('btn-white')
      document.getElementById('descBtn').classList.add('btn-primary')
      document.getElementById('ascBtn').classList.remove('btn-primary')
      document.getElementById('ascBtn').classList.add('btn-white')
      this.order = 'desc'
    },
    createSave(){
      console.log(this.createForm.category);
      axios.post('http://localhost:8000/api/category/create', this.createForm).then((response)=>{
        console.log(response);

        window.$('#categoryCreate').modal('hide');
        window.location.reload();
      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
    editClicked(categoryId, categoryName){
      this.editModalVisible = true;
      this.editForm.id = categoryId;
      this.editForm.category = categoryName;

    },
    deleteClicked(categoryId){
      console.log(categoryId);
      axios.post('http://localhost:8000/api/category/delete', {'id': categoryId} ).then((response)=>{
        console.log(response);
        window.location.reload();
    })
  },
    editSave(){
      console.log(this.editForm.category);
      axios.post('http://localhost:8000/api/category/update', this.editForm).then((response)=>{
        console.log(response);

        window.$('#categoryEdit').modal('hide');
        // this.$router.go('admin/category/list');
        window.location.reload();

      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
  },

  mounted() {
    this.getCategoryData()
  }
}