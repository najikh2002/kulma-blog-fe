<template>
  <div class="card card-outline card-info">
    <div class="card-header text-center">
      <nuxt-link to="/" class="h1 font-weight-bold text-dark">KULMA</nuxt-link>
      <div><i>Learning, Sharing & Growing</i></div>
    </div>
    <div class="card-body">
      <div v-if="validation.message" class="mt-2">
        <b-alert show variant="danger">{{ validation.message }}</b-alert>
      </div>
      <!-- @vue-ignore -->
      <form @submit.prevent="login">
        <div class="form-group">
          <label class="font-weight-bold text-uppercase">Email address</label>
          <input
            type="email"
            v-model="user.email"
            :class="{ 'is-invalid': validation.email }"
            class="form-control"
            placeholder="Masukkan Alamat Email"
          />
        </div>
        <div v-if="validation.email" class="mt-2">
          <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
        </div>

        <div class="form-group">
          <label class="font-weight-bold text-uppercase">Password</label>
          <input
            type="password"
            v-model="user.password"
            :class="{ 'is-invalid': validation.password }"
            class="form-control"
            placeholder="Masukkan Password"
          />
        </div>
        <div v-if="validation.password" class="mt-2">
          <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
        </div>

        <button type="submit" class="btn btn-info btn-block">LOGIN</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",

  head() {
    return {
      title:
        "Login - PejuangPemrogaman.com - Belajar Bahasa Pemrogaman Bahasa Indonesia Lengkap",
    };
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      validation: {
        email: "",
        password: "",
        message: "",
      },
    };
  },

  methods: {
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            email: this.user.email,
            password: this.user.password,
          },
        })

        .then(() => {
          this.$router.push({
            name: "admin-dashboard",
          });
        })

        .catch((error) => {
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style></style>
