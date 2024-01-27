<template>
  <div class="container" v-if="analysisIsComplete">
    <h2>Umfrageanalyse</h2>
    <BarChart
        :analysedData="barChartData"
        :label="barChartLabel"
        :analysisIsComplete="analysisIsComplete"
        :isDisabled="barChartIsDisabled"/>
    <PieChart
        :analysedData="pieChartData"
        :label="pieChartLabel"
        :analysisIsComplete="analysisIsComplete"
        :isDisabled="pieChartIsDisabled"/>
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
    barChartIsDisabled: {
      type: Boolean,
      default: false,
    },
    pieChartIsDisabled: {
      type: Boolean,
      default: false,
    },
    analysisIsComplete: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 20px;
  color: #3E5A71;
}

</style>
