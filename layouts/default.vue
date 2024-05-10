<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- content -->
    <Nuxt />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/web/navbar.vue";
import Footer from "@/components/web/footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
body {
  background-color: #ccdcec !important;
}

.jumbotron {
  background: #186399 !important;
  color: white;
}

.bg-navbar {
  background: #12466b;
}

.btn-primary {
  background-color: #1c669b;
  border-color: #1c669b;
}

.btn-primary:hover {
  background-color: #1c669b;
  border-color: #1c669b;
}

.btn-primary-dark {
  background-color: #0f456b;
  border-color: #0f456b;
  color: white;
}

.btn-primary-dark:hover {
  color: white;
}

.carousel-item .img-fluid {
  border-radius: 0.5rem;
}

.card-category {
  background-color: #dadada;
}

.object-fit-cover {
  object-fit: cover;
}

.footer-top {
  background-color: #186399;
  color: white;
}

.footer-bottom {
  background-color: #12466b;
}
</style>
