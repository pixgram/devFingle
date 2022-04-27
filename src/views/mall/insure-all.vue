<template>
  <container>
    <fade-title>
      <h2>
        <span class="heading1" v-if="heading1">{{ heading1 }}</span>
        <span class="heading2" v-if="heading2">{{ heading2 }}</span>
      </h2>
    </fade-title>

    <ul v-if="listData && listData.length > 0">
      <li v-for="(item, index) in listData" :key="index">
        <insure-item
          :title="item.insPdCtt"
          :img="item.inscoLogoUrl ? item.inscoLogoUrl : ''"
          :category="item.inscoNm"
          :desc="item.insPdCtt"
          :guide="item.dlbCtt"
          :insPdSno="item.insPdSno"
          :type="item.insPdTypNm"
          @click="linkTo(item)"
        />
      </li>
    </ul>

    <infinite-loading
      @infinite="infiniteHandler($event, fetchData())"
      :identifier="infiniteId"
    >
      <div slot="spinner" />
      <div slot="no-results">
        <no-data v-if="!listData || listData.length === 0">
          <template #icon>
            <i class="icon-none" />
          </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
    <insure-modal name="insure-all-modal" :data="insureModal" @updateConfirmModalData="updateConfirmModal" />
    <mall-confirm name="insure-all-mall-confirm" :img="confirmImg" :title="confirmTitle" />
  </container>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading';
import insureModal from '@/views/mall/modal/insure-modal';
import mallConfirm from '@/views/mall/modal/mall-confirm';
import { infiniteMixin } from '@/mixin/infiniteList';
import { getInsureItemDetail, getInsureTypeLists } from '@/api/modules/mall';
import bridge from '@/utils/WebViewBridgeDefault';

export default {
  name: 'insure-all',
  mixins: [infiniteMixin],
  components: {
    infiniteLoading,
    insureModal,
    mallConfirm,
  },
  data() {
    return {
      insureModal: {
        insPd: {
          exrLinkPth: ''
        }
      },
      confirmImg: '',
      confirmTitle: '',
      listData: [],
      heading1: '',
      heading2: '',
    };
  },
  async created() {
    const typeCode = this.$route.query.insPdCtgrSno;

    try {
      const { data } = await getInsureTypeLists({
        insPdCtgrSno: typeCode,
      });

      this.heading1 = data.insPdCtgr.insPdTtlNm;
      this.heading2 = data.insPdCtgr.insPdSubTtlNm;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    reset() {
      this.insureModal = {
        insPd: {
          exrLinkPth: ''
        }
      };
    },
    async fetchData() {
      if (!this.loadedData) {
        const typeCode = this.$route.query.insPdCtgrSno;
        try {
          const { data } = await getInsureTypeLists({
            insPdCtgrSno: typeCode,
          });
          this.loadedData = true;
          return await data.insPdCtgr.insPds;
        } catch (e) {
          console.log(e);
        }
      }
    },
    updateConfirmModal(data) {
      this.confirmImg = data.confirmImg;
      this.confirmTitle = data.confirmTitle;
    },
    async linkTo(item) {
      if (item.exrLinkYn) {
        this.confirmImg = item.files ? item.files[0].urlPth : '';
        this.confirmTitle = item.inscoNm;
        const t = await this.$_modalOpen({ name: 'insure-all-mall-confirm' });
        // - 브릿지이동 외부 링크
        if (t) {
          bridge.callNative.moveViewControl('outlink', '', item.exrLinkPth);
        }
      } else {
        const { data } = await getInsureItemDetail({ insPdSno: item.insPdSno });
        this.insureModal = data;
        await this.$_modalOpen({ name: 'insure-all-modal' });
        this.insureModal = data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  //font-weight: normal;
}

.heading1 {
  color: #000;
  font-weight: bold;
  display: block;
}

ul {
  margin-top: 10px;
}

li + li {
  margin-top: 15px;
}
</style>
