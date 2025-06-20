import axios from "axios";
import Cookies from 'js-cookie';
import store from "../../store";
import config from "../../config/config";
import { setBirthDayData, setBirthDayDataPagination, setBrithDayHasNext } from "./DashboardSlice";
import { tokenExpireLogoutHandler } from "../../components/elements/amdital/toastyMessage";


const token = ()=>{
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details;
    return token;
}

const storeReduxData = store.getState();


export async function getDashboardDataApi(birthDayMonth,companyId=null,endCursor="",loadMore=false){

    const userData = token();
    const token_value = userData?.authToken;
    const graphqlQuery = {
        query: `
          query NewQuery($first: Int, $after: String, $birthDayMonth: Int, $companyId: Int) {
            users(
              where: {
                meta: {
                  birthDayMonth: $birthDayMonth,
                  companyId: $companyId
                }
              }
              first: $first,
              after: $after
            ) {
              nodes {
                userId
                firstName
                lastName
                profileImage
                dateOfBirth
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        `,
        variables: {
          first: 100,
          after:endCursor,
          birthDayMonth: birthDayMonth,
          companyId:companyId
        }
      };
      
    const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        }});
        if(res?.data?.data){
            if(res?.data?.data?.users?.nodes?.length > 0 && !loadMore ){
                store.dispatch(setBirthDayData(res?.data?.data?.users?.nodes));
                store.dispatch(setBirthDayDataPagination(res?.data?.data?.users?.pageInfo));
                return false;
            }
            if(res?.data?.data?.users?.nodes?.length > 0 && loadMore ){
                store.dispatch(setBrithDayHasNext(res?.data?.data?.users?.nodes));
                store.dispatch(setBirthDayDataPagination(res?.data?.data?.users?.pageInfo));
                return false;
            }
            else{
                store.dispatch(setBirthDayData([]));
                store.dispatch(setBirthDayDataPagination(res?.data?.data?.users?.pageInfo));
                return false;
            }
          }
          if(res?.data?.errors){
            store.dispatch(setBirthDayData([]));
            store.dispatch(setBirthDayDataPagination({}));
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
          }
    return res   
}