<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-users"></i> EDIT USER</h3>
          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="remove"
              title="Remove"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label>NAMA USER</label>
              <input
                type="text"
                v-model="user.name"
                placeholder="Masukkan Nama User"
                class="form-control"
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>ALAMAT EMAIL</label>
              <input
                type="text"
                v-model="user.email"
                placeholder="Masukkan Alamat Email"
                class="form-control"
              />
              <div v-if="validation.email" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.email[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>PASSWORD</label>
              <input
                type="text"
                v-model="user.password"
                placeholder="Masukkan Password"
                class="form-control"
              />
              <div v-if="validation.password" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.password[0]
                }}</b-alert>
              </div>
            </div>

            <button type="submit" class="btn btn-info mr-1 btn-submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button type="submit" class="btn btn-warning mr-1 btn-reset">
              <i class="fa fa-redo"></i> RESET
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  head() {
    return {
      title:
        "Edit User - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Lengkap",
    };
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      validation: [],
    };
  },
  mounted() {
    this.$axios
      .get(`/api/admin/users/${this.$route.params.id}`)
      .then((response) => {
        this.user.name = response.data.data.name;
        this.user.email = response.data.data.email;
      });
  },
  methods: {
    async updateUser() {
      await this.$axios
        .put(`/api/admin/users/${this.$route.params.id}`, {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        })
        .then(() => {
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Diupdate!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({
            name: "admin-user",
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
