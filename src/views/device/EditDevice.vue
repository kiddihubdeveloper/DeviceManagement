<template>
  <div>
    <v-card-title>
      <v-icon @click="reload"> mdi-arrow-left</v-icon>
      <span class="ml-3 text-h5">Thay đổi thiết bị</span>
    </v-card-title>
    <form-edit-device></form-edit-device>
  </div>
</template>

<script>
import FormEditDevice from "./components/FormEditDevice.vue";
export default {
  components: {
    FormEditDevice,
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
