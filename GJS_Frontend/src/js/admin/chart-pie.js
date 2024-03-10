import axios from 'axios'

export default {
  name: 'PieChart',
  data() {
    return {}
  },
  computed: {
    statusFrequency() {
      return this.$store.getters.getStatusData.map((OneStatus) => {
        return OneStatus.status_frequency
      })
    }
  },
  methods: {
    loadOrderStatusData(callback1, callback2) {
      this.$store.commit('changeStatusDataLoaded', false)

      axios.get('http://localhost:8000/api/order/status').then((response) => {
        this.$store.commit('changeStatusData', response.data.statusData)
        console.log(this.$store.getters.getStatusData)

        this.$store.commit('changeStatusDataLoaded', true)

        callback1()
        callback2()
      })
    },

    storeAcceptedRate() {
      let pending = this.$store.getters.getStatusData[0].status_frequency
      let accept = this.$store.getters.getStatusData[1].status_frequency
      this.$store.commit('changeAcceptedRate', ((accept / (pending + accept)) * 100).toFixed(2))
    },

    drawChart() {
      // Set new default font family and font color to mimic Bootstrap's default styling
      ;(Chart.defaults.global.defaultFontFamily = 'Nunito'),
        '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
      Chart.defaults.global.defaultFontColor = '#858796'

      // Pie Chart Example
      var ctx = document.getElementById('myPieChart')
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'Accepted', 'Rejected'],
          datasets: [
            {
              data: this.statusFrequency,
              backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
              hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
              hoverBorderColor: 'rgba(234, 236, 244, 1)'
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80
        }
      })
    }
  },
  mounted() {
    this.loadOrderStatusData( this.drawChart, this.storeAcceptedRate)
  }
}
