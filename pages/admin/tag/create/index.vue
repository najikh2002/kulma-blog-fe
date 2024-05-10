<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-tags"></i> TAMBAH TAG
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
          <form @submit.prevent="storeTag">
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
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button type="reset" class="btn btn-warning btn-reset">
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
  // layout
  layout: "admin",

  // meta head
  head() {
    return {
      title:
        "Tambah Tags - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Terlengkap",
    };
  },

  data() {
    return {
      tag: "",
      validation: [],
    };
  },

  methods: {
    // storeTag method
    async storeTag() {
      await this.$axios
        .post("/api/admin/tags", {
          name: this.tag,
        })

        .then(() => {
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data berhasil disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({
            name: "admin-tag",
          });
        })

        .catch((error) => {
          // assign error to validation
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style></style>
