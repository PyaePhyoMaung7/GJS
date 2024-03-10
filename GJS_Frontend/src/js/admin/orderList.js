import axios from 'axios'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'

export default {
    name: 'orderList',
  components: {
    Bootstrap5Pagination
  },
  data() {
    return {
      orders: null,
      reverseOrders: null,
      order: 'desc',
      loading: true
    }
  },

  methods: {
    getOrderData(page = 1) {
      this.loading = true
      axios.get(`http://localhost:8000/api/order/list?page=${page}`).then((response) => {
        this.reverseOrders = response.data.orders
        this.loading = false
        this.orders = this.reverseOrders.data.slice().reverse()
        console.log(response.data.orders)
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
    }
  },

  mounted() {
    this.getOrderData()
  }
}
