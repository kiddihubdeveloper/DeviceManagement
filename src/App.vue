<template>
  <router-view />
</template>
<script>
import users from "../data/users.json";
import devices from "../data/devices.json";

import storage from "@/utils/storage.js";

export default {
  name: "App",

  created() {
    storage.store("users", users);
    storage.store("devices", devices);
  },
};
</script>
<style lang="scss">
html {
  height: 100%;
}

body {
  min-height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
</style>
