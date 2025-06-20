import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import config from "../../../config/config";
import DashboardTable from "../../tables/DashboardTable";
import { getEmployeeData, getEmployeeDropdownList } from "./employeeData";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import he from "he";
import { useSnackbar } from "notistack";
import Pagination from "./Pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DeletePopUp from "./DeletePopUp";
import FilterCompontent from "./FilterCompontent";
import RemoveFilterCompontent from "./RemoveFilterCompontent";
import SendInvitation from "../onboarding/SendInvitation";
import { successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import SelectBoxDropdown from "./SelectBoxDropdown";
const Employees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const per_count = searchParams.get("per_page");
  const nextValue = searchParams.get("next_value");
  const previousValue = searchParams.get("previous_value");
  const search_data = searchParams.get("search_value");
  const filter_applied = searchParams.get("filter_applied");
  const filterValue = filter_applied ? true : false;
  const search_value = search_data ? search_data : "";
  const per_page = per_count ? per_count : 10;

  const employment_type = searchParams.get("employment_type");
  const department_type = searchParams.get("department_type");
  const role_type = searchParams.get("role_type");
  const status_type = searchParams.get("status_type");
  const gender_type = searchParams.get("gender_type");

  const employmentValue = employment_type ? employment_type : "All";
  const departmentValue = department_type ? department_type : "All";
  const roleValue = role_type ? role_type : "All";
  const statusValue = status_type ? status_type : "Active";
  const genderValue = gender_type ? gender_type : "All";

  const [showSkeleton, setShowSkeleton] = useState(true);
  const data = Cookies.get("token");
  const user_details = data ? JSON?.parse(data) : "";

  const user_role = user_details?.user?.userRole    

  const token = user_details?.authToken;

  const user_id = useSelector((store) => store?.auth?.data?.user?.userId);
  const employees_redux = useSelector((store) => store?.employee);

  const user_deatils = useSelector(store=>store?.auth?.api_call_company_details);
  const companyID = user_deatils?.companyId;

  const pagination = employees_redux?.employee_pagination;

  const [employeeMainData, setEmployeeMainData] = useState();

  useEffect(() => {
    setEmployeeMainData(employees_redux?.employee_data);
  }, [employees_redux]);




  const employee_data =
    employeeMainData?.length > 0
      ? employeeMainData?.map((emp) => {
          const name = emp?.firstName + " " + emp?.lastName;
          const employee_value = emp?.userId === user_id ? "It’s you" : "";
          return {
            key: emp?.userId,
            id: emp?.userId,
            employee_member_id: emp?.memberID || " No Member Id",
            employee_id: emp?.userId || "No ID",
            employee_name: name || "No Name",
            employee_email: emp?.email || "No Email",
            employee_designation: emp?.userDesignation || "No Designation",
            employee_role: emp?.userRole || "No Role",
            employee_reporting_to: emp.manager.id
              ? emp?.manager?.name
              : "No Manager",
            employee_status: emp?.userIsInActive ? "Inactive" : "Active",
            employee_value: employee_value,
            employee_image: emp?.profileImage,
            employee_data: emp,
          };
        })
      : [];

  const [selectedValue, setSelectedValue] = useState("No Action");
  const [selectedValueTwo, setSelectedVlaueTwo] = useState("Select status");
  const [selectedRows, setSelectedRows] = useState([]);
  const [tablepopup, setTablepopup] = useState(0);
  const [dialogBoxcordinates, setDialogBoxCordinates] = useState({
    x: 0,
    y: 0,
  });

  const [deletePopUpDisplay, setDeletePopUpDisplay] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [filterShow, setFilterShow] = useState(false);

  const [buttonClicked, setbuttonClicked] = useState(false);

  const [showAddEmployeePopUp, setShowAddEmployeePopUp] = useState(false);

  const fetchEmployeeData = async (
    first,
    last,
    nextValue,
    previousValue,
    per_page,
    search_value,
    employmentValue,
    departmentValue,
    roleValue,
    statusValue,
    genderValue,
    filterValue,
  ) => {
    const search_data = search_value ? search_value : "";

    // const decode_search_value = encodeURIComponent(search_value)
    setShowSkeleton(true);
    await getEmployeeData(
      companyID,
      first,
      last,
      nextValue,
      previousValue,
      parseInt(per_page ? per_page : 10),
      search_data,
      employmentValue,
      departmentValue,
      roleValue,
      statusValue,
      genderValue,
      filterValue,
    );

    const getDropDownUser = await  getEmployeeDropdownList(companyID,true)

    setShowSkeleton(false);
  };

  useEffect(() => {
    if (tablepopup || showAddEmployeePopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tablepopup, showAddEmployeePopUp]);

  const columns = [
    {
      name: "Member ID",
      selector: (row) => row.employee_member_id,
      minWidth: "150px",
    },
    {
      name: "Name",
      selector: (row) => row.employee_name,
      cell: (row) => {
        return (
          <Link to={`/employees/view-employee/${row?.employee_data?.id}`}>
            <div className="flex gap-3">
              <div className="relative max-h-10 min-h-10 min-w-10 max-w-10 rounded-full">
                {row?.employee_image ? (
                  <img
                    className="absolute h-full w-full rounded-full"
                    src={row?.employee_image}
                    alt=""
                  />
                ) : (
                  <div className=" flex h-full w-full items-center  justify-center rounded-full bg-[#806BFF] text-center text-2xl font-semibold capitalize leading-5 text-[#FFFFFF] ">
                    {row?.employee_name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex gap-3">
                  <div className="block max-w-[200px] capitalize overflow-hidden truncate whitespace-nowrap text-sm font-semibold leading-4 text-[#26212E]">
                    {row?.employee_name}
                  </div>
                  {row?.employee_value?.length > 0 && (
                    <div
                      className={` ${
                        row?.employee_value === "New Hire"
                          ? `bg-[#806BFF]`
                          : `bg-[#C4C0DC]`
                      } h-[20px] whitespace-nowrap rounded-[30px] bg-[#806BFF] px-2 py-[2px] text-xs font-semibold leading-4 text-[#FFFFFF]`}
                    >
                      {row?.employee_value}
                    </div>
                  )}
                </div>
                <div className="whitespace-nowrap text-sm font-normal leading-4 text-[#26212E]">
                  {row?.employee_designation}
                </div>
              </div>
            </div>
          </Link>
        );
      },
      minWidth: "250px",
      style: {
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
    {
      name: "Email",
      selector: (row) => row.employee_email,
      minWidth: "250px",
      
    },
    {
      name: "User Role",
      selector: (row) => row.employee_role,
      cell:(row)=>{
        return <div className=" relative ">
                 {
                 ( user_role?.toLowerCase() === "owner" || user_role === "administrator" )? 
                 <div className=" relative ">
                            
                      <select 
                          id={row?.key}
                          className={ ` custom-select h-[30px] px-4  border border-[#DCD6FF] rounded !bg-[#FFFFFF] focus:outline-none placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] `} 
                          value={row?.employee_role}
                        onChange={(e)=>{updateEmployeeHandler(row?.employee_id,e.target.value)}}
                      >
                        <option value={""}>Select User role</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"employee"}>Employee</option>
                        <option value={"manager"}>Manager</option>
                      </select>
                  

                 </div> :<div className=" capitalize flex gap-1 whitespace-nowrap text-sm font-normal leading-4 text-[#26212E] ">
                      {row.employee_role}
                      {/* <img src={config.PUBLIC_URL + "/assets/images/amdital/app_adminstration.svg"} alt=""/> */}
                 </div> }
        </div>
      },
      minWidth: "200px",
    },
    {
      name: "Reporting To",
      selector: (row) => row.employee_reporting_to,
      minWidth: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.employee_status,
      cell: (row) => {
        return (
          <div
            className={`flex items-center gap-1 whitespace-nowrap rounded-[30px] px-[10px] py-1 text-sm font-normal leading-4 ${
              row.employee_status === "Active"
                ? `bg-[#CAF1DC] text-[#00B656]`
                : `bg-[#FFEFEF] text-[#FF8181]`
            }`}
          >
            <div
              className={`h-[7px] w-[7px] rounded-full ${
                row.employee_status === "Active"
                  ? `bg-[#00B656]`
                  : `bg-[#FF8181]`
              }`}
            ></div>
            {row.employee_status}
          </div>
        );
      },
    },
    {
      name: "Action",
      selector: (row) => row.employee_action,
      cell: (row) => {
        return (
          <div className=" relative flex h-7 w-7 items-center justify-center rounded border border-[#E1DCFF] bg-[#F8F7FC]">
            <img
              src={config.PUBLIC_URL + "/assets/images/amdital/three_dots.svg"}
              alt=""
              className="  absolute h-full w-full py-1  "
              onClick={(e) => {
                e.stopPropagation();

                if (window.innerWidth > 900) {
                  if (e.clientY > window.outerHeight - 200) {
                    setDialogBoxCordinates({
                      x: e.clientX,
                      y: e.clientY - 100,
                    });
                  } else {
                    setDialogBoxCordinates({ x: e.clientX, y: e.clientY });
                  }
                }
                if (window.innerWidth < 900) {
                  setDialogBoxCordinates({ x: e.clientX, y: e.clientY });
                }

                setTablepopup(tablepopup !== row.key ? row?.key : 0);
              }}
            />
            {tablepopup === row.key && (
              <div
                className={`custom-shadow fixed z-[1100] rounded border border-[#EAEAEA] bg-[#FFFFFF]  md:-ml-[100px] md:mt-[26px]`}
                style={{ top: dialogBoxcordinates.y, right: 40 }}
              >
                <div className={`flex  w-[120px] cursor-pointer flex-col  gap-[18px] whitespace-nowrap rounded border border-[#DCD6FF] p-3 `}>
                  <Link
                    to={`/employees/view-employee/${row?.employee_data?.id}`}
                  >
                    <div className=" flex items-center gap-2 whitespace-nowrap text-sm font-normal leading-4 text-[#26212E]">
                      <img
                        src={
                          config.PUBLIC_URL +
                          "/assets/images/amdital/eye_icon_new.svg"
                        }
                        alt=""
                      />
                      <div>View</div>
                    </div>
                  </Link>
                 {(user_role?.toLowerCase() === "owner" || row?.key === user_id ) && <Link
                    to={`/employees/edit-employee/${row?.employee_data?.id}`}
                  >
                    {" "}
                    <div className=" flex items-center gap-2 whitespace-nowrap text-sm font-normal leading-4 text-[#26212E]">
                      <img
                        src={
                          config.PUBLIC_URL +
                          "/assets/images/amdital/edit_icon_black.svg"
                        }
                        alt=""
                      />
                      <div>Edit</div>
                    </div>
                  </Link>}
                  {user_role?.toLowerCase() === "owner" && <div
                    onClick={() => {
                      setDeleteId(row?.employee_id);
                      setDeletePopUpDisplay(!deletePopUpDisplay);
                    }}
                    className=" flex items-center gap-2 whitespace-nowrap text-sm font-normal leading-4 text-[#26212E]"
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/delete_icon_black.svg"
                      }
                      alt=""
                    />
                    <div>Delete</div>
                  </div>}
                </div>
              </div>
            )}
            {tablepopup === row?.key && (
              <div
                className="fixed inset-0 z-[1000]"
                onClick={() => {
                  setTablepopup(tablepopup !== row.key ? 0 : 0);
                }}
              ></div>
            )}
          </div>
        );
      },
    },
  ];

  const onChangeHandlerSelectedOne = (e) => {
    setSelectedValue(e.target.value);
    setSelectedVlaueTwo("Select status");
  };

  const onChangeHandlerSelectedTwo = (e) => {
    setSelectedVlaueTwo(e.target.value);
  };

  const handleChange = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row?.id));
    setSelectedValue("No Action");
  };

  const updateEmployeeHandler = async (user_id, role_name) => {
    const updateData = employeeMainData?.map((item) =>
      item?.userId === user_id ? { ...item, userRole: role_name } : item,
    );
    setEmployeeMainData(updateData);

    const graphqlQuery = {
      query: `
                mutation UpdateUser($input: UpdateUserInput!) {
                  updateUser(input: $input) {
                    user {
                      id
                    }
                  }
                }
              `,
      variables: {
        input: {
          id: `${user_id}`,
          userRole: `${role_name}`,
        },
      },
    };
    try {
      const res = await axios.post(config.API_URL, graphqlQuery, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const attendance_data = await getEmployeeData(
        companyID,
        per_page,
        per_page,
        nextValue,
        previousValue,
        per_page,
        search_value,
        employmentValue,
        departmentValue,
        roleValue,
        statusValue,
        genderValue,
        filterValue,
      );

      if (res.data.errors) {
        const errorMessage = he.decode(
          res.data.errors[0]?.message || "Network error occurred",
        );
        const message = (
          <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
        );
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          style: {
            background: "#FF0000",
            size: "16px",
            fontWeight: "500",
            color: "#FFFFFF",
          },
        });
      }
      // if (res.data.data?.updateUser?.user) {
      //     const errorMessage = he.decode(res.data.data?.createAttendance?.message || "Network error occurred");
      //     const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
      //     enqueueSnackbar(message, {
      //       variant: 'error',
      //       autoHideDuration: 1500,
      //       anchorOrigin: {
      //         vertical: 'top',
      //         horizontal: 'right',
      //       },
      //       style:{
      //         background:"#FF0000",
      //         size:"16px",
      //         fontWeight:"500",
      //         color:"#FFFFFF"
      //       },
      //     });
      //   }
      if (res.data.data?.updateUser?.user) {
        const errorMessage = he.decode("Successfully Updated");
        const message = (
          <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
        );
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          style: {
            background: "#FFFFFF",
            size: "16px",
            fontWeight: "600",
            lineHeight: "20px",
            color: "#26212E",
          },
        });
      }
    } catch (error) {}
  };

  const previousHandler = (previous_page_name) => {
    navigate(
      `/employees/?per_page=${per_page}&search_value=${search_value}&previous_value=${previous_page_name}`,
    );
  };
  const nextHandler = (next_page_name) => {
    navigate(
      `/employees/?per_page=${per_page}&search_value=${search_value}&next_value=${next_page_name}`,
    );
  };

  const entriesHandler = (entries) => {
    navigate(`/employees/?per_page=${entries}&search_value=${search_value}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    if (nextValue) {
      fetchEmployeeData(
        per_page,
        null,
        nextValue,
        null,
        per_page,
        search_value,
        employmentValue,
        departmentValue,
        roleValue,
        statusValue,
        genderValue,
        filterValue,
      );
    } else if (previousValue) {
      fetchEmployeeData(
        null,
        per_page,
        null,
        previousValue,
        per_page,
        search_value,
        employmentValue,
        departmentValue,
        roleValue,
        statusValue,
        genderValue,
        filterValue,
      );
    } else if (per_count || search_data) {
      fetchEmployeeData(
        per_page,
        null,
        null,
        null,
        per_page,
        search_value,
        employmentValue,
        departmentValue,
        roleValue,
        statusValue,
        genderValue,
        filterValue,
      );
    } else {
      fetchEmployeeData();
    }
  }, [
    nextValue,
    previousValue,
    per_count,
    per_page,
    search_data,
    search_value,
    employmentValue,
    departmentValue,
    roleValue,
    statusValue,
    genderValue,
    filterValue,
  ]);

  const searchHandler = (e) => {
    const search_value = e.target.value;

    // navigate(`/employees/?per_page=${per_page}&search_value=${search_value}`)
    navigate(
      `/employees/?per_page=${per_page}&search_value=${encodeURIComponent(
        search_value,
      )}`,
    );
  };

  const deleteHandler = async (id) => {
    if (id === null || id === "") {
      const errorMessage = he.decode("Please select member");
      const message = (
        <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
      );
      enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        style: {
          background: "#FF0000",
          size: "16px",
          fontWeight: "500",
          color: "#FFFFFF",
        },
      });
      setbuttonClicked(false);
    }

    setbuttonClicked(true);

    const graphqlQuery = {
      query: `
          mutation {
            deleteUser(input: {id:${id}}) {
              user {
                id
                username
                email
              }
            }
          }
      `,
    };

    try {
      const res = await axios.post(config.API_URL, graphqlQuery, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.errors) {
        const errorMessage = he.decode(
          res.data.errors[0]?.message || "Network error occurred",
        );
        const message = (
          <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
        );
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          style: {
            background: "#FF0000",
            size: "16px",
            fontWeight: "500",
            color: "#FFFFFF",
          },
        });
        setbuttonClicked(false);
      }
      if (res.data.data?.deleteUser?.user) {
        const errorMessage = he.decode("User Deleted Successfully");
        const message = (
          <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
        );
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          style: {
            background: "#FFFFFF",
            size: "16px",
            fontWeight: "600",
            lineHeight: "20px",
            color: "#26212E",
          },
        });
        fetchEmployeeData();
        setbuttonClicked(false);
        setDeletePopUpDisplay(false);
        setTablepopup(0);
      }
    } catch (error) {
      setbuttonClicked(false);
    }
  };
  const skeletonColumns = [
    {
      name: "Member ID",
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={100}
          height={20}
        />
      ),
      minWidth: "150px",
    },
    {
      name: "Name",
      cell: (row) => {
        return (
          <div className="flex gap-3">
            <div className="relative max-h-10 min-h-10 min-w-10 max-w-10 rounded-full">
              <Skeleton
                baseColor="#E0E0E0"
                highlightColor="#C8C8C8"
                className=" rounded-full "
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <Skeleton
                baseColor="#E0E0E0"
                highlightColor="#C8C8C8"
                width={200}
                height={20}
              />
              <Skeleton
                baseColor="#E0E0E0"
                highlightColor="#C8C8C8"
                width={150}
                height={15}
              />
            </div>
          </div>
        );
      },
      minWidth: "350px",
      style: {
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
    {
      name: "Email",
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={200}
          height={20}
        />
      ),
      minWidth: "250px",
    },
    {
      name: "User Role",
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={100}
          height={20}
        />
      ),
      minWidth: "200px",
    },
    {
      name: "Reporting To",
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={100}
          height={20}
        />
      ),
      minWidth: "150px",
    },
    {
      name: "Status",
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={100}
          height={20}
        />
      ),
    },
    {
      name: "Action",
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={100}
          height={20}
        />
      ),
    },
  ];

  const filterSubmitHandler = (filterValue) => {
    navigate(
      `/employees/?per_page=${per_page}&search_value=${search_value}&next_value=${nextValue}&previous_value=${previousValue}&filter_applied=true&employment_type=${filterValue?.employment_type}&department_type=${filterValue?.department_type}&role_type=${filterValue?.role_type}&status_type=${filterValue?.status_type}&gender_type=${filterValue?.gender_type}`,
    );
    setFilterShow(!filterShow);
  };

  const removeSearchHandler = () => {
    if (filter_applied) {
      navigate(
        `/employees/?per_page=${per_page}&search_value=${""}&next_value=${nextValue}&previous_value=${previousValue}&filter_applied=true&employment_type=${employmentValue}&department_type=${departmentValue}&role_type=${roleValue}&status_type=${statusValue}&gender_type=${genderValue}`,
      );
    } else {
      navigate(
        `/employees/?per_page=${per_page}&search_value=${""}&next_value=${nextValue}&previous_value=${previousValue}`,
      );
    }
  };
  const removeFilterHandler = () => {
    navigate(
      `/employees/?per_page=${per_page}&search_value=${search_value}&next_value=${nextValue}&previous_value=${previousValue}`,
    );
  };


  const applyHandler = async (value) => {
    if (selectedValue === "Delete") {
      const deletePromises = value?.map((item) => {
        const graphqlQuery = {
          query: `
            mutation {
              deleteUser(input: {id: ${item}}) {
                user {
                  id
                  username
                  email
                }
              }
            }
          `,
        };
  
        return axios.post(config.API_URL, graphqlQuery, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      });
      const all_promise =  await Promise.all(deletePromises);
      successfullMessageHandler(enqueueSnackbar,"Successfully Deleted!")
      handleClear();
      setSelectedRows([])
      fetchEmployeeData();
    }
  
    if (selectedValueTwo === "Active" || selectedValueTwo === "Inactive") {
      const updatePromises = value?.map(async (item) => {
        const graphqlQuery = {
          query: `
            mutation UpdateUser($input: UpdateUserInput!) {
              updateUser(input: $input) {
                user {
                  id
                }
              }
            }
          `,
          variables: {
            input: {
              id: item, // use the actual item ID here
              userIsInActive: selectedValueTwo === "Active"? false:true,
            },
          },
        };
    
        const res = await axios.post(config.API_URL, graphqlQuery, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      });
    
      await Promise.all(updatePromises); // wait for all updates to complete
  
      successfullMessageHandler(enqueueSnackbar, "Successfully Updated!");
      fetchEmployeeData();
    }
    
  };
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleClear = () => {
    setToggleCleared(!toggleCleared); // toggling resets selection
  };
  

  return (
    <>
      <div className={` relative  ${showSkeleton && ` pointer-events-none `}`}>
        <div className="flex  min-h-[66px] items-center justify-between border-b border-[#E1DCFF] bg-[#F8F7FC] px-6 py-4">
          {selectedRows?.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                onClick={()=>{applyHandler(selectedRows)}}
                className={` ${
                  selectedValue === "Change Status" &&
                  selectedValueTwo !== "Select status"
                    ? `cursor-pointer bg-[#806BFF] hover:bg-[#6048F1]`
                    : selectedValue === "Delete"
                    ? `cursor-pointer bg-[#806BFF]  hover:bg-[#6048F1] `
                    : `bg-[#C2B8FF]`
                } flex h-8 min-w-[73px] max-w-[73px] items-center justify-center  rounded text-sm font-semibold leading-4 tracking-[5%] text-[#FFFFFF]`}
                disabled={
                  selectedValue === "Change Status" &&
                  selectedValueTwo !== "Select status"
                    ? false
                    : selectedValue === "Delete"
                    ? false
                    : true
                }
              >
                Apply
              </button>
              {/* Action Dropdown */}
              <select
                className={`custom-select h-8 min-w-[153px] rounded border border-[#DCD6FF] bg-[#FFFFFF] px-4 text-sm font-normal leading-[25px] text-[#26212E] focus:outline-none`}
                onChange={onChangeHandlerSelectedOne}
                value={selectedValue}
              >
                <option value="No Action">No Action</option>
                <option value="Change Status">Change Status</option>
                <option value="Delete">Delete</option>
              </select>
              {selectedValue !== "No Action" && selectedValue !== "Delete" && (
                <select
                  className={`custom-select h-8 min-w-[140px] rounded border border-[#DCD6FF] bg-[#FFFFFF] px-4 text-sm font-normal leading-[25px] text-[#26212E] focus:outline-none`}
                  onChange={onChangeHandlerSelectedTwo}
                  value={selectedValueTwo}
                >
                  <option value="Select status">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              )}
            </div>
          )}

          <div className="flex w-full justify-end gap-4 pr-0.5 ">
            {/* search */}
            { selectedValue !== "Change Status" && <div
              className={`${
                selectedRows?.length > 0 ? `2xl:w-[312px]` : `w-[312px]`
              } flex h-8 cursor-pointer items-center gap-1 rounded border border-[#E1DCFF] bg-[#FFFFFF] pl-5 pr-6`}
            >
              <input
                type="text"
                value={search_value}
                placeholder={"Search Employees"}
                onChange={searchHandler}
                className="normal_content_black h-full w-full outline-none placeholder:text-[#74689280]"
              />
              <img
                className=""
                src={
                  config.PUBLIC_URL + "/assets/images/amdital/table_search.svg"
                }
                alt="search-icon"
              />
            </div>}

            {/* filter */}
            <button
              onClick={() => {
                setFilterShow(!filterShow);
              }}
              className="flex h-8 min-w-[94px] items-center justify-center gap-1 rounded border border-[#DCD6FF] bg-[#FFFFFF] text-sm font-semibold leading-4 tracking-[5%] text-[#260B6A] hover:bg-[#EEEBFF]"
            >
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/filter.svg"}
                alt="Filter Icon"
                className="h-[15px] w-[16px]"
              />
              Filter
            </button>
            <Link to="/organization">
              <button className="flex h-8 w-[163px] items-center justify-center rounded bg-[#806BFF] text-sm font-semibold leading-4 tracking-[5%] text-[#FFFFFF]">
                Organization View
              </button>
            </Link>

            {/* button */}
            {/* <Link to="/employees/add-new-employee"> */}
            <button
              onClick={() => {
                setShowAddEmployeePopUp(!showAddEmployeePopUp);
              }}
              className="flex h-8 w-[163px] items-center justify-center rounded bg-[#FF845C] text-sm font-semibold leading-4 tracking-[5%] text-[#FFFFFF] hover:bg-[#F36A3D]"
            >
              Add New Employees
            </button>
            {/* </Link> */}
          </div>
        </div>

        {(search_value?.length > 0 || filter_applied) && (
          <RemoveFilterCompontent
            searchParameter={search_value}
            filterParameter={filter_applied}
            removeSearchHandler={removeSearchHandler}
            removeFilterHandler={removeFilterHandler}
          />
        )}

        <div className=" mx-6  ">
          <div className="custom-shadow mt-4  w-full rounded border border-[#E1DCFF] bg-[#FFFFFF] ">
            <DashboardTable
              TablecolumData={showSkeleton ? Array(10).fill({}) : employee_data}
              headerData={showSkeleton ? skeletonColumns : columns}
              entireRowClicked={true}
              navigationname={"employee"}
              tableallselectcheckbox={ user_role?.toLowerCase() === "owner" && "selectableRows"}
              onSelectedRowsChange={handleChange}
              tablehighlightOnHover={"highlightOnHover"}
              page_name={true}
              clearSelectedRows={toggleCleared}
            />
          </div>
          <Pagination
            currentShowEntries={10}
            previousHandler={() => {
              previousHandler(pagination?.startCursor);
            }}
            nextHandler={() => {
              nextHandler(pagination?.endCursor);
            }}
            hasPreviousPage={pagination?.hasPreviousPage}
            hasNextPage={pagination?.hasNextPage}
            entriesHandler={entriesHandler}
          />
        </div>
      </div>
      {showAddEmployeePopUp && (
        <div className=" fixed inset-0 z-[1000] flex   h-full w-full flex-col justify-end ">
          <div className=" min-h-[56px] w-full  "></div>
          <div className=" z-[1200]  h-screen max-w-[600px] self-end overflow-y-auto ">
            <SendInvitation
              onClose={() => {
                setShowAddEmployeePopUp(!showAddEmployeePopUp);
              }}
              fetchHandler={fetchEmployeeData}
            />
          </div>
          {showAddEmployeePopUp && (
            <div
              onClick={() => {
                setShowAddEmployeePopUp(!showAddEmployeePopUp);
              }}
              className=" fixed inset-0 z-[1100] bg-[#150C2CB2]  "
            ></div>
          )}
        </div>
      )}

      {deletePopUpDisplay && (
        <div className="fixed left-0 top-0 z-[1100] flex h-full w-full justify-center ">
          <div className=" z-[1100]  mt-20 h-fit ">
            <DeletePopUp
              buttonDeleteName="Delete"
              buttonCLoseName="Cancel"
              cancelHandler={() => {
                setDeletePopUpDisplay(false);
                setTablepopup(0);
              }}
              deleteHandler={() => {
                deleteHandler(deleteId);
              }}
            />
          </div>
          {deletePopUpDisplay && (
            <div
              className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
              onClick={() => {
                setDeletePopUpDisplay(false);
                setTablepopup(0);
              }}
            ></div>
          )}
        </div>
      )}
      {filterShow && (
        <div
          className="fixed right-0 top-0 z-[1100]  h-full
                      overflow-y-scroll border-l border-[#DCD6FF] bg-[#FFFFFF] p-4 lg:w-[300px]"
        >
          <FilterCompontent
            onClose={() => {
              setFilterShow(!filterShow);
            }}
            departmentDropdown={true}
            roleDropdown={true}
            statusDropdown={true}
            genderDropdown={true}
            employmentTypeDropdown={true}
            filterSubmitHandler={filterSubmitHandler}
          />
        </div>
      )}
      {filterShow && (
        <div
          className=" fixed inset-0 z-[1000] h-full w-full  opacity-70"
          onClick={() => {
            setFilterShow(!filterShow);
          }}
        ></div>
      )}
    </>
  );
};

export default Employees;
