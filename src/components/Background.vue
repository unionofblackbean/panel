<template>
  <div class="background" :style="style"></div>
</template>

<script>
export default {
  name: "Background",
  props: {
    src: String,
  },
  computed: {
    style() {
      return {
        backgroundImage: `url(${this.src})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;

  width: 100vw;
  height: 100vh;

  background: center center no-repeat fixed;
  background-size: cover;
}
</style>
