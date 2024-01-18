<template>
  <div v-if="analysisComplete">
    <BarChart
        :analysisResponses="analysisResponses"
        :label="analysisResponsesLabel"
        :analysis-complete="analysisComplete"
    />
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: "AnalysePanel",
  components: {BarChart},

  props: {
    analysisResponses: {
      type: Object,
      required: true,
    },
    analysisResponsesLabel: {
      type: String,
      required: true,
    },
    analysisComplete: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>


<style scoped>

</style>
