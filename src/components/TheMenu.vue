<template>
  <v-card color="grey lighten-4">
    <v-toolbar dense>
      <v-toolbar-title>Device Management System</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in productList"
          :key="item.productName"
          link
          :to="item.path"
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
export default {
  data: () => ({
    drawer: null,
    productList: [
      { productName: "Trang chu", icon: "mdi-forum", path: "/" },
      {
        productName: "Them thiet bi",
        icon: "mdi-view-dashboard",
        path: "/create-device",
      },
      { productName: "Nguoi dung", icon: "mdi-forum", path: "/user" },
      { productName: "Máy giặt", icon: "mdi-forum", path: "" },
      { productName: "Tủ lạnh", icon: "mdi-forum", path: "" },
      { productName: "Máy tính", icon: "mdi-forum", path: "" },
    ],
  }),
};
</script>

<style></style>
