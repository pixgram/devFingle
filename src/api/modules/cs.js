import { instance } from '../index';

/**
 * 공지사항 목록 조회
 * @author 이정민
 * @param {object} params 요청시 필요한 필수 파라미터 page, size
 * @return {object} 요청한 데이터
 */
function getNoticeList(params) {
  return instance.get(`/cbod0101r001`, { params: params });
}
/**
 * 공지사항 상세 조회
 * @author 이정민
 * @param {object} params 요청시 필요한 필수 파라미터 bbsSno
 * @return {object} 요청한 데이터
 */
function getNoticeView(params) {
  return instance.get(`/cbod0101r002`, { params: params });
}
/**
 * 이벤트 목록 조회
 * @author 지은유
 * @param {object} params 요청시 필요한 필수 파라미터 page, size ,sort
 * @return {object} 요청한 데이터
 */
function getEventList(params) {
  return instance.get(`/cbod0102r001`, { params: params });
}
/**
 * 이벤트 상세 조회
 * @author 지은유
 * @param {object} params 요청시 필요한 필수 파라미터 evntBbsSno
 * @return {object} 요청한 데이터
 */
function getEventView(params) {
  return instance.get(`/cbod0102r002`, { params: params });
}
/**
 * 1:1 문의 등록
 * @author 김소연
 * @param {object} 필수 요청 데이터 : quryQustCtgrCd(문의질문카테고리코드),qustCtt(문의내용)
 * @return {object} 요청한 데이터
 */
function postQa(data) {
  return instance.post(`/cbod0104c001`, data);
}
/**
 * FAQ 목록 조회
 * @author 지은유
 * @param {object} params 요청시 필요한 필수 파라미터 faqCtgrCd, keyword, page, size
 * @return {object} 요청한 데이터
 */
function getfaqList(params) {
  return instance.get(`/cbod0103r001`, { params: params });
}

/**
 * FAQ 카테고리 조회
 * @author 지은유
 * @return {object} 요청한 데이터
 */
function getfaqCategory() {
  return instance.get(`/cbod0103r002`);
}

/**
 * 1:1 문의 조회
 * @author 김소연
 * @param {object} params 요청시 필요한 필수 파라미터 fldtpQnaSno
 * @return {object} 요청한 데이터
 */
function getQaView(params) {
  return instance.get(`/cbod0104r001`, { params: params });
}

/**
 * 1:1 문의 유형 코드
 * @author 김소연
 * @param {object} params 요청시 필요한 필수 파라미터 grpCd
 * @return {object} 요청한 데이터
 */
function getQaCategory(params) {
  return instance.get(`/ccomgroup/BOD004`, { params: params });
}

export {
  getNoticeList,
  getNoticeView,
  getEventList,
  getEventView,
  getfaqList,
  getfaqCategory,
  postQa,
  getQaView,
  getQaCategory,
};
