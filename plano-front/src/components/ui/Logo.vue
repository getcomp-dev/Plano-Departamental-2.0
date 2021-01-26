<template>
  <div class="logo">
    <font-awesome-icon :icon="['fas', 'graduation-cap']" />
    SIPlanWeb
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins";

.logo {
  @include no-focus;
  font-family: "Crete Round", serif;
  font-weight: 400;
}
</style>
