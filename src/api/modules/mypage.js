import { instance } from '../index';

/**
 * 마이페이지 : 상담 내역 후기 작성 데이터 조회
 * @author 지은유
 * @data {object} 필수 요청 데이터 : cnslSno
 * @return {object} 요청한 데이터
 */
function postCounselingData(params) {
  return instance.get(`/cmyp0501r004`, { params: params });
}
/**
 * 마이페이지 : 상담 내역 후기 작성
 * @author 김지현
 * @data {object} 필수 요청 데이터 : cnslCtt(상담후기내용), cnslSno(상담일련번호), hrspScr(별점)
 * @return {object} 요청한 데이터
 */
function postCounselingReview(data) {
  return instance.post(`/cmyp0501c001`, data);
}

/**
 * 마이페이지 : 상담 내역 후기 조회
 * @author 김지현
 * @param {object} params 요청시 필요한 필수 파라미터 cnslLtpdSno(상담후기일련번호)
 * @return {object} 요청한 데이터
 */
function getCounselingReview(params) {
  return instance.get(`/cmyp0501r003`, { params: params });
}

/**
 * 마이페이지 : 문의내역 조회
 * @author 김지현
 * @param {object} params 요청시 필요한 필수 파라미터 fldtpQnaSno
 * @return {object} 요청한 데이터
 */
function getInquiry(params) {
  return instance.get(`/cmyp0502r002`, { params: params });
}
export {
  postCounselingData,
  postCounselingReview,
  getCounselingReview,
  getInquiry,
};
