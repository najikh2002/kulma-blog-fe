<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-folder"></i> EDIT CATEGORY
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
          <form @submit.prevent="udpateCategory">
            <div class="form-group">
              <label>GAMBAR</label>
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>NAMA CATEGORY</label>
              <input
                type="text"
                v-model="category.name"
                placeholder="Masukkan Nama Category"
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
        "Edit Category - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Lengkap",
    };
  },

  data() {
    return {
      // state category
      category: {
        image: "",
        name: "",
      },
      // state validation
      validation: [],
    };
  },

  mounted() {
    this.$axios
      .get(`/api/admin/categories/${this.$route.params.id}`)

      .then((response) => {
        this.category.name = response.data.data.name;
      });
  },

  methods: {
    handleFileChange(e) {
      let image = (this.category.image = e.target.files[0]);

      if (!image.type.match("image.*")) {
        e.target.value = "";

        this.category.image = null;

        this.$swal.fire({
          title: "OOPS!",
          text: "Format file tidak didukung!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    async udpateCategory() {
      let formData = new FormData();

      formData.append("image", this.category.image);
      formData.append("name", this.category.name);
      formData.append("_method", "PATCH");

      await this.$axios
        .post(`/api/admin/categories/${this.$route.params.id}`, formData)
        .then(() => {
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Diupdate!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({
            name: "admin-category",
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
