<template>
  <div class="analyse-panel">
    <div v-if="analysisIsComplete">
      <div class="bar-chart-container">
      <BarChart
          :analysedData="barChartData"
          :label="barChartLabel"
          :analysisIsComplete="analysisIsComplete"
          :isDisabled="barChartIsDisabled"/>
      </div>
      <div class="pie-chart-container">
      <PieChart
          :analysedData="pieChartData"
          :label="pieChartLabel"
          :analysisIsComplete="analysisIsComplete"
          :isDisabled="pieChartIsDisabled"/>
      </div>
    </div>
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

.analyse-panel {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.bar-chart-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50%;

}
.pie-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}

</style>
