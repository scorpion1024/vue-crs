<template>
  <div>Chart</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      seriesData: [],
      legendData : { left: "20px", orient: "horizontal", data: [] }
    };
  },
  mounted() {
    this.$api
      .getWeaherData()
      .then((res) => {
        this.seriesData = res.echart.map(item => {
            let data = {
              name: item.name,
              type: "line",
              smooth: false,
              data: [],
            };
            this.legendData.data.push(item.name);
            item.data.forEach((value) => {
              data.data.push([new Date(value[0]), value[1]]);
            });
            return data;
          })
        console.log(this.seriesData);
      })
      .catch((res) => {
        console.log(res);
      });
  },
};
</script>

<style>
</style>