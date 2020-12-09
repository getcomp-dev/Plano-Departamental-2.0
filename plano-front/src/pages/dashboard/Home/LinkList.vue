<template>
  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 mb-3">
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
      default: "Nenhum titulo passado para o componente!",
    },
    pages: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>
.list-title {
  margin-top: 2%;
  font-size: 14px;
  font-weight: 600;
  color: #3f3f3f;
}

.list-group {
  line-height: 30px;
  font-size: 12px;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
.list-group .list-group-item {
  padding: 9px 15px;
}
</style>
