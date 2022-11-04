<template>
  <div>
    <table-device-vue />
  </div>
</template>

<script>
import TableDeviceVue from "./device/components/TableDevice.vue";
export default {
  name: "HomePage",
  components: {
    TableDeviceVue,
  },
};
</script>

<style lang="scss" scoped>
</style>