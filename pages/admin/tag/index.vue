<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title"><i class="nav-icon fas fa-tags"></i> TAGS</h3>
          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-type="collapse"
              title="Collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              type="button"
              class="btn btn-tool"
              data-card-type="remove"
              title="Remove"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <nuxt-link
                  :to="{ name: 'admin-tag-create' }"
                  class="btn btn-info btn-sm"
                  style="padding-top: 8px"
                >
                  <i class="fa fa-plus-circle"></i> TAMBAH
                </nuxt-link>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="search"
                @keypress.enter="searchData"
                placeholder="cari berdasarkan nama tag"
              />
              <div class="input-group-append">
                <button @click="searchData" class="btn btn-info">
                  <i class="fa fa-search"></i> CARI
                </button>
              </div>
            </div>

            <!-- table -->
            <b-table
              striped
              bordered
              hover
              :items="tags"
              :fields="fields"
              show-empty
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  :to="{
                    name: 'admin-tag-edit-id',
                    params: { id: row.item.id },
                  }"
                  variant="warning"
                  size="sm"
                  >EDIT</b-button
                >

                <b-button
                  variant="danger"
                  size="sm"
                  @click="deleteTag(row.item.id)"
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
        "Tags - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Terlengkap",
    };
  },

  data() {
    return {
      fields: [
        {
          label: "Nama Tag",
          key: "name",
        },
        {
          label: "Actions",
          key: "actions",
          tdClass: "text-center",
        },
      ],

      search: "",
    };
  },

  watchQuery: ["q", "page"],

  async asyncData({ $axios, query }) {
    let page = query.page ? parseInt(query.page) : "";

    let search = query.q ? query.q : "";

    const tags = await $axios.$get(`/api/admin/tags?q=${search}&page=${page}`);
    return {
      tags: tags.data.data,
      pagination: tags.data,
    };
  },

  methods: {
    // change page pagination
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
        },
      });
    },
    // search data
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
        },
      });
    },

    // deleteTag
    deleteTag(id) {
      this.$swal
        .fire({
          title: "APAKAH ANDA YAKIN ?",
          text: "INGIN MENGHAPUS DATA INI !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "YA, HAPUS",
          cancelButtonText: "TIDAK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios.delete(`/api/admin/tags/${id}`).then(() => {
              this.$nuxt.refresh();

              this.$swal.fire({
                title: "BERHASIL!",
                text: "Data Berhasil Dihapus",
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
