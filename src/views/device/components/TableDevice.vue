<template>
  <v-card width="150vh" class="mx-auto mt-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Quản lý thiết bị</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2" :to="'/create-device'">
            New Item
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <!-- <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Bạn có chắc muốn xóa thiết bị ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </v-toolbar>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        {{ item.id }}
      </template>
      <template v-slot:[`item.deviceName`]="{ item }">
        {{ item.deviceName }}
      </template>
      <template v-slot:[`item.deviceImage`]="{ item }">
        <img
          :src="item.deviceImage"
          alt=""
          width="50"
          height="50"
          class="mt-2"
        />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> -->
        <v-btn class="mr-2" icon :to="'/edit-device/' + item.id">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["items", "headers"],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      editedIndex: -1,
      editedItem: {
        productCode: "",
        productName: "",
        productPicture: "",
        productDay: "",
        providerCode: "",
        provider: "",
      },
      defaultItem: {
        productCode: "",
        productName: "",
        productPicture: null,
        productDay: "",
        providerCode: "",
        provider: "",
      },
    };
  },
  created() {
    // this.initialize();
  },
  computed: {},
  methods: {
    // initialize() {
    //   this.items = [
    //     {
    //       id: 1,
    //       productName: "Máy tính",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "Samsung",
    //       productCode: "Mr41748",
    //     },
    //     {
    //       id: 2,
    //       productName: "Điện thoại",
    //       productPicture:
    //         "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
    //       provider: "Toshiba",
    //       productCode: "Kr1441",
    //     },
    //     {
    //       id: 3,
    //       productName: "Tủ lạnh",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "Panasonic",
    //       productCode: "Ur214",
    //     },
    //     {
    //       id: 4,
    //       productName: "Bình nóng lạnh",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "Tokuda",
    //       productCode: "kg352",
    //     },
    //     {
    //       productName: "QUạt điện",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "Việt Nam",
    //       productCode: "af2214",
    //     },
    //     {
    //       productName: "fakffka",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "fajkfajf",
    //       productCode: "kakff42424",
    //     },
    //     {
    //       productName: "fafkffa",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "fakfak",
    //       productCode: "iwa214",
    //     },
    //     {
    //       productName: "fajfkja",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "hjisgjg",
    //       productCode: "ì3455",
    //     },
    //     {
    //       productName: "gkgkks",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "gjrirw fjk ",
    //       productCode: "owjf32",
    //     },
    //     {
    //       productName: "j jgsjg ",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "gjg gkgk",
    //       productCode: "jjshf3525",
    //     },
    //     {
    //       productName: "à lk gka ",
    //       productPicture: "https://picsum.photos/id/11/500/300",
    //       provider: "gjg gkgk",
    //       productCode: "jjshf3525",
    //     },
    //   ];
    // },

    // upload image to form
    async selectImage(e) {
      const file = e;
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      this.editedItem.productPicture = data;
    },
    async clearImagePreview() {
      this.editedIndex.productPicture = "";
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
      console.log(this.items);
    },

    // edit product
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //delete product
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // form comfirm delete product
    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
