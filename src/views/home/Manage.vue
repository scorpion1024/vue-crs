<template>
  <div>
    <div id="echart" class="chart-con"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return { charts: {} };
  },
  methods: {
    drawChart(id) {
      let option = {
        title: {
          text: "城市降雨量",
          x: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: { left: "20px", orient: "horizontal", data: [] },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [],
      };
      this.charts = echarts.init(document.getElementById(id));
      this.$api
        .getWeaherData()
        .then((res) => {
          option.series = res.echart.map((item) => {
            let data = {
              name: item.name,
              type: "line",
              smooth: false,
              data: [],
            };
            option.legend.data.push(item.name);
            item.data.forEach((value) => {
              data.data.push([new Date(value[0]), value[1]]);
            });
            return data;
          });
          this.charts.setOption(option);
          window.addEventListener("resize", () => {
            this.charts.resize();
          });
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
  mounted() {
    this.drawChart("echart");
  },
};
</script>

<style scoped>
.chart-con {
  height: 400px;
}
</style>