<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          hide-details
          label="Search"
          single-line
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        loading-text="Đang load dữ liệu...Vui lòng chờ một lát"
    >
      <template #item.avatar="{ item }">
        <img
            :src="item.avatar"
            alt=""
            class="mt-2"
            height="50"
            width="50"
        />
      </template>
      <template #item.actions="{ item }">
        <v-tooltip bottom>
          <span>Mượn</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                @click="deleteItem(item)"
                v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Xoá</span>
        </v-tooltip>
      </template>
      <template #item.role="{ item }">
        {{ userRole[item.role] }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import Users from '@/repositories/entities/UserRepository'
import Swal from "sweetalert2";

export default {
  name: 'UserTable',
  data() {
    return {
      search: '',
      headers: [
        {text: 'Mã', value: 'id'},
        {text: 'Tên người dùng', value: 'username'},
        {text: 'Email', value: 'email', sortable: false},
        {text: 'Ảnh đại diện', value: 'avatar', sortable: false, align: 'center'},
        {text: 'Vị trí', value: 'role'},
        {text: 'Số thiết bị đã cung cấp', value: 'number_of_devices_provided', align: 'center'},
        {text: 'Số thiết bị đang mượn', value: 'number_of_devices_borrowed', align: 'center'},
        {text: "Hành động", value: "actions", sortable: false, align: 'center'},
      ],
      users: [],
      userRole: {
        0: 'User',
        1: 'Admin'
      },
    }
  },

  methods: {

    // get data user
    getData() {
      Users.getAll()
          .then(response => {
            this.users = response.data
          })
          .catch(error => {
            console.error(error)
          })
    },

    //delete user
    deleteItem(item) {

      Swal.fire({
        title: 'Chắc chưa?',
        text: "Không thể khôi phục dữ liệu đã xoá!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
              {
                icon: 'success',
                title: 'Đã xoá!',
                text: 'Người dùng đã được xoá.',
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true,
              }
          )
          Users.deleteItem(item.id)
              .then(() => {
                this.getData()
              })
              .catch(error => {
                console.error(error)
              })
        }
      })
    }
  },

  beforeMount() {
    this.getData()
  }

}


</script>

<style lang="scss" scoped>
</style>