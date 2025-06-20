import axios from "axios";
import Cookies from 'js-cookie';
import config from "../../../config/config";
import  store  from '../../../store';
import { setSettingDropDown } from "../../general/generalSlice";


const token = ()=>{
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details;
    return token;
}


export default async function getDropDownValue(){

    const userData = token();
    const token_value = userData?.authToken;
    const email =userData?.user?.email;
    const graphqlQuery = {
        query: `{

  projectDepartments(where: {orderby: TERM_ORDER, order: ASC},first:200) {
    nodes {
      name
      projectDepartmentId
    }
  }
  holidayMonths(where: {order: ASC, orderby: TERM_ID},first:200) {
    nodes {
        name
        holidayMonthId
    }
  }
  holidayYears(where: {order: ASC, orderby: TERM_ID},first:200) {
    nodes {
      name
      holidayYearId
    }
  }
  employmentTypes(where: {order: ASC, orderby: TERM_ID},first:200) {
    nodes {
      name
      employmentTypeId
    }
  }
  jobDesignations(where: {order: ASC, orderby: TERM_ID},first:200) {
    nodes {
      jobDesignationId
      name
    }
  }
  jobTypes (where: {order: ASC, orderby: TERM_ID},first:200){
    nodes {
      jobTypeId
      name
    }
  }
}`,
      };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      });
      if(res?.data?.errors){
        store.dispatch(setSettingDropDown({}));
      }
      if(res?.data?.data){
        store.dispatch(setSettingDropDown(res?.data?.data));
      } 
      
      return res
}