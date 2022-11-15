<template>
  <div>
    <v-card-title>
      <v-icon @click="reload"> mdi-arrow-left</v-icon>
      <span class="ml-3 text-h5">Thay đổi thiết bị</span>
    </v-card-title>
    <form-edit-device-category></form-edit-device-category>
  </div>
</template>

<script>
import FormEditDeviceCategory from "./components/FormEditDeviceCategory.vue";
export default {
  components: {
    FormEditDeviceCategory,
  },
  data() {
    return {};
  },
  methods: {
    reload() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
