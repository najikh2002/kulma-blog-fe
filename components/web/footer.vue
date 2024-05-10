<template>
  <footer class="footer-top pt-4">
    <b-container>
      <b-row>
        <b-col md="4">
          <h5>TENTANG</h5>
          <hr />
          <p>
            Belajar Matematika bahasa indonesia terlengkap dan mudah dipahami.
          </p>
        </b-col>
        <b-col md="4">
          <h5>TAGS</h5>
          <hr />
          <div>
            <nuxt-link
              :to="{ name: 'tag-slug', params: { slug: tag.slug } }"
              class="btn btn-primary-dark btn-sm mb-2 mr-2 shadow-sm"
              v-for="tag in tags"
              :key="tag.id"
              >{{ tag.name }}</nuxt-link
            >
          </div>
        </b-col>
        <b-col md="4">
          <h5>KONTAK</h5>
          <hr />
          <p>
            <i aria-hidden="true" class="fa fa-map-marker"></i> Jl. Laksda
            Adisucipto, Papringan, Caturtunggal, Kec. Depok, Kabupaten Sleman,
            Daerah Istimewa Yogyakarta 55281 <br /><br /><i
              class="fas fa-phone"
            ></i>
            +62812-1692-1233
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="footer-bottom">
      <b-row class="p-3 justify-content-center">
        <div class="text-white font-weight-bold">© 2024 Kuliah Matematika</div>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
    };
  },
  async fetch() {
    await this.$axios.get("/api/web/tags").then((response) => {
      this.tags = response.data.data;
    });
  },
};
</script>

<style></style>
