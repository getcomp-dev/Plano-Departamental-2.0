<template>
  <div class="list-container col-12 mb-1">
    <h3 class="list-title">{{ title }}</h3>
    <ul class="list-group">
      <li v-for="page in pages" :key="page.path" class="list-group-item">
        <b>
          <router-link :to="{ path: page.path }">{{ page.title }}:</router-link>
        </b>
        {{ page.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PagesList",
  props: {
    title: { type: String, default: "" },
    pages: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.list-container {
  > .list-title {
    font-size: 14px;
    margin-top: 16px;
    font-weight: bold;
    color: $clr-text-darkgray;
  }

  > .list-group {
    line-height: 30px;
    font-size: 12px;
    line-height: inherit;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);

    > .list-group-item {
      padding: 9px;
    }
  }
}
</style>
