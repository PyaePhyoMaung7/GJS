import axios from 'axios'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'

export default {
  name: 'materialList',
  components: {
    Bootstrap5Pagination
  },
  data() {
    return {
      materials: null,
      reverseMaterials: null,
      order: 'desc',
      loading: true,
      createForm: {
        material: null,
      },
      editForm: {
        id: null,
        material: null,
      },
      errors: {},
      createModalVisible: false,
      editModalVisible: false,
      currentPage: 1,
      searchKey: '',
    }
  },

  methods: {
    getMaterialData(page = 1) {
      this.loading = true
      axios.post(`http://localhost:8000/api/material/list?page=${page}`, {'key': this.searchKey}).then((response) => {
        this.reverseMaterials = response.data.materials
        this.loading = false
        this.materials = this.reverseMaterials.data.slice().reverse()
        console.log(response.data.materials)
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
      console.log(this.createForm.material);
      axios.post('http://localhost:8000/api/material/create', this.createForm).then((response)=>{
        console.log(response);

        window.$('#materialCreate').modal('hide');
        window.location.reload();
      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
    editClicked(materialId, materialName){
      this.editModalVisible = true;
      this.editForm.id = materialId;
      this.editForm.material = materialName;
    },
    editSave(){
      console.log(this.editForm.material);
      axios.post('http://localhost:8000/api/material/update', this.editForm).then((response)=>{
        console.log(response);

        window.$('#materialEdit').modal('hide');
        // this.$router.go('admin/category/list');
        window.location.reload();

      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
    deleteClicked(materialId){
      console.log(materialId);
      axios.post('http://localhost:8000/api/material/delete', {'id': materialId} ).then((response)=>{
        console.log(response);
        window.location.reload();
    })
  },

  },

  mounted() {
    this.getMaterialData()
  }
}