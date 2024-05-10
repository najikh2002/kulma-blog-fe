<template>
  <b-container class="mt-5 mb-5">
    <b-row>
      <b-col md="8" sm="12">
        <b-card class="border-0 rounded-lg shadow-md mb-3">
          <b-img
            :src="post.image"
            :alt="post.title"
            class="rounded-lg w-100"
          ></b-img>
          <hr />
          <h4>{{ post.title }}</h4>
          <b-card-text>
            <small class="text-muted mr-3"
              ><i class="fa fa-calendar"></i> {{ post.created_at }}
            </small>
            <small class="text-muted mr-3"
              ><i class="fa fa-user"></i> {{ post.user.name }}</small
            >
            <small class="text-muted mr-3"
              ><i class="fa fa-folder"></i> {{ post.category.name }}</small
            >
            <small class="text-muted"
              ><i class="fa fa-comments"></i>
              {{ post.comments.length }} Komentar</small
            >
          </b-card-text>
          <div
            v-html="post.content"
            class="post-content"
            v-add-alt-to-images
            v-highlight
          ></div>
          <hr />
          <nuxt-link
            :to="{ name: 'tag-slug', params: { slug: tag.slug } }"
            class="btn btn-primary btn-sm mb-2 mr-2 shadow-sm"
            v-for="tag in post.tags"
            :key="tag.id"
            >{{ tag.name }}</nuxt-link
          >
        </b-card>

        <b-card no-body>
          <b-card-body>
            <h5>{{ post.comments.length }} KOMENTAR</h5>
            <hr />
            <b-list-group>
              <b-list-group-item
                v-for="comment in post.comments"
                :key="comment.id"
              >
                <div class="text-right">
                  <small class="text-right text-muted">{{
                    comment.created_at
                  }}</small>
                </div>
                <b-avatar
                  button
                  variant="primary"
                  text=""
                  class="align-baseline"
                ></b-avatar>
                <span class="font-weight-bold">{{ comment.name }}</span>
                <hr />
                {{ comment.comment }}
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>

        <b-card no-body>
          <b-card-body>
            <h5>KIRIM KOMENTAR</h5>
            <hr />
            <b-form @submit.prevent="storeComment">
              <b-row>
                <b-col md="6" sm="6">
                  <div class="form-group">
                    <label class="font-weight-bold text-uppercase"
                      >Nama Lengkap</label
                    >
                    <input
                      type="text"
                      v-model="comment.name"
                      class="form-control"
                      placeholder="Masukkan Nama Lengkap"
                    />
                    <div v-if="validation.name" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.name[0]
                      }}</b-alert>
                    </div>
                  </div>
                </b-col>

                <b-col md="6" sm="6">
                  <div class="form-group">
                    <label class="font-weight-bold text-uppercase"
                      >Alamat Email</label
                    >
                    <input
                      type="text"
                      v-model="comment.email"
                      class="form-control"
                      placeholder="Masukkan Alamat Email"
                    />
                    <div v-if="validation.email" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.email[0]
                      }}</b-alert>
                    </div>
                  </div>
                </b-col>

                <b-col md="12">
                  <div class="form-group">
                    <label class="font-weight-bold text-uppercase"
                      >Komentar</label
                    >
                    <input
                      type="text"
                      v-model="comment.comment"
                      class="form-control"
                      placeholder="Masukkan Komentar"
                    />
                    <div v-if="validation.comment" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.comment[0]
                      }}</b-alert>
                    </div>
                  </div>
                </b-col>

                <b-col md="12">
                  <b-button variant="primary" type="submit">KIRIM</b-button>
                  <b-button variant="warning" type="reset">RESET</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col md="4" sm="12">
        <b-card no-body class="border-0 rounded-lg shadow-md">
          <b-card-body>
            <h5>KATEGORI</h5>
            <hr />
            <b-card
              no-body
              class="border-0 shadow-md card-category mb-2 rounded-lg"
              v-for="category in categories"
              :key="category.id"
            >
              <b-card-body class="p-2 fw-normal">
                <b-img
                  :src="category.image"
                  :alt="category.name"
                  width="40"
                ></b-img>
                <nuxt-link
                  :to="{
                    name: 'category-slug',
                    params: { slug: category.slug },
                  }"
                  class="text-dark"
                  >{{ category.name }}</nuxt-link
                >
              </b-card-body>
            </b-card>
          </b-card-body>
        </b-card>

        <b-card no-body class="border-0 rounded-lg shadow-md">
          <b-card-body>
            <h5>TAGS</h5>
            <hr />
            <nuxt-link
              :to="{ name: 'tag-slug', params: { slug: tag.slug } }"
              class="btn btn-primary btn-sm mb-2 mr-2 shadow-sm"
              v-for="tag in tags"
              :key="tag.id"
              >{{ tag.name }}</nuxt-link
            >
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.post.title,
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: this.post.title,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.post.image,
        },
        {
          hid: "description",
          name: "description",
          content: this.post.description,
        },
      ],
    };
  },
  async asyncData({ params, $axios }) {
    const post = await $axios.$get(`/api/web/posts/${params.slug}`);
    const categories = await $axios.$get("/api/web/category-sidebar");
    const tags = await $axios.$get("/api/web/tags");

    return {
      post: post.data,
      categories: categories.data,
      tags: tags.data,
    };
  },

  data() {
    return {
      comment: {
        name: "",
        email: "",
        comment: "",
      },

      validation: [],
    };
  },

  directives: {
    "add-alt-to-images": {
      inserted: function (el) {
        const images = el.querySelectorAll("img");
        images.forEach((img) => {
          img.setAttribute("alt", "Image Content");
        });
      },
    },
  },

  methods: {
    async storeComment() {
      await this.$axios
        .post("/api/web/posts/store-comment", {
          name: this.comment.name,
          email: this.comment.email,
          comment: this.comment.comment,
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$nuxt.refresh();

          this.comment.name = "";
          this.comment.email = "";
          this.comment.comment = "";

          this.$swal.fire({
            title: "BERHASIL!",
            text: "Komentar Anda Berhasil Terkirim!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.$router.push({ path: this.$route.path });
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style>
.post-content img {
  max-width: 100%; /* Maksimum lebar gambar */
  height: auto; /* Tinggi otomatis agar gambar tetap proporsional */
}
</style>
