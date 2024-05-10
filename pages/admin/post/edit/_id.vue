<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> EDIT POST
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
          <form @submit.prevent="updatePost">
            <div class="form-group">
              <label>GAMBAR POST</label>
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

            <div class="form-group">
              <label>JUDUL POST</label>
              <input
                type="text"
                v-model="post.title"
                placeholder="Masukkan Judul Post"
                class="form-control"
              />
              <div v-if="validation.title" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.title[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>CATEGORY</label>
              <multiselect
                v-model="post.category_id"
                :options="categories"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.category_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.category_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>KONTEN POST</label>
              <client-only aria-placeholder="loading...">
                <ckeditor-nuxt v-model="post.content" :config="editorConfig" />
              </client-only>
              <div v-if="validation.content" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.content[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>TAGS</label>
              <multiselect
                v-model="post.tags"
                :options="tags"
                label="name"
                track-by="id"
                :multiple="true"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>DESCRIPTION</label>
              <textarea
                v-model="post.description"
                class="form-control"
                rows="3"
                placeholder="Masukkan Deskripsi Singkat"
              ></textarea>
              <div v-if="validation.description" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.description[0]
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
        "Edit Post - PejuangPemrogaman.com - Belajar Koding Bahasa Indonesia Lengkap",
    };
  },

  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },

  data() {
    return {
      // state post
      post: {
        image: "",
        title: "",
        category_id: "",
        content: "",
        description: "",
        tags: [],
      },
      // state categories
      categories: [],

      // state tags
      tags: [],

      // state validation
      validation: [],

      // config CKEDITOR
      editorConfig: {
        removePlugin: ["Title"],
        simpleUpload: {
          uploadUrl:
            "https://pejuangpemrogaman.appdev.my.id/api/web/posts/store-image",
        },
      },
    };
  },

  mounted() {
    // fetching post data
    this.$axios
      .get(`/api/admin/posts/${this.$route.params.id}`)
      .then((response) => {
        // assing response data to state "post.title"
        this.post.title = response.data.data.title;

        // assing response data to state "post.category_id"
        this.post.category_id = response.data.data.category;

        // assing response data to state "post.content"
        this.post.content = response.data.data.content;

        // assing data to state "post.tags"
        this.post.tags = response.data.data.tags;

        // assing data to state "post.description"
        this.post.description = response.data.data.description;
      });

    // fetcing tags data
    this.$axios.get("/api/admin/tags").then((response) => {
      this.tags = response.data.data.data;
    });

    // detching categories data
    this.$axios.get("/api/admin/categories").then((response) => {
      this.categories = response.data.data.data;
    });
  },

  methods: {
    handleFileChange(e) {
      let image = (this.post.image = e.target.files[0]);

      if (!image.type.match("image.*")) {
        e.target.value = "";

        this.post.image = null;

        this.$swal.fire({
          title: "OOPS!",
          text: "Format File Tidak Didukung!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    async updatePost() {
      // get selected tags
      let tags = this.post.tags;
      let selectedTags = [];
      tags.forEach((tag) => {
        selectedTags.push(tag.id);
      });

      // form
      let formData = new FormData();

      formData.append("image", this.post.image);
      formData.append("title", this.post.title);
      formData.append(
        "category_id",
        this.post.category_id ? this.post.category_id.id : ""
      );
      formData.append("content", this.post.content);
      formData.append("description", this.post.description);
      formData.append("_method", "PATCH");

      // append tags array
      for (var i = 0; i < selectedTags.length; i++) {
        formData.append("tags[]", selectedTags[i]);
      }

      // sending data to serve
      this.$axios
        .post(`/api/admin/posts/${this.$route.params.id}`, formData)
        .then(() => {
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Diupdate!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({
            name: "admin-post",
          });
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
