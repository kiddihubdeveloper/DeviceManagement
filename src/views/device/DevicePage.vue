<template>
  <div>
    <v-card-title>
      <v-icon @click="reload"> mdi-arrow-left</v-icon>
      <span class="ml-3 text-h5">Trang chủ</span>
    </v-card-title>
    <form-search-device
      :keySearch="keySearch"
      @on-SearchDevice="getDeviceByStatusOrCategory"
      :listCategory="listCategory"
    ></form-search-device>
    <table-device
      :items="devices"
      :headers="headers"
      :listCategory="listCategory"
    ></table-device>
  </div>
</template>

<script>
import axios from "axios";
import TableDevice from "./components/TableDevice.vue";
import FormSearchDevice from "./components/FormSearchDevice.vue";
import DeviceEventBus from "./js/DeviceEventBus.js";
import Swal from "sweetalert2";
export default {
  components: {
    TableDevice,
    FormSearchDevice,
  },
  data() {
    return {
      headers: [
        { text: "ID", align: "start", value: "id" },
        { text: "Tên thiết bị ", value: "deviceName" },
        { text: "Ảnh thiết bị", value: "deviceImage", sortable: false },
        { text: "Nhà cung cấp", value: "providerID" },
        { text: "Loại thiết bị", value: "categoryId" },
        { text: "Trạng thái", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      keySearch: {
        status: 0,
        categoryId: 0,
      },
      listCategory: [],
    };
  },
  watch: {
    "$route.query.categoryId": {
      handler(categoryId) {
        if (!categoryId) {
          this.keySearch.categoryId = 0;
        } else {
          this.keySearch.categoryId = categoryId;
        }
        this.getDeviceByStatusOrCategory();
      },
      immediate: true,
    },
  },
  computed: {
    devices() {
      return this.items;
    },
  },
  created() {
    this.getCategories();
    DeviceEventBus.$once("createSuccess", this.showMessageCreate);
    DeviceEventBus.$once("editSuccess", this.showMessageEdit);
  },
  methods: {
    reload() {
      this.$router.back();
    },
    // get list of devices
    getDeviceByStatusOrCategory() {
      axios
        .get("http://localhost:3000/devices")
        .then((response) => {
          if (this.keySearch.status == 0 && this.keySearch.categoryId == 0) {
            this.items = response.data;
          } else if (this.keySearch.status == 0) {
            this.items = response.data.filter(
              (d) => d.categoryId == this.keySearch.categoryId
            );
          } else if (this.keySearch.categoryId == 0) {
            this.items = response.data.filter(
              (d) => d.status == this.keySearch.status
            );
          } else {
            this.items = response.data.filter(
              (d) =>
                d.categoryId == this.keySearch.categoryId &&
                d.status == this.keySearch.status
            );
          }
        })
        .catch((error) => {
          throw error.response.data;
        });
    },

    // get list categories
    getCategories() {
      axios.get("http://localhost:3000/deviceCategories").then((res) => {
        this.listCategory = res.data;
      });
    },

    // notifications messages after create device
    showMessageCreate() {
      Swal.fire({
        icon: "success",
        title: "Đã thêm thiết bị",
        text: "Thiết bị được thêm thành công.",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    },
    // notifications messages after edit device
    showMessageEdit() {
      Swal.fire({
        icon: "success",
        title: "Đã sửa thông tin thiết bị",
        text: "Thiết bị được sửa thành công.",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    },
  },
};
</script>

<style></style>
