<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="editedItem.productCode"
              label="Mã thiết bị"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="editedItem.productName"
              label="Tên thiết bị"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-file-input
              v-model="editedItem.productPicture"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              @change="selectImage"
              @click:clear="clearImagePreview()"
              label="Ảnh thiết bị"
              placeholder="Pick an image"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-img
              class="mx-auto"
              :src="
                editedItem.productPicture ? editedItem.productPicture : null
              "
              height="auto"
              width="50%"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="datepick"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Ngày nhập"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="datepick = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.providerCode"
              label="Mã nhà cung cấp"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.provider"
              label="Tên nhà cung cấp"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      editedIndex: -1,
      editedItem: {
        id: this.$route.params.id,
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
    this.initialize();
    if (this.$route.query.path) this.search == this.$route.query.productName;
    console.log(this.$route.query.productName);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm thiết bị" : "Chỉnh sửa thông tin";
    },
  },
  methods: {
    initialize() {
      this.items = [
        {
          productName: "Máy tính",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "Samsung",
          productCode: "Mr41748",
        },
        {
          productName: "Điện thoại",
          productPicture:
            "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          provider: "Toshiba",
          productCode: "Kr1441",
        },
        {
          productName: "Tủ lạnh",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "Panasonic",
          productCode: "Ur214",
        },
        {
          productName: "Bình nóng lạnh",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "Tokuda",
          productCode: "kg352",
        },
        {
          productName: "QUạt điện",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "Việt Nam",
          productCode: "af2214",
        },
        {
          productName: "fakffka",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "fajkfajf",
          productCode: "kakff42424",
        },
        {
          productName: "fafkffa",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "fakfak",
          productCode: "iwa214",
        },
        {
          productName: "fajfkja",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "hjisgjg",
          productCode: "ì3455",
        },
        {
          productName: "gkgkks",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "gjrirw fjk ",
          productCode: "owjf32",
        },
        {
          productName: "j jgsjg ",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "gjg gkgk",
          productCode: "jjshf3525",
        },
        {
          productName: "à lk gka ",
          productPicture: "https://picsum.photos/id/11/500/300",
          provider: "gjg gkgk",
          productCode: "jjshf3525",
        },
      ];
    },

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
      this.editedIndex.productPicture = null;
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

<style>
</style>
