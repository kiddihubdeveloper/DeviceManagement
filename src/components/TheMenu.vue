<template>
  <v-card color="grey ">
    <v-toolbar dense>
      <v-toolbar-title>Device Management System</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed temporary width="330px">
      <router-link :to="{ name:'user-detail', params: {id: user.id} }">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in productList"
          :key="item.productName"
          link
          :to="{ path: item.path, query: item.query }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.productName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

import Storage from "@/utils/storage";

export default {
  data: () => ({
    user: Storage.get('user'),
    drawer: null,
    productList: [
      {productName: "Trang chủ", icon: "mdi-forum", path: "/"},
      {
        productName: "Thêm thiết bị",
        icon: "mdi-view-dashboard",
        path: "/create-device",
      },
      {productName: "Người dùng", icon: "mdi-account", path: "/user"},
      {
        productName: " Loại thiết bị",
        icon: "mdi-package",
        path: "/device-category",
      },
      {
        productName: "Laptop",
        icon: "mdi-laptop",
        path: "/search",
        query: {deviceName: "laptop"},
      },
      {
        productName: "Keyboard",
        icon: "mdi-keyboard",
        path: "/search",
        query: {deviceName: "keyboard"},
      },
      {
        productName: "Mouse",
        icon: "mdi-mouse",
        path: "/search",
        query: {deviceName: "mouse"},
      },
      {
        productName: "Screen",
        icon: "mdi-wiper",
        path: "/search",
        query: {deviceName: "screen"},
      },
      {},
      {
        productName: "Logout",
        icon: "mdi-logout",
        path: "/logout",
      }
    ],
  }),
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
  created() {
    this.user = Storage.get('user');
  },

};
</script>

<style></style>
