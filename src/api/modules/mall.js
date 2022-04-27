import { instance } from '../index';

/**
 * 보험몰 메인(배너, 보험상품, 포스트)
 * @author 박래섭
 * @return {object} 전달받은 데이터
 */
function getMallMainData() {
  return instance.get(`/cmal0100r001`);
}

/**
 * 보험상품타입 리스트
 * @author 박래섭
 * @param {object} params 보험상품타입코드
 * @return {object} 전달받은 데이터
 */
function getInsureTypeLists(params) {
  return instance.get(`/cmal0100r002`, { params: params });
}
/**
 * 보험 상품 상세보기
 * @author 박래섭
 * @param {object} params 보험상품일련번호
 * @return {object} 전달받은 데이터
 */
function getInsureItemDetail(params) {
  return instance.get(`/cmal0100r003`, { params: params });
}
/**
 * 보험 상품 상세보기
 * @author 이수현
 * @param {object} params 요청시 필요한 필수 파라미터 page(페이지번호), size(페이지노출수)
 * @return {object} 전달받은 데이터
 */
function getInsureCategoryList(params) {
  return instance.get(`/ccon0101r002`, { params: params });
}

/**
 * 보험 상품 상세보기
 * @author 이수현
 * @param {object} params 요청시 필요한 필수 파라미터 insRcmCtgrCd(상품 카테고리를 ,로 구별해서 전달)
 * @return {object} 전달받은 데이터
 */
function getRecommendProduct(params) {
  return instance.get(`/cmal0100r004`, { params: params });
}

export {
  getMallMainData,
  getInsureItemDetail,
  getInsureTypeLists,
  getInsureCategoryList,
  getRecommendProduct,
};
