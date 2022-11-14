<template>
  <div>
    <v-card-title>
      <v-icon @click="reload"> mdi-arrow-left</v-icon>
      <span class="ml-3 text-h5">Thêm loại thiết bị</span>
    </v-card-title>
    <form-create-device-category
      :itemCategory="itemCategory"
    ></form-create-device-category>
  </div>
</template>

<script>
import FormCreateDeviceCategory from "./components/FormCreateDeviceCategory.vue";
export default {
  components: {
    FormCreateDeviceCategory,
  },
  data() {
    return {
      itemCategory: {
        id: "",
        name: "",
        amountDevice: 0,
      },
    };
  },
  methods: {
    reload() {
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
