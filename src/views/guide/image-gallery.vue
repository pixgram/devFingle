<template>
  <div>
    <button
      type="button"
      class="btn-sub-sm"
      @click="$_modalOpen({ name: 'imageGallery' })"
    >
      image pinch zoom
    </button>
    <highlightjs :code="code1" />
    <highlightjs :code="code2" />
    <imageGallery :imageList="imageList" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'image-gallery',
  mixins: [guideMixin],
  components: {
    imageGallery: () => import('@/views/modal/image-gallery.vue'),
  },
  data() {
    return {
      imageList: [
        {
          fileNm: 'temp001.png',
          filePth:
            '/upload/temp/20211119/202111193ebdb6a1-1939-4df2-a49b-6c9dac08b9da.png',
        },
        {
          fileNm: 'test2',
          filePth:
            'https://i.pinimg.com/236x/f6/16/d0/f616d044c7937dde2e8ec2b4f3e6f79c--france-travel-winding-road.jpg',
        },
        {
          fileNm: 'test1',
          filePth:
            'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        },
      ],
      code1:
        'imageList: [\n' +
        '  {\n' +
        "    fileNm: 'temp001.png',\n" +
        '    filePth:\n' +
        "      '/upload/temp/20211119/202111193ebdb6a1-1939-4df2-a49b-6c9dac08b9da.png',\n" +
        '  },\n' +
        '  {\n' +
        "    fileNm: 'test2',\n" +
        '    filePth:\n' +
        "      'https://i.pinimg.com/236x/f6/16/d0/f616d044c7937dde2e8ec2b4f3e6f79c--france-travel-winding-road.jpg',\n" +
        '  },\n' +
        '  {\n' +
        "    fileNm: 'test1',\n" +
        '    filePth:\n' +
        "      'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',\n" +
        '  },\n' +
        '],',
      code2: '<imageGallery :imageList="imageList" />',
    };
  },
};
</script>
<style scoped lang="scss"></style>
