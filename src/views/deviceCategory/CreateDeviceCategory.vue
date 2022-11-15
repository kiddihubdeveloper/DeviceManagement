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
import axios from "axios";
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
        deviceCode: "",
      },
    };
  },
  created() {
    // default id device category
    axios.get("http://localhost:3000/deviceCategories").then((res) => {
      this.itemCategory.id =
        parseInt(res.data.sort((a, b) => a.id - b.id)[res.data.length - 1].id) +
        1;
    });
  },
  methods: {
    reload() {
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
