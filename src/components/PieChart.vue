<template>
  <div v-if="analysisComplete">
    <Pie :data="chartData" :options="chartOptions"/>
  </div>
</template>

<script >
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Pie} from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    analysisRespondents: {
      type: Object,
      required: true,
    },
    label: {
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
      // analysisRespondents:{
      //   'total': 3,
      //   'anonym': 1,
      // },
      chartData: {
        labels: Object.keys(this.analysisRespondents),
        datasets: [
          {
            label: this.label,
            backgroundColor: ['#4CAF50', '#4e5a4f'],
            data: Object.values(this.analysisRespondents),
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
