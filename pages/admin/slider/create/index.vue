<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-image"></i> TAMBAH SLIDER
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
              data-card-widget=""
              title=""
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storeSlider">
            <div class="form-group">
              <label>IMAGE</label>
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
              />
              <div v-if="validation.image" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.image[0]
                }}</b-alert>
              </div>
            </div>

            <button type="submit" class="btn btn-info mr-1 btn-submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button type="reset" class="btn btn-warning btn-submit">
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
        "Tambah Slider - PejuangPemrogaman.com - Belajar Koding Lengkap Bahasa Indonesia",
    };
  },
  data() {
    return {
      slider: {
        image: "",
      },
      validation: [],
    };
  },
  methods: {
    handleFileChange(e) {
      let image = (this.slider.image = e.target.files[0]);

      if (!image.type.match("image.*")) {
        e.target.value = "";

        this.slider.image = null;

        this.$swal.fire({
          title: "OOPS!",
          text: "Format Tidak Didukung!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    async storeSlider() {
      let formData = new FormData();

      formData.append("image", this.slider.image);

      await this.$axios
        .post("/api/admin/sliders", formData)
        .then(() => {
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({
            name: "admin-slider",
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
