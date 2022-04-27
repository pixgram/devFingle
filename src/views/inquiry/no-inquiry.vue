<template>
  <container headerType="modal">
    <h3 class="title-2 mt10">조회되지 않는 보험</h3>
    <strong class="item-title mt15">
      가입한 보험은 한국 신용정보원에서 제공하는 정보를 조회하여 제공하는
      건으로, 아래의 경우는 조회되지 않습니다.
    </strong>
    <ul class="bullet-list mt30">
      <li class="bullet-text">가입한지 7영업일이 지나지 않은 보험</li>
      <li class="bullet-text">가족보험의 피보험자로 등록된 보험</li>
      <li class="bullet-text">
        (생보사 정보) '00.4월 이후 계약정보, '06.6월 이후 지급정보
      </li>
      <li class="bullet-text">
        (손보사 정보) '02.12월 이후 계약정보, '06.6월 이후 지급 정보
      </li>
      <li class="bullet-text">
        (공제 정보) '09.10월 이후 계약 및 지급 정보 조회
      </li>
      <li class="bullet-text">본인이 피보험자가 아닌 보험</li>
      <li class="bullet-text">무기명 처리된 단체 보험</li>
      <li class="bullet-text">화재 보험</li>
      <li class="bullet-text">배상책임 보험</li>
      <li class="bullet-text">
        제3자(신용정보집중기관) 정보제공 동의를 하지 않은 보험
      </li>
    </ul>
  </container>
</template>

<script>
export default {
  name: 'inquiry2',
};
</script>

<style scoped></style>
