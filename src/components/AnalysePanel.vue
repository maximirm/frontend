<template>
  <div v-if="analysisComplete" >

    <BarChart
        :analysisResponses="analysisResponses"
        :label="analysisResponsesLabel"
        :analysis-complete="analysisComplete"
    />
    <PieChart
        :label="analysisRespondentsLabel"
        :analysis-complete="analysisComplete"
        :analysis-respondents="analysisRespondents"
    >

    </PieChart>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  name: "AnalysePanel",
  components: {PieChart, BarChart},

  props: {
    analysisResponses: {
      type: Object,
      required: true,
    },
    analysisRespondents: {
      type: Object,
      required: true,
    },
    analysisResponsesLabel: {
      type: String,
      required: true,
    },
    analysisRespondentsLabel: {
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
