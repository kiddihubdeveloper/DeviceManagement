<template>
  <div class="user-detail-container mt-12">
    <v-container fluid>
      <v-row class="flex-nowrap">
        <v-img :src="user.avatar" class="avatar"/>
        <v-form class="w-100 form">
          <fieldset>
            <legend>Thông tin chung</legend>
            <v-row>
              <v-col cols="6">
                <v-row align="center">
                  <v-col class="text-left pl-5" cols="4">
                    <label for="userID"> Mã người dùng </label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                        id="userID"
                        v-model="user.id"
                        dense
                        hide-details
                        outlined
                        readonly
                    />
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-left pl-5" cols="4">
                    <label for="nDeviceBorrowed"> Số thiết bị đã mượn </label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                        id="nDeviceBorrowed"
                        :value="user.number_of_devices_borrowed"
                        dense
                        hide-details
                        outlined
                        readonly
                    />
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-left pl-5" cols="4">
                    <label for="nDeviceProvide"> Số thiết bị đã cung cấp </label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                        id="nDeviceProvide"
                        :value="user.number_of_devices_provided"
                        dense
                        hide-details
                        outlined
                        readonly
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row align="center">
                  <v-col class="text-left pl-10" cols="4">
                    <label for="username"> Họ tên </label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                        id="username"
                        v-model="user.username"
                        dense
                        hide-details
                        outlined
                        readonly
                    />
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-left pl-10" cols="4">
                    <label for="email"> Email </label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                        id="email"
                        v-model="user.email"
                        dense
                        hide-details
                        outlined
                        readonly
                    />
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-left pl-10" cols="4">
                    <label for="role"> Vị trí </label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                        id="role"
                        :value="userRole[user.role]"
                        dense
                        hide-details
                        outlined
                        readonly
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </fieldset>
        </v-form>
      </v-row>

    </v-container>
    <div class="user-device-table mt-10">
      <h3>Danh sách thiết bị</h3>
      <v-data-table
          v-model="selected"
          :headers="headers"
          :items="devices"
          :loading="loadTable"
          loading-text="Đang load dữ liệu...Vui lòng chờ một lát"
          show-select
      >
        <template #item.returned_date="{item}">
          {{ item.returned_date ? item.returned_date : '--/--/----' }}
        </template>
      </v-data-table>
      <v-row justify="end" class="mt-10 pr-10" >
        <v-btn x-large>Trả</v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>

import Users from "@/repositories/entities/UserRepository";
import Devices from "@/repositories/entities/DeviceRepository";
import DeviceCategories from "@/repositories/entities/DeviceCategoryRepository";

import {userRole} from "@/utils/state";

export default {
  name: 'UserDetailPage',
  data() {
    return {
      user: null,
      userRole,
      headers: [
        {text: 'Mã thiết bị', value: 'id'},
        {text: 'Tên thiết bị', value: 'deviceName'},
        {text: 'Loại thiết bị', value: 'type'},
        {text: 'Ngày mượn', value: 'createdAt'},
        {text: 'Ngày trả', value: 'returned_date'},
      ],
      devices: [],
      selected: [],
      loadTable: true,
    }
  },

  methods: {
    // Lấy user dựa trên ID
    getUser() {
      Users.get(this.$route.params.id)
          .then((response) => {
            this.user = response.data;
            this.getDevices();
          })
          .then(() => {
            this.loadTable = false;
          })
          .catch((error) => {
            console.log(error);
          });
    },


    // Lấy danh sách thiết bị user đang mượn
    getDevices() {
      let allDevices = []
      let allDeviceCategories = []
      let deviceIDs = this.user.device_borrowed_IDs
      Devices.getAll()
          .then((response) => {
            allDevices = response.data;
            this.devices = allDevices.filter((device) => {
              return deviceIDs.includes(device.id)
            });
          })
          .then(() => {
            DeviceCategories.getAll()
                .then((response) => {
                  allDeviceCategories = response.data;
                  this.devices = this.devices.map((device) => {
                    let deviceCategory = allDeviceCategories.find((category) => {
                      return category.id === device['categoryId']
                    });
                    device.type = deviceCategory.name;
                    return device;
                  })
                })
          })
    }
  },

  created() {
    this.getUser();
  },

};
</script>

<style lang="scss" scoped>
.avatar {
  width: 200px;
}

.form {
  background-color: #fff;
}

</style>