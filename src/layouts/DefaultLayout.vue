<template>
  <v-app>
    <div class="d-flex">
      <div class="menu-container">
        <the-menu />
      </div>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import TheMenu from "@/components/TheMenu.vue";

export default {
  name: "DefaultLayout",
  components: {
    TheMenu,
  },
};
</script>

<style scope>
.menu-container {
  min-width: 200px;
  min-height: 100vh;
  background-color: #333;
}
</style>
<style lang="scss">
