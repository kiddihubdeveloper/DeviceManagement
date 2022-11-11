<template>
  <div>
    <form-search-device
      :keySearch="keySearch"
      @on-SearchDevice="getDeviceByStatusOrCategory"
      :listCategory="listCategory"
    ></form-search-device>
    <table-device
      :items="items"
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
  created() {
    this.getDevices();
    this.getCategories();
    DeviceEventBus.$once("createSuccess", this.showMessageCreate);
    DeviceEventBus.$once("editSuccess", this.showMessageEdit);
  },
  methods: {
    // get list of devices
    async getDevices() {
      return axios
        .get("http://localhost:3000/devices")
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((error) => {
          throw error.response.data;
        });
    },

    getDeviceByStatusOrCategory() {
      axios
        .get("http://localhost:3000/devices")
        .then((response) => {
          if (this.keySearch.status == 0 && this.keySearch.categoryId == 0) {
            this.items = response.data;
          } else if (this.keySearch.status == 0) {
            this.items = response.data.filter(
              (a) => a.categoryId == this.keySearch.categoryId
            );
          } else if (this.keySearch.categoryId == 0) {
            this.items = response.data.filter(
              (a) => a.status == this.keySearch.status
            );
          } else {
            this.items = response.data.filter(
              (a) =>
                a.categoryId == this.keySearch.categoryId &&
                a.status == this.keySearch.status
            );
          }
          console.log(this.items);
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
