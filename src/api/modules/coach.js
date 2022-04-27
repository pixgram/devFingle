import { instance } from '../index';

/**
 * 핑클 코치 카테고리 조회
 * @author 지은유
 * @param {object} params 요청시 필요한 필수 파라미터 code
 * @return {object} 요청한 데이터
 */
function getCoachCategory(params) {
  return instance.get(`/ccoa0102r001`, { params: params });
}
/**
 * 핑글 코치 목록 조회 - Page
 * @author 지은유
 * @param {object} params 요청시 필요한 필수 파라미터 categoryInherit, cfntCnslUseYn, chtgUseYn, orderType, page, size, telCnslUseYn, vdeoUseYn
 * @return {object} 요청한 데이터
 */
function getCoachList(params) {
  console.log(params);
  return instance.get(`/ccoa0102r002`, { params: params });
}
/**
 * 핑글코치 상세 : 소개 조회
 * @author 이정민
 * @param {object} params 요청시 필요한 필수 파라미터 cchSno(코치일련번호), infoFlag(공통 정보 데이터 조회 여뷰), scoreFlag(별점 통계 조회 여부)
 * @return {object} 요청한 데이터
 */
function getCoachIntro(params) {
  return instance.get(`/ccoa0102r003`, { params: params });
}
/**
 * 핑글코치 상세 : 상담후기 조회
 * @author 이정민
 * @param {object} params 요청시 필요한 필수 파라미터 cchSno(코치일련번호), infoFlag(공통 정보 데이터 조회 여뷰)
 * @return {object} 요청한 데이터
 */
function getCoachReview(params) {
  return instance.get(`/ccoa0102r004`, { params: params });
}
/**
 * 핑글코치 상세 : 자주묻는질문 조회
 * @author 이정민
 * @param {object}
 * @return {object} 요청한 데이터
 */
function getCoachFaq(params) {
  return instance.get(`/ccoa0102r005`, { params: params });
}
/**
 * 핑글코치 상세 : 직접문의하기 팝업
 * @author 이정민
 * @data {object} 필수 요청 데이터 : aspeSno(일련번호), qustCtt(문의내용)
 * @return {object} 요청한 데이터
 */
function postCoachInquiry(data) {
  return instance.post(`/ccoa0102c003`, data);
}

/**
 * 핑글코치 분야별 QNA : 분야별질문항목코드
 * @author 김소연
 * @data {object} 필수 요청 데이터 : fldtpQustTrmCd(분야별질문항목코드), psnlInfoTptyOfrAgrYn(개인정보3자제공동의여부), psnlInfoUtlAgrYn(개인정보이용동의여부)
 * @return {object} 요청한 데이터
 */
function getCoachQACode(params) {
  return instance.get(`/ccomgroup/COA001`, { params: params });
}

/**
 * 핑글코치 분야별 QNA : 작성 페이지
 * @author 김소연
 * @data {object} 필수 요청 데이터 : fileList(파일 목록), fldtpQustTrmCd(분야별질문항목코드), psnlInfoTptyOfrAgrYn(개인정보3자제공동의여부), psnlInfoUtlAgrYn(개인정보이용동의여부), qustCtt(질문내용)
 * @return {object} 요청한 데이터
 */
function postCoachQA(data) {
  return instance.post(`/ccoa0301c001`, data);
}

/**
 * 핑글코치 분야별 QNA기본 조회 : 상세 페이지
 * @author 김소연
 * @data {object} 필수 요청 데이터 : fldtpQnaSno(분야별QNA일련번호)
 * @return {object} 요청한 데이터
 */
function getCoachQA(params) {
  return instance.get(`/ccoa0301r003`, { params: params });
}

export {
  getCoachCategory,
  getCoachList,
  getCoachIntro,
  getCoachReview,
  getCoachFaq,
  postCoachInquiry,
  getCoachQACode,
  postCoachQA,
  getCoachQA,
};
