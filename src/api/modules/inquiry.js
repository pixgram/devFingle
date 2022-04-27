import { instance } from '../index';

/**
 * 보험 상세 조회
 * @author 김소연
 * @param {object} params 요청시 필요한 필수 파라미터 custFmlySno, insDvVal
 * @return {object} 요청한 데이터
 */
function getInsuranceDetail(params) {
  return instance.get(`/cana0201r004`, { params: params });
}

export { getInsuranceDetail };
