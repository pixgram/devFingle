<template>
  <modal :name="name" :type="type" @close="closeEvent">
    <template #header>
      <h2 class="modal-title">{{ title }}</h2>
    </template>
    <template #content>
      <agreeConts @update="titleUpdate" />
    </template>
    <template #footer>
      <div class="btm-btn-group">
        <div class="flex-btn-group">
          <button
            type="button"
            class="btn-primary-lg"
            @click="$_modalClose({ name: 'agreeModal' })"
          >
            확인
          </button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import agreeConts from '@/components/agree-contents';
export default {
  name: 'agreeModal',
  components: {
    agreeConts,
  },
  props: ['name', 'type', 'agreeModalSeq'],
  data() {
    return {
      title: '',
    };
  },
  methods: {
    titleUpdate(title) {
      this.title = title;
    },
    closeEvent() {
      this.$router.replace({ query: {} });
      this.title = '';
    },
  },
};
</script>

<style scoped lang="scss">
.bullet-list {
  margin-top: 20px;
}
</style>
