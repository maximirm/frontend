<template>
  <div v-if="analysisIsComplete && !isDisabled">
    <Pie
        :data="chartData"
        :options="chartOptions"/>
  </div>
</template>

<script>
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Pie} from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    analysedData: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    analysisIsComplete: {
      type: Boolean,
      required: true,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartData: {
        labels: Object.keys(this.analysedData),
        datasets: [
          {
            label: this.label,
            backgroundColor: ['#7897B1', '#3E5A71'],
            data: Object.values(this.analysedData),
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
}
</script>
