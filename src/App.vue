<template>
  <router-view />
</template>

<script>

import Storage from "@/utils/storage.js";
import Users from "@/assets/data/users.json";
import Devices from "@/assets/data/devices.json";

export default {
  name: "App",

  beforeMount(){
    Storage.store('users', Users)
    Storage.store('devices', Devices)
  },

  beforeDestroy() {
    Storage.wipe();
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
