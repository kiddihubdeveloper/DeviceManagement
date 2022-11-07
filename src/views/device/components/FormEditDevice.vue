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
              width="10%"
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
      id: this.$route.params.id,
      dialogDelete: false,
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
      menu: false,
      modal: false,
      datepick: false,
    };
  },
  created() {
    this.initialize();
    // if (this.$route.query.path) this.search == this.$route.query.productName;
    // console.log(this.$route.query.productName);
    if (this.$route.params.id) {
      this.editedIndex = this.$route.params.id;
      this.editedItem = Object.assign({}, this.$route.params);
      console.log(this.$route.params);
      console.log(this.editedIndex);
      console.log(this.editedItem);
    }
  },
  methods: {
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
  },
};
</script>

<style></style>
