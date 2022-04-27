export default {
  data() {
    return { galleryIdx: 0 };
  },
  components: {
    imageGallery: () => import('@/views/modal/image-gallery.vue'),
  },
  methods: {
    imageGalleryOpen(id) {
      this.galleryIdx = id;
      this.$_modalOpen({ name: 'imageGallery' });
    },
  },
};
