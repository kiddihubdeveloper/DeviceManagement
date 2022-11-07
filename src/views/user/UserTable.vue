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
          <template #activator="{ on, attrs }">
            <v-icon
                class="mr-3"
                v-bind="attrs"
                v-on="on"
            >
              mdi-cash-multiple
            </v-icon>
          </template>
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
    </v-data-table>
  </v-card>
</template>

<script>

import Users from '@/repositories/entities/UserRepository'

export default {
  name: 'UserTable',
  data() {
    return {
      search: '',
      headers: [
        {text: 'Mã người dùng', value: 'id'},
        {text: 'Tên người dùng', value: 'username'},
        {text: 'Email', value: 'email'},
        {text: 'Ảnh đại diện', value: 'avatar', sortable: false},
        {text: "Hành động", value: "actions", sortable: false},
      ],
      users: []
    }
  },

  beforeMount() {
    Users.getAll()
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.error(error)
        })
  },

  methods: {

    //delete user
    deleteItem(item) {

      if (confirm('Are you sure you want to delete this user?')){
        Users.deleteItem(item.id)
            .then(response => {
              this.users = this.users.filter(user => user.id !== item.id)
            })
            .catch(error => {
              console.error(error)
            })
      }
    },

  }
};
</script>

<style lang="scss" scoped></style>