<template>
  <div v-if="analysisComplete">
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />

  </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    analysisResponses: {
      type: Object,
      required: true,
    },
    label :{
      type: String,
      required: true,
    },
    analysisComplete: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      chartData: {
        labels: Object.keys(this.analysisResponses),
        datasets: [
          {
            label: this.label,
            backgroundColor: '#4CAF50',
            data: Object.values(this.analysisResponses),
          },
        ],
      },
      chartOptions: {
        responsive: true,

      },

    }
  },
}
</script>
