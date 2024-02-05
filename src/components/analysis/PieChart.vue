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
  name: 'PieChart',
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
      chartRef: 'pie-chart',
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
      const chartElement = this.$refs[this.chartRef];
      const myChart = echarts.init(chartElement);

      const data = Object.keys(this.analysedData).map((key) => ({
        name: key,
        value: this.analysedData[key],
      }));

      const option = {
        legend: {
          orient: 'top',
          left: 'right',
          textStyle: {
            color: '#3E5A71',
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '55%'],
            data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              show: true,
              formatter: '({d}%)',
              textStyle: {
                color: '#3E5A71',
                fontSize: 14,
                fontWeight: 'bold',
              },
            },
            color: ['#3E5A71', 'rgba(124, 139, 152, 0.6)'],
          },

        ],
      };
      myChart.setOption(option);
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
