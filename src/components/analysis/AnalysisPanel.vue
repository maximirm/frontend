<template>
  <div v-if="analysisIsComplete" >
    <BarChart
        :analysedData="barChartData"
        :label="barChartLabel"
        :analysisIsComplete="analysisIsComplete"/>
    <PieChart
        :analysedData="pieChartData"
        :label="pieChartLabel"
        :analysisIsComplete="analysisIsComplete"/>
  </div>
</template>

<script>
import BarChart from "@/components/analysis/BarChart.vue";
import PieChart from "@/components/analysis/PieChart.vue";

export default {
  name: "AnalysisPanel",
  components: {
    PieChart,
    BarChart
  },
  props: {
    barChartData: {
      type: Object,
      required: true,
    },
    pieChartData: {
      type: Object,
      required: true,
    },
    barChartLabel: {
      type: String,
      required: true,
    },
    pieChartLabel: {
      type: String,
      required: true,
    },
    analysisIsComplete: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
