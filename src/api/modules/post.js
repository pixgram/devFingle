import { instance } from '../index';

/**
 * 포스트 카테고리 조회
 * @author 김도은
 * @return {object} 요청한 데이터
 */
function getPostCategory() {
  return instance.get(`/ccomgroup/CTS001`);
}
/**
 * 포스트 추천 목록 조회
 * @author 김도은
 * @param {object}
 * @return {object} 요청한 데이터
 */
function getRecPostList() {
  return instance.get(`/ccon0101r001`);
}
/**
 * 포스트 목록 조회
 * @author 김도은
 * @param {object} params 요청시 필요한 필수 파라미터 page(페이지 번호), size(페이지 노출 로우 수)
 * @return {object} 요청한 데이터
 */
function getPostList(params) {
  return instance.get(`/ccon0101r002`, { params: params });
}
/**
 * 포스트 상세 조회
 * @author 김도은
 * @param {object} params 요청시 필요한 필수 파라미터 postCtgrCd(포스트카테고리코드), postSno(포스트일련번호)
 * @return {object} 요청한 데이터
 */
function getPostDetail(params) {
  return instance.get(`/ccon0201r001`, { params: params });
}
/**
 * 포스트 상세 퀴즈 정답 조회
 * @author 김도은
 * @param {object} params 요청시 필요한 필수 파라미터 postAnswVal(퀴즈 정답 값), postSno(포스트일련번호)
 * @return {object} 요청한 데이터
 */
function getPostQuizAnswer(params) {
  return instance.get(`/ccon0201r002`, { params: params });
}
/**
 * 포스트 상세 북마크 상태 전송
 * @author 김도은
 * @param {object} params 요청시 필요한 필수 파라미터 postCtgrCd(포스트카테고리코드), postSno(포스트일련번호)
 * @return {object} 요청한 데이터
 */
function postBookmark(params) {
  return instance.post(`/ccon0201c002`, params);
}
/**
 * 포스트 상세 공유 이력 전송
 * @author 김도은
 * @param {object} params 요청시 필요한 필수 파라미터 cmmnMdiaDvCd(포스트카테고리코드), postSno(포스트일련번호)
 * @return {object} 요청한 데이터
 */
function postShare(params) {
  return instance.post(`/ccon0201c001`, params);
}
export {
  getPostCategory,
  getRecPostList,
  getPostList,
  getPostDetail,
  getPostQuizAnswer,
  postBookmark,
  postShare,
};
