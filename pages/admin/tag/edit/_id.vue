<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <div class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-tags"></i> EDIT TAG
          </h3>
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
          <form @submit.prevent="updateTag">
            <div class="form-group">
              <label>NAMA TAG</label>
              <input
                type="text"
                v-model="tag"
                placeholder="Masukkan Nama Tag"
                class="form-control"
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>

            <button type="submit" class="btn btn-info mr-1 btn-submit">
              <i class="fa fa-paper-plane"></i> UPDATE
            </button>
            <button type="reset" class="btn btn-warning btn-reset">
              <i class="fa fa-redo"></i> RESET
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  // title head
  head() {
    return {
      title: "Edit Tag - HizzDev.com - Belajar Koding Lengkap Bahasa Indonesia",
    };
  },

  data() {
    return {
      tag: "",
      validation: [],
    };
  },

  mounted() {
    // fetching data
    this.$axios
      .get(`/api/admin/tags/${this.$route.params.id}`)

      .then((response) => {
        // assing response data to "stage"
        this.tag = response.data.data.name;
      });
  },

  methods: {
    async updateTag() {
      await this.$axios
        .put(`/api/admin/tags/${this.$route.params.id}`, {
          name: this.tag,
        })

        .then(() => {
          // sweet alert
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data berhasil diupdate!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({
            name: "admin-tag",
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
