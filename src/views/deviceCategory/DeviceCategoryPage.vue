<template>
  <div>
    <v-card-title>
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
    //   DeviceEventBus.$once("editSuccess", this.showMessageEdit);
  },
  methods: {
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
        title: "Đã thêm loại thiết bị",
        text: "Loại thiết bị được thêm thành công.",
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
