import { getDashboardDataApi } from "./DashboardApi";




export async function getDashboardData(months,companyId,endCursor,loadMore) {

    const birthDataResponse = await getDashboardDataApi(months,companyId,endCursor,loadMore);

    return birthDataResponse 
}