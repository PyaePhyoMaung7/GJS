import axios from 'axios'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import { ref } from 'vue'

export default {
  name: 'productList',
  components: {
    Bootstrap5Pagination
  },
  data() {
    return {
      products: null,
      reverseProducts: null,
      categories: null,
      brands: null,
      order: 'desc',
      loading: true,
      createForm: {
        title: null,
        description: null,
        image: null,
        category: null,
        brand: null,
        price: null,
        instock: null
      },
      editForm: {
        id: null,
        title: null,
        description: null,
        image: null,
        category: null,
        brand: null,
        price: null,
        instock: null
      },
      errors: {},
      regex: /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/,
      createModalVisible: false,
      editModalVisible: false,
      currentPage: 1,
      searchKey: '',
      productImage: '',
    }
  },

  methods: {
    getProductData(page = 1) {
      this.loading = true
      axios.post(`http://localhost:8000/api/product/list?page=${page}`, {'key':this.searchKey}).then((response) => {
        this.reverseProducts = response.data.products
        this.loading = false
        this.getBrandData()
        this.getCategoryData()
        this.products = this.reverseProducts.data.slice().reverse()
        console.log(response.data.products)
      })
    },
    getBrandData() {
      axios.get('http://localhost:8000/api/product/brand/list').then((response) => {
        this.brands = response.data.brands
      })
    },
    getCategoryData() {
      axios.get('http://localhost:8000/api/product/category/list').then((response) => {
        this.categories = response.data.categories
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
    modalCancel(){
      this.createModalVisible = false;
      this.errors = {};
      },
    fileSelected(e) {
      {
        console.log(e)
        // const file = this.$refs.defaultBtn.files[0];
        let file = e.target.files[0]
        this.createForm.image = file
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result
            this.$refs.productImage.src = result
            this.$refs.wrapper.classList.add('active')
          }

          reader.readAsDataURL(file)
        }

        if (this.$refs.defaultBtn.value) {
          let valueStore = this.$refs.defaultBtn.value.match(this.regex)
          this.$refs.fileName.textContent = valueStore
        }
      }
    },
    editFileSelected(e) {
      {
        const wrapper = document.querySelector('#editWrapper');
        const image = document.querySelector('#editProductImage');
        const defaultBtn = document.querySelector('#edit-default-btn');
        const fileName = document.querySelector('#edit-file-name');

        console.log(e)
        // const file = this.$refs.defaultBtn.files[0];
        let file = e.target.files[0]
        this.editForm.image = file

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
          let valueStore = defaultBtn.value.match(this.regex)
          fileName.textContent = valueStore
        }
      }
    },
    cancelBtnClicked() {
      this.$refs.productImage.src = ''
      this.$refs.wrapper.classList.remove('active')
      this.$refs.defaultBtn.value = ''
    },
    editCancelBtnClicked() {
      this.editForm.image = null;
      document.querySelector('#editProductImage').src = '';
      document.querySelector('#editWrapper').classList.remove('active');
      document.querySelector('#edit-default-btn').value = '';
    },
    deleteClicked(productId) {
      console.log(productId)
      axios.post('http://localhost:8000/api/product/delete', { id: productId }).then((response) => {
        console.log(response)
        window.location.reload()
      })
    },
    createSave() {
      console.log(this.createForm);
      axios.post('http://localhost:8000/api/product/create', this.createForm, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response)
          window.$('#productCreate').modal('hide');
          window.location.reload();
        })
        .catch((error)=>{
          this.errors = error.response.data.errors;
        })

    },
    editClicked(id, name, image, description, category, brand, price, instock){
      this.editModalVisible = true;
      this.editForm.id = id;
      this.editForm.title = name;
      this.productImage = image;
      this.editForm.description = description;
      this.editForm.category = category;
      this.editForm.brand = brand;
      this.editForm.price = price;
      this.editForm.instock = instock; 
    },
    editDefaultBtnActivate(){
      const editDefaultBtn = document.querySelector('#edit-default-btn');
      editDefaultBtn.click();
    },
    editSave(){
      console.log(this.editForm);
      axios.post('http://localhost:8000/api/product/update', this.editForm, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response)=>{
        console.log(response);
        
        window.$('#productEdit').modal('hide');
        window.location.reload();

      }).catch((error)=>{
        this.errors = error.response.data.errors;
      })
    },
  },

  mounted() {
    this.getProductData()
  }
}
