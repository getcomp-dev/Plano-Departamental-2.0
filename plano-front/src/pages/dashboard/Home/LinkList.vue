<template>
  <div class="list-container col-12 mb-1">
    <h3 class="list-title">{{ title }}</h3>
    <ul class="list-group">
      <li v-for="page in pages" :key="page.path" class="list-group-item">
        <strong>
          <router-link :to="{ path: page.path }">{{ page.title }}:</router-link>
        </strong>
        {{ page.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LinkList",
  props: {
    title: {
      type: String,
      default: "Vázio",
    },
    pages: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  .list-title {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 600;
    color: #3f3f3f;
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
