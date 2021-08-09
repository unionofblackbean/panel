<template>
  <div id="not-found">
    <el-empty :description="$t('404')" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
#not-found {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
