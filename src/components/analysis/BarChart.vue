<template>
  <div>
    <div v-if="analysisIsComplete && !isDisabled">
      <div class="chart-container" :ref="chartRef"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
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
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartRef: 'myChart',
    };
  },
  watch: {
    analysedData: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if(!this.analysisIsComplete || this.isDisabled){
        return
      }
      const chart = echarts.init(this.$refs[this.chartRef]);
      const xAxisData = Object.keys(this.analysedData);
      const seriesData = Object.values(this.analysedData);

      const option = {
        title: {
          left: 'center',
          textStyle: {
            color: '#3E5A71',
            fontSize: 24,
          },
        },
        xAxis: {
          data: xAxisData,
          axisLabel: {
            color: '#3E5A71',
            fontSize: 15,
          },
        },
        yAxis: {
          axisLabel: {
            color: '#3E5A71',
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        series: [
          {
            name: this.label,
            type: 'bar',
            data: seriesData,
            itemStyle: {
              color: '#3E5A71',
              show: true,
              position: 'top',

            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(124, 139, 152, 0.6)'
            }
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style scoped>

.chart-container {
  width: 300px;
  height: 300px;
}

</style>
