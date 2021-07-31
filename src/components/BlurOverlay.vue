<template>
  <div class="blur-overlay"></div>
</template>

<script>
export default {
  name: "BlurOverlay",
};
</script>

<style lang="scss" scoped>
.blur-overlay {
  position: absolute;

  width: 100vw;
  height: 100vh;

  backdrop-filter: blur(5px);
}
</style>
