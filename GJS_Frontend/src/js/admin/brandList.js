import axios from 'axios'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'

export default {
  name: 'brandList',
  components: {
    Bootstrap5Pagination
  },
  data() {
    return {
      brands: null,
      reverseBrands: null,
      order: 'desc',
      loading: true,
      createForm: {
        brand: null,
      },
      editForm: {
        id: null,
        brand: null,
      },
      errors: {},
      createModalVisible: false,
      editModalVisible: false,
      currentPage: 1,
      searchKey: '',
    }
  },

  methods: {
    getBrandData(page = 1) {
      this.loading = true
      axios.post(`http://localhost:8000/api/brand/list?page=${page}`,{'key': this.searchKey}).then((response) => {
        this.reverseBrands = response.data.brands
        this.loading = false
        this.brands = this.reverseBrands.data.slice().reverse()
        console.log(response.data.brands)
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
      console.log(this.createForm.brand);
      axios.post('http://localhost:8000/api/brand/create', this.createForm).then((response)=>{
        console.log(response);

        window.$('#categoryCreate').modal('hide');
        window.location.reload();
      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
    editClicked(brandId, brandName){
      this.editModalVisible = true;
      this.editForm.id = brandId;
      this.editForm.brand = brandName;

    },
    editSave(){
      console.log(this.editForm.brand);
      axios.post('http://localhost:8000/api/brand/update', this.editForm).then((response)=>{
        console.log(response);

        window.$('#brandEdit').modal('hide');
        window.location.reload();

      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
    deleteClicked(brandId){
      console.log(brandId);
      axios.post('http://localhost:8000/api/brand/delete', {'id': brandId} ).then((response)=>{
        console.log(response);
        window.location.reload();
    })},
  },

  mounted() {
    this.getBrandData()
  }
}