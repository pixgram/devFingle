import { instance } from '../index';
/**
 * 앱 설정 : 약관 상세 조회
 * @author 이수현
 * @data {object} 필수 요청 데이터 : clusKdCd
 * @return {object} 요청한 데이터
 */
function getAgreeDetail(params) {
  return instance.get(`/clog0105r002`, { params: params });
}

export { getAgreeDetail };
