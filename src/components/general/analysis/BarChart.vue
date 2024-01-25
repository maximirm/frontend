<template>
  <div v-if="analysisIsComplete && !isDisabled">
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"/>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
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
            backgroundColor: '#7897B1',
            data: Object.values(this.analysedData),
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

<style scoped>
/* Ändern Sie die Textfarbe */
.text-color {
  color: #FF0000; /* Beispiel: Rote Textfarbe */
}

/* Ändern Sie die Textgröße */
.text-size {
  font-size: 20px; /* Beispiel: Schriftgröße von 20 Pixeln */
}
</style>
