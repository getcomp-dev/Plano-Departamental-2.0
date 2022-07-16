<template>
  <div class="container m-0">
    <h3 class="list-title">{{ title }}</h3>
    <ul>
      <li
        v-for="(page, index) in pages"
        :key="page.path"
        class="block-item m-1"
        @mouseover="showIndex = index"
        @mouseleave="showIndex = null"
      >
        <strong class="block-header">
          <router-link :to="{ path: page.path }">{{ page.title }}</router-link>
        </strong>
        <div class="block-description">
          {{ page.description }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.list-title {
  font-size: 16px;
  margin-top: 8px;
  padding-left: 10%;
  font-weight: bold;
  color: $clr-text-darkgray;
}

.container ul {
  width: 100%;
  margin: 0 auto;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container a {
  color: white;
}

.block-item {
  text-align: center;
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 8px !important;
  transition: 0.2s;
  overflow: hidden;

  > .block-header {
    display: block;
    background: $clr-mainred;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > .block-description {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    height: 95px;
    padding: 0 2.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #9e9e9e;
    border-radius: 0 0 8px 8px;
  }
}

.block-item:hover {
  height: 125px;
  transition: 0.4s;

  > .block-header {
    width: 100%;
    height: 30px;
    color: white !important;
  }
}
</style>

<script>
export default {
  name: "PagesBlock",
  props: {
    title: { type: String, default: "" },
    pages: { type: Array, default: () => [] },
  },
  data() {
    return {
      showIndex: null,
    };
  },
};
</script>
