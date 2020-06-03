<template>
  <div class="nav-container">
    <ul class="nav nav-tabs card-header-tabs m-0">
      <li
        v-for="tab in allTabs"
        :key="'navTab' + tab"
        @click="$emit('change-tab', tab)"
        class="nav-item"
      >
        <a
          class="nav-link border border-right-0"
          :class="[
            'clickable',
            {
              active: currentTab === tab,
            },
          ]"
        >
          {{ tab }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navTab",
  props: {
    currentTab: { type: String, required: true },
    allTabs: { type: Array, required: true },
  },
};
</script>

<style scoped>
.nav-container {
  height: 30px;
  width: 100%;
  padding: 0;
  margin: 0;
}
.nav-tabs {
  font-size: 11px !important;
  height: 30px;
}
.nav-tabs .nav-link {
  color: #0079fa !important;
  cursor: pointer;
  user-select: none;
}
.nav-tabs li:last-of-type .nav-link {
  border-right: 1px solid #dee2e6 !important;
}
.nav-tabs .nav-link:hover {
  text-decoration: underline;
}
.nav-tabs .nav-link.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default !important;
  text-decoration: none !important;
  transition: background-color 200ms;
}
</style>
