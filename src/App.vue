<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initLocaleMixin } from "@/mixins/locale";

export default {
  name: "App",
  mixins: [initLocaleMixin],
};
</script>

<style lang="scss">
@import "styles/styles";

body {
  margin: 0;
}
</style>
