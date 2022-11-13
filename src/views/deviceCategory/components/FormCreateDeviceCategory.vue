<template>
  <v-card class="mx-3">
    <v-card-text>
      <v-container>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="itemCategory.id"
                label="ID loại thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền id thiết bị']"
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="12" md="6">
              <v-text-field
                v-model="itemCategory.name"
                label="Tên loại thiết bị"
                :rules="[(v) => !!v || ' Vui lòng điền tên loại thiết bị']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Reset </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      <v-snackbar v-model="snackbar">
        Vui lòng điền đầy đủ trường bắt buộc

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import DeviceCategoryEventBus from "../js/DeviceCategoryEventBus.js";
export default {
  props: ["itemCategory"],
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    reload() {
      this.$router.back();
    },
    close() {
      this.itemCategory.id = "";
      this.itemCategory.name = "";
    },
    save() {
      this.$refs.form.validate();
      if (this.itemCategory.id == "" || this.itemCategory.name == "") {
        this.snackbar = true;
      } else {
        axios
          .post("http://localhost:3000/deviceCategories", this.itemCategory)
          .then((res) => {
            if (res.data.id != 0) {
              DeviceCategoryEventBus.$emit("createSuccess", res.data.id);
              this.$router.push("/device-category");
            }
          });
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
