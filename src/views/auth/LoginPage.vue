<template>
  <v-app id="inspire">
    <v-content>
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-flex md4 sm8 xs12>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      v-model="username"
                      label="Login"
                      name="login"
                      prepend-icon="person"
                      type="text"
                  ></v-text-field>
                  <v-text-field
                      id="password"
                      v-model="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="auth">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import Users from "@/repositories/entities/UserRepository";
import Storage from "@/utils/storage";

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      users: []
    }
  },
  methods: {
    auth() {
      this.users.find(user => {
        if (user.username === this.username && user.password === this.password) {
          Storage.store('user', user);
          this.$router.push({name: 'Home'});
        }
      })
      if (!Storage.get('user')) {
        alert('Wrong username or password');
      }
    }
  },

  created() {
    Users.getAll()
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  }
};
</script>

<style lang="scss" scoped></style>