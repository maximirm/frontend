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
      default: false,
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
        title: {
          text: this.label,
          left: 'center', // Zentriere den Titel horizontal
          textStyle: {
            color: '#3E5A71', // Ändere die Textfarbe des Titels
            fontSize: 24, // Ändere die Textgröße des Titels
          },
        },
        legend: {
          orient: 'bottom',
          left: 'left',
          textStyle: {
            color: '#3E5A71', // Ändere die Textfarbe
            fontSize: 15, // Ändere die Schriftgröße
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        series: [
          {
            name: this.label,
            type: 'pie',
            radius: '65%', // Ändere die Größe des Pie-Charts
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
                color: '#3E5A71', // Ändere die Textfarbe
                fontSize: 14, // Ändere die Schriftgröße
                fontWeight: 'bold', // Ändere die Schriftart
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
