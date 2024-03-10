import PieChart from '../../components/PieChart.vue'
import AreaChart from '../../components/AreaChart.vue'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  components: {
    AreaChart: AreaChart,
    PieChart: PieChart
  },
  methods: {
    thousandsSeparators(num) {
      let num_parts = num.toString().split('.')
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return num_parts.join('.')
    },
    
  },
  computed: {
    currentMonthRevenue() {
      let salesData = this.$store.getters.getSalesData
      return this.thousandsSeparators(Number(salesData[salesData.length - 1].monthly_sales))
    },

    pastTwelveMonthsRevenueAverage() {
      let totalRevenue = 0
      let salesData = this.$store.getters.getSalesData

      for (let i = 0; i < salesData.length - 1; i++) {
        totalRevenue += Number(salesData[i].monthly_sales)
      }

      return this.thousandsSeparators((totalRevenue / 12).toFixed(2))
    },

    getPendingRequests() {
      return this.$store.getters.getStatusData[0].status_frequency
    },

    changeTaskProgressBar() {
      if (this.$store.getters.getAcceptedRate != 0) {
        document.getElementById('acceptedProgressBar').style.width =
          this.$store.getters.getAcceptedRate + '%'
      }
    }
  },
  mounted() {}
}
