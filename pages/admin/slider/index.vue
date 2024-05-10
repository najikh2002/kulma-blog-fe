<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-image"></i> SLIDERS
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
          <div class="form-group">
            <nuxt-link
              :to="{ name: 'admin-slider-create' }"
              class="btn btn-info btn-sm p-2"
              ><i class="fa fa-plus-circle"></i> TAMBAH</nuxt-link
            >
          </div>

          <!-- table -->
          <b-table
            striped
            bordered
            hover
            :items="sliders"
            :fields="fields"
            show-empty
          >
            <template v-slot:cell(image)="data">
              <img
                class="img-fluid img-thumbnail"
                width="400"
                :src="data.item.image"
              />
            </template>
            <template v-slot:cell(actions)="row">
              <b-button
                variant="danger"
                size="sm"
                @click="deleteSlider(row.item.id)"
                >DELETE</b-button
              >
            </template>
          </b-table>

          <!-- pagination -->
          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            @change="changePage"
            align="right"
            class="mt-3"
          ></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  //layout
  layout: "admin",

  //meta
  head() {
    return {
      title:
        "Sliders - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Terlengkap",
    };
  },

  //data function
  data() {
    return {
      //table header
      fields: [
        {
          label: "Gambar",
          key: "image",
          tdClass: "text-center",
        },
        {
          label: "Actions",
          key: "actions",
          tdClass: "text-center",
        },
      ],
    };
  },

  watchQuery: ["page"],

  async asyncData({ $axios, query }) {
    let page = query.page ? parseInt(query.page) : "";

    //fetching sliders
    const sliders = await $axios.$get(`/api/admin/sliders?page=${page}`);

    return {
      sliders: sliders.data.data,
      pagination: sliders.data,
    };
  },

  methods: {
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          page: page,
        },
      });
    },

    deleteSlider(id) {
      this.$swal
        .fire({
          title: "APAKAH ANDA YAKIN ?",
          text: "INGIN MENGHAPUS DATA INI !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "YA, HAPUS!",
          cancelButtonText: "TIDAK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios.delete(`/api/admin/sliders/${id}`).then(() => {
              this.$nuxt.refresh();

              this.$swal.fire({
                title: "BERHASIL!",
                text: "Data Berhasil Dihapus!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            });
          }
        });
    },
  },
};
</script>

<style></style>
