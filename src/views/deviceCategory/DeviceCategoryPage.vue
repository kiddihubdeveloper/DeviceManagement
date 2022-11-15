<template>
  <div>
    <v-card-title>
      <v-icon @click="reload"> mdi-arrow-left</v-icon>
      <span class="ml-3 text-h5">Trang loại thiết bị</span>
    </v-card-title>

    <table-device-category
      :itemCategories="itemCategories"
      :headers="headers"
    ></table-device-category>
  </div>
</template>

<script>
import axios from "axios";
import TableDeviceCategory from "./components/TableDeviceCategory.vue";
import DeviceCategoryEventBus from "./js/DeviceCategoryEventBus.js";
import Swal from "sweetalert2";
export default {
  components: {
    TableDeviceCategory,
  },
  data() {
    return {
      headers: [
        { text: "ID", align: "start", value: "id", width: "10%" },
        {
          text: "Mã thiết bị",
          align: "start",
          value: "deviceCode",
          width: "20%",
        },
        { text: "Tên thiết bị ", value: "name", width: "30%" },
        { text: "Số lượng thiết bị", value: "amountDevice", width: "20%" },
        { text: "Actions", value: "actions", sortable: false, width: "20%" },
      ],
      itemCategories: [],
    };
  },
  created() {
    this.getDeviceCategories();
    DeviceCategoryEventBus.$once("createSuccess", this.showMessageCreate);
    DeviceCategoryEventBus.$once("editSuccess", this.showMessageEdit);
  },
  methods: {
    reload() {
      this.$router.back();
    },
    // get list of devices
    async getDeviceCategories() {
      return axios
        .get("http://localhost:3000/deviceCategories")
        .then((response) => {
          this.itemCategories = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },

    // notifications messages after create device
    showMessageCreate() {
      Swal.fire({
        icon: "success",
        title: "Đã thêm loại thiết bị",
        text: "Loại thiết bị được thêm thành công.",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    },
    // notifications messages after edit device
    showMessageEdit() {
      Swal.fire({
        icon: "success",
        title: "Đã sửa thông tin loại thiết bị",
        text: "Thiết bị được sửa cập nhật theo loại thiết bị.",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    },
  },
};
</script>

<style></style>
