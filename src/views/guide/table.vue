<template>
  <div>
    <div class="table-wrap head-scroll body-scroll">
      <table class="table">
        <colgroup>
          <col style="width: 100px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
        </colgroup>
        <thead>
          <tr>
            <th>고정영역</th>
            <th>고정영역</th>
            <th>고정영역</th>
            <th>고정영역</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tbodyData" :key="index">
            <th>{{ item.th }}</th>
            <td>{{ item.td1 }}</td>
            <td>{{ item.td2 }}</td>
            <td>{{ item.td3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <highlightjs :code="code1" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'table-guide',
  mixins: [guideMixin],
  data() {
    return {
      tbodyData: [
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
        {
          th: '고정영역',
          td1: '데이터데이터데이터',
          td2: '데이터데이터데이터',
          td3: '데이터데이터데이터',
        },
      ],
      code1:
        '<div class="table-wrap body-scroll head-scroll">\n' +
        '      <table class="table">\n' +
        '        <colgroup>\n' +
        '          <col />\n' +
        '          <col />\n' +
        '          <col />\n' +
        '          <col />\n' +
        '        </colgroup>\n' +
        '        <thead>\n' +
        '          <tr>\n' +
        '            <th>고정영역</th>\n' +
        '            <th>고정영역</th>\n' +
        '            <th>고정영역</th>\n' +
        '            <th>고정영역</th>\n' +
        '          </tr>\n' +
        '        </thead>\n' +
        '        <tbody>\n' +
        '          <tr v-for="(item, index) in tbodyData" :key="index">\n' +
        '            <th>{{ item.th }}</th>\n' +
        '            <td>{{ item.td1 }}</td>\n' +
        '            <td>{{ item.td2 }}</td>\n' +
        '            <td>{{ item.td3 }}</td>\n' +
        '          </tr>\n' +
        '        </tbody>\n' +
        '      </table>\n' +
        '    </div>',
    };
  },
};
</script>

<style scoped lang="scss">
.table-wrap {
  height: 200px;
  border: 1px solid red !important;
}
.table {
  th,
  td {
  }
  th:first-child {
    color: #fff;
  }

  tbody {
    th {
      background-color: #1b2330;
    }
  }
  thead {
    th {
      //background-color: #7680ff;
      background-color: #00bc99;
    }
  }
}
</style>
