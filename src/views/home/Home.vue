<template>
  <div style="text-align: center; margin-top: 50px">
    <div class="cloudCss" ref="cloudRef"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotWord: [
        "万事如意",
        "事事如意 ",
        "万事亨通",
        "一帆风顺",
        "万事大吉",
        "吉祥如意",
        "步步高升",
        "步步登高",
        "三羊开泰",
        "得心应手",
        "财源广进",
        "陶未媲美",
        "阖家安康",
        "龙马精神",
      ],
      color: [
        "#a18cd1",
        "#fad0c4",
        "#ff8177",
        "#fecfef",
        "#fda085",
        "#f5576c",
        "#330867",
        "#30cfd0",
        "#38f9d7",
      ],
      wordArr: [],
      timer: null,
      resetTime: 0,
      ContainerSize: {
        leftPos: {
          x: 0,
          y: 0,
        },
        rightPos: {
          x: 0,
          y: 0,
        },
      },
    };
  },
  mounted() {
    console.dir(this);
    this.wordArr = this.dealSpan();
    this.ContainerSize = this.getContainerSize();
    this.startFly();
  },
  destroyed() {},
  methods: {
    dealSpan() {
      const wordArr = [];
      this.hotWord.forEach((value) => {
        const spanDom = document.createElement("span");
        spanDom.style.position = "relative";
        spanDom.style.display = "inline-block";
        spanDom.style.color = this.randomColor();
        spanDom.style.fontSize = this.randomNumber(15, 25) + "px";
        spanDom.innerHTML = value;
        spanDom.local = {
          position: {
            x: 0,
            y: 0,
          },
          direction: {
            x: 1,
            y: 1,
          },
          velocity: {
            x: -0.5 + Math.random(),
            y: -0.5 + Math.random(),
          },
        };

        this.$refs.cloudRef.appendChild(spanDom);
        wordArr.push(spanDom);
      });
      wordArr.forEach((value) => {
        value.local.realPos = {
          minx: value.offsetLeft,
          maxx: value.offsetLeft + value.offsetWidth,
          miny: value.offsetTop,
          maxy: value.offsetTop + value.offsetHeight,
        };
      });
      return wordArr;
    },
    startFly() {
      if (this.resetTime < 100) {
        this.timer = requestAnimationFrame(this.startFly.bind(this));
        this.resetTime = 0;
      }
      this.wordFly();
    },
    wordFly() {
      this.wordArr.forEach((value) => {
        if (
          value.local.realPos.minx + value.local.position.x <
          this.ContainerSize.leftPos.x
        ) {
          value.local.direction.x = -value.local.direction.x;
        }
        if (
          value.local.realPos.maxx + value.local.position.x >
          this.ContainerSize.rightPos.x
        ) {
          value.local.direction.x = -value.local.direction.x;
        }
        if (
          value.local.realPos.miny + value.local.position.y <
          this.ContainerSize.leftPos.y
        ) {
          value.local.direction.y = -value.local.direction.y;
        }
        if (
          value.local.realPos.maxy + value.local.position.y >
          this.ContainerSize.rightPos.y
        ) {
          value.local.direction.y = -value.local.direction.y;
        }
        value.local.position.x +=
          value.local.velocity.x * value.local.direction.x;
        value.local.position.y +=
          value.local.velocity.y * value.local.direction.y;
        value.style.transform =
          "translate(" +
          value.local.position.x +
          "px," +
          value.local.position.y +
          "px)";
      });
    },
    randomColor() {
      var colorIndex = Math.floor(this.color.length * Math.random());
      return this.color[colorIndex];
    },
    randomNumber(lowerInteger, upperInteger) {
      const choices = upperInteger - lowerInteger + 1;
      return Math.floor(Math.random() * choices + lowerInteger);
    },
    getContainerSize() {
      const el = this.$refs.cloudRef;
      return {
        leftPos: {
          x: el.offsetLeft,
          y: el.offsetTop,
        },
        rightPos: {
          x: el.offsetLeft + el.offsetWidth,
          y: el.offsetTop + el.offsetHeight,
        },
      };
    },
  },
};
</script>

<style>
.cloudCss {
  width: 400px;
  height: 400px;
  display: inline-block;
  background-color: #272020;
  opacity: 0.8;
}
</style>