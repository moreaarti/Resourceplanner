import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import moment from "moment";
// import config from "../../../config/config";
import "./shift.css";

import { getShiftsData } from "./shiftApi";
import { useSelector } from "react-redux";
import ShiftTimelineHeader from "./ShiftTimelineHeader";
// import AddShift from "./AddShift";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import ShiftFilterCompontent from "./ShiftFilterCompontent";
// import { setEmployeeDropDownFilterValue } from "../../general/generalSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import RemoveFilterCompontent from "../emplyee/RemoveFilterCompontent";
import config from "../../config/config";
import { setEmployeeDropDownFilterValue } from "../general/generalSlice";
import PerformanceCustomDateDropdown from "./PerformanceCustomDateDropdown";

const ShiftNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize URL params to prevent unnecessary re-renders
  const urlParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      filter_applied: searchParams.get("filter_applied"),
      employment_type: searchParams.get("employment_type"),
      department_type: searchParams.get("department_type"),
      role_type: searchParams.get("role_type"),
      user_type: decodeURIComponent(searchParams.get("user_type") || ""),
    };
  }, [location.search]);

  const {
    filter_applied,
    employment_type,
    department_type,
    role_type,
    user_type,
  } = urlParams;

  const filterValue = filter_applied ? true : false;
  const employmentValue = employment_type || "All";
  const departmentValue = department_type || "All";
  const roleValue = role_type || "All";
  const userValue = user_type || "All";

  // Memoize selectors to prevent unnecessary re-renders
  const user_details = useSelector(
    (store) => store?.auth?.api_call_company_details,
  );
  const companyID = user_details?.companyId;

  const shift_Data = useSelector((store) => store?.shift);
  const shiftReduxData = shift_Data?.shift_data;
  const paginationRedux = shift_Data?.shift_pagination;

  // State management
  const [addShiftPopUp, setAddShiftPopUp] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().startOf("isoWeek").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("isoWeek").format("YYYY-MM-DD"),
  );

  const [editShiftData, setEditShiftData] = useState({});
  const [editToggle, setEditToggle] = useState(false);

  // Use refs to track loading state and prevent duplicate calls
  const isLoadingRef = useRef(false);
  const observerRef = useRef(null);

  // Memoize date change handler
  const onChangeDatehandler = useCallback((startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  // Optimized fetch function with debouncing and duplicate call prevention
  const fetchGetShiftsData = useCallback(
    async (start_date, end_date, loadMore = false) => {
      if (isLoadingRef.current && !loadMore) return; // Prevent duplicate calls

      isLoadingRef.current = true;
      setLoader(true);

      try {
        const endCursor =
          loadMore && paginationRedux?.hasNextPage
            ? paginationRedux?.endCursor
            : "";
        await getShiftsData(
          companyID,
          start_date,
          end_date,
          employmentValue,
          departmentValue,
          roleValue,
          userValue,
          endCursor,
          loadMore,
        );
      } catch (error) {
        console.error("Error fetching shift data:", error);
      } finally {
        setLoader(false);
        isLoadingRef.current = false;
      }
    },
    [
      companyID,
      employmentValue,
      departmentValue,
      roleValue,
      userValue,
      paginationRedux?.endCursor,
      paginationRedux?.hasNextPage,
    ],
  );

  // Silent call for updates without loader
  const silentCallShiftsData = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      const endCursor = paginationRedux?.hasNextPage
        ? paginationRedux?.endCursor
        : "";
      await getShiftsData(
        companyID,
        startDate,
        endDate,
        employmentValue,
        departmentValue,
        roleValue,
        userValue,
        endCursor,
        false,
      );
    } catch (error) {
      console.error("Error in silent call:", error);
    }
  }, [
    companyID,
    startDate,
    endDate,
    employmentValue,
    departmentValue,
    roleValue,
    userValue,
    paginationRedux?.endCursor,
    paginationRedux?.hasNextPage,
  ]);

  // Initial data fetch effect with proper cleanup
  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      if (!isCancelled) {
        await fetchGetShiftsData(startDate, endDate);

        // if (userValue === "All" && !isCancelled) {
        //   dispatch(
        //     setEmployeeDropDownFilterValue({
        //       id: "all",
        //       name: "All",
        //       profileImage: "",
        //       userDesignation: "All",
        //     }),
        //   );
        // }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [
    startDate,
    endDate,
    employmentValue,
    departmentValue,
    roleValue,
    userValue,
    fetchGetShiftsData,
    dispatch,
  ]);

  // Memoized shift data processing
  const { groups, items } = useMemo(() => {
    if (!Array.isArray(shiftReduxData) || shiftReduxData.length === 0) {
      return { groups: [], items: [] };
    }

    const newGroups = shiftReduxData.map((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      const firstLetter = fullName.charAt(0).toUpperCase();
      return {
        id: user.userId,
        title: fullName,
        profileImg: user.profileImage,
        jobTitle: user.userDesignation || "No designation",
        first_letter: firstLetter,
      };
    });

    const newItems = [];
    shiftReduxData.forEach((user) => {
      user.shiftRecords.forEach((shift, index) => {
        const startDate = moment(shift.from_date);
        const endDate = moment(shift.to_date);

        const getWeekdaysBetweenDates = (start, end) => {
          const dates = [];
          let currentDate = moment(start);

          while (currentDate.isSameOrBefore(end, "day")) {
            const dayOfWeek = currentDate.isoWeekday();
            if (dayOfWeek <= 5) {
              dates.push(currentDate.format("YYYY-MM-DD"));
            }
            currentDate.add(1, "day");
          }
          return dates;
        };

        const weekdays = getWeekdaysBetweenDates(startDate, endDate);
        const userDetails = {
          userId: user.userId,
          userDesignation: user.userDesignation,
          profileImage: user.profileImage,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        if (weekdays.length === 1) {
          newItems.push({
            id: parseInt(`${user.userId}${index}`),
            group: user.userId,
            userDesignation: user.userDesignation,
            profileImage: user.profileImage,
            firstName: user.firstName,
            lastName: user.lastName,
            userDetails,
            title: shift.shifts,
            time: shift.is_full_day ? "9:00am - 6:00pm" : "9:00am - 12:00pm",
            start_time: moment(startDate).startOf("day").add(1, "hour"),
            end_time: moment(endDate).endOf("day").subtract(1, "hour"),
            original_data: shift,
          });
        } else {
          weekdays.forEach((date, subIndex) => {
            newItems.push({
              id: parseInt(`${user.userId}${index}${subIndex}`),
              group: user.userId,
              userDesignation: user.userDesignation,
              profileImage: user.profileImage,
              firstName: user.firstName,
              lastName: user.lastName,
              userDetails,
              title: shift.shifts,
              time: shift.is_full_day ? "9:00am - 6:00pm" : "9:00am - 12:00pm",
              start_time: moment(date).startOf("day").add(1, "hour"),
              end_time: moment(date).endOf("day").subtract(1, "hour"),
              original_data: shift,
            });
          });
        }
      });
    });

    return { groups: newGroups, items: newItems };
  }, [shiftReduxData]);

  // Memoized render shift content function
  const renderShiftContent = useCallback((data) => {
    const shiftType = data?.shifts?.toLowerCase();

    switch (shiftType) {
      case "leave":
        return (
          <div className="flex h-full w-full items-center justify-center rounded border border-[#FEE4DB] bg-[#FCF5F5] text-sm font-semibold leading-[100%] tracking-[0%] text-[#FF845C]">
            <div>Leave</div>
          </div>
        );

      case "office":
        return (
          <div className="flex h-full w-full flex-col justify-center rounded border border-[#CAF1DC] bg-[#EBF5EF] px-1 leading-[100%] tracking-[0%] text-[#40A266] min-[1400px]:px-2">
            <div className="text-sm font-semibold">Office</div>
            <div className="text-xs font-normal">
              {data?.is_full_day ? "9:00am-6:00pm" : "9:00am-1:00pm"}
            </div>
          </div>
        );

      case "holiday":
        const formattedDate = moment(data?.from_date).format("DD MMM");
        return (
          <div className="relative flex h-full w-full flex-col items-start justify-center pl-4">
            <div className="absolute bottom-0 left-2 top-0 my-1 w-1 rounded bg-[#9F9F9F]"></div>
            <p className="pl-2 text-sm font-semibold text-[#9F9F9F]">
              {data?.shifts}
            </p>
            <p className="pl-2 text-xs font-normal text-[#9F9F9F]">
              {formattedDate}
            </p>
          </div>
        );

      default:
        return (
          <div className="flex h-full w-full flex-col justify-center rounded border border-[#D65594] bg-[#F6EDF2] px-1 leading-[100%] tracking-[0%] text-[#D65594] min-[1400px]:px-2">
            <div className="text-sm font-semibold">{data?.shifts}</div>
            <div className="text-xs font-normal">
              {data?.is_full_day ? "9:00am-6:00pm" : "9:00am-1:00pm"}
            </div>
          </div>
        );
    }
  }, []);

  // Memoized event handlers
  const editToggleHandler = useCallback((edit_data) => {
    setEditShiftData(edit_data);
    setEditToggle((prev) => !prev);
  }, []);

  const filterSubmitHandler = useCallback(
    (filterValue) => {
      navigate(
        `/shifts/?filter_applied=true&employment_type=${
          filterValue?.employment_type
        }&department_type=${filterValue?.department_type}&role_type=${
          filterValue?.role_type
        }&user_type=${encodeURIComponent(filterValue?.user_type)}`,
      );
      setFilterToggle((prev) => !prev);
    },
    [navigate],
  );

  const removeFilterHandler = useCallback(() => {
    dispatch(
      setEmployeeDropDownFilterValue({
        id: "all",
        name: "All",
        profileImage: "",
        userDesignation: "All",
      }),
    );
    navigate(`/shifts`);
  }, [dispatch, navigate]);

  // Optimized intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          paginationRedux?.hasNextPage &&
          !loader &&
          !isLoadingRef.current
        ) {
          fetchGetShiftsData(startDate, endDate, true);
        }
      },
      {
        threshold: 1.0,
        rootMargin: "10px",
      },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [
    paginationRedux?.hasNextPage,
    loader,
    startDate,
    endDate,
    fetchGetShiftsData,
  ]);

  // Memoized skeleton loader
  const skeletonLoader = useMemo(
    () => (
      <div className="w-full">
        {Array(5)
          .fill({})
          .map((_, index) => (
            <div key={index} className="flex w-full border-b border-[#E1DCFF]">
              <div className="flex w-[20%] items-center gap-2 border-r border-[#E1DCFF] p-2">
                <div className="max-h-8 min-h-8 min-w-8 max-w-8 rounded-full">
                  <Skeleton
                    baseColor="#E0E0E0"
                    highlightColor="#C8C8C8"
                    width="32px"
                    height="32px"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <Skeleton
                    baseColor="#E0E0E0"
                    highlightColor="#C8C8C8"
                    width="100px"
                    height="20px"
                    className="rounded-full"
                  />
                  <Skeleton
                    baseColor="#E0E0E0"
                    highlightColor="#C8C8C8"
                    width="140px"
                    height="10px"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex w-[80%]">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 border-r border-[#E1DCFF] p-2 ${
                      i === 6 ? "border-r-0" : ""
                    }`}
                  >
                    <Skeleton
                      baseColor="#E0E0E0"
                      highlightColor="#C8C8C8"
                      width="100%"
                      height="46px"
                      className="rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    ),
    [],
  );

  // Memoized timeline rows to prevent unnecessary re-renders
  const timelineRows = useMemo(() => {
    if (!groups.length) return null;

    return groups.map((group) => (
      <TimelineRow
        key={group.id}
        group={group}
        items={items}
        startDate={startDate}
        renderShiftContent={renderShiftContent}
        editToggleHandler={editToggleHandler}
      />
    ));
  }, [groups, items, startDate, renderShiftContent, editToggleHandler]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-[#E1DCFF] bg-[#F8F7FC] px-6 py-4">
        <div className="relative">
          <PerformanceCustomDateDropdown
            datesOptions={["This week", "Last week"]}
            defaultSelectDate={"This week"}
            onChangeDatehandler={onChangeDatehandler}
          />
        </div>
        <div className="relative flex gap-4">
          <button
            onClick={() => setFilterToggle((prev) => !prev)}
            className="flex h-8 items-center gap-2 rounded border border-[#DCD6FF] bg-white px-4 text-sm font-semibold leading-4 tracking-wider text-[#260B6A]"
          >
            <img
              src={
                config.PUBLIC_URL +
                "/assets/images/amdital/contracts/filter.svg"
              }
              alt=""
              className="h-[14px] w-4"
            />
            Filter
          </button>
          <button
            onClick={() => setAddShiftPopUp((prev) => !prev)}
            className="flex h-8 items-center gap-2 rounded bg-[#FF845C] px-4 text-sm font-semibold leading-4 tracking-wider text-white hover:bg-[#F36A3D]"
          >
            Shift
          </button>
        </div>
      </div>

      {/* {filterValue && (
        <RemoveFilterCompontent
          filterParameter={filterValue}
          removeFilterHandler={removeFilterHandler}
        />
      )} */}

      <div className="schedule mt-4 min-h-screen bg-white">
        <div className="timeline-container w-full border border-[#E1DCFF]">
          <ShiftTimelineHeader startDate={startDate} endDate={endDate} />

          {loader ? (
            skeletonLoader
          ) : groups?.length > 0 ? (
            <div>
              {timelineRows}
              {paginationRedux?.hasNextPage && (
                <div
                  ref={observerRef}
                  className="flex h-12 items-center justify-center"
                >
                  {loader && <span className="hidden">Loading more...</span>}
                </div>
              )}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center py-4 text-base font-normal leading-[100%] tracking-[0%]">
              No results found
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* {addShiftPopUp && (
        <Modal
          onClose={() => setAddShiftPopUp(false)}
          component={
            <AddShift
              onCloseHandler={() => setAddShiftPopUp(false)}
              fetchHandler={silentCallShiftsData}
            />
          }
        />
      )} */}

      {/* {editToggle && (
        <Modal
          onClose={() => editToggleHandler({})}
          component={
            <EditShift
              onCloseHandler={() => editToggleHandler({})}
              fetchHandler={silentCallShiftsData}
              editData={editShiftData}
            />
          }
        />
      )} */}

      {filterToggle && (
        <>
          {/* <div className="fixed right-0 top-0 z-[1100] h-full overflow-y-scroll border-l border-[#DCD6FF] bg-[#FFFFFF] p-4 lg:w-[300px]">
            <ShiftFilterCompontent
              onClose={() => setFilterToggle(false)}
              departmentDropdown={true}
              roleDropdown={true}
              employmentTypeDropdown={true}
              filterSubmitHandler={filterSubmitHandler}
            />
          </div> */}
          <div
            className="fixed inset-0 z-[1000] h-full w-full opacity-70"
            onClick={() => {
              setFilterToggle(false);
              dispatch(
                setEmployeeDropDownFilterValue({
                  id: "all",
                  name: "All",
                  profileImage: "",
                  userDesignation: "All",
                }),
              );
            }}
          />
        </>
      )}
    </>
  );
};

// Memoized Timeline Row Component
const TimelineRow = React.memo(
  ({ group, items, startDate, renderShiftContent, editToggleHandler }) => {
    const days = useMemo(() => {
      return Array.from({ length: 7 }, (_, i) => {
        const date = moment(startDate).clone().add(i, "days");
        const item = items.find(
          (item) =>
            item.group === group.id &&
            moment(item.start_time).isSame(date, "day"),
        );
        const isWeekend = date.isoWeekday() >= 6;

        return { date, item, isWeekend, index: i };
      });
    }, [startDate, items, group.id]);

    return (
      <div className="timeline-row flex h-[62px] w-full border-b border-[#E1DCFF]">
        <div className="member-cell flex w-[20%] min-w-[200px] max-w-[280px] flex-1 items-center border-r border-[#E1DCFF] p-2.5 pl-6">
          {group.profileImg ? (
            <img
              src={group.profileImg}
              alt={`${group.title}'s profile`}
              className="mr-2.5 h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div
              className="avatar mr-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white"
              style={{ backgroundColor: "#806BFF" }}
            >
              {group.first_letter}
            </div>
          )}
          <div>
            <p className="name m-0 text-sm font-semibold text-[#26212E]">
              {group.title}
            </p>
            <p className="job-title text-sm font-normal text-[#26212E]">
              {group.jobTitle}
            </p>
          </div>
        </div>

        {days.map(({ item, isWeekend, index }) => (
          <div
            key={index}
            className={`schedule-cell flex-1 border-r border-[#E1DCFF] p-2 ${
              index === 6 ? "border-r-0" : ""
            } max-w-[14%]`}
          >
            {isWeekend ? (
              <div className="h-[46px] w-full rounded bg-[#F3F2F7]" />
            ) : item ? (
              <div
                onClick={() =>
                  editToggleHandler({
                    shiftDetails: item?.original_data,
                    userDetails: item?.userDetails,
                  })
                }
                className="relative h-[46px] w-full cursor-pointer rounded"
              >
                {renderShiftContent(item?.original_data)}
              </div>
            ) : (
              <div className="h-full"></div>
            )}
          </div>
        ))}
      </div>
    );
  },
);

// Reusable Modal Component
const Modal = React.memo(({ onClose, component }) => (
  <div className="fixed left-0 top-0 z-[1100] flex h-full w-full items-center justify-center">
    <div className="z-[1100] h-fit rounded-lg">{component}</div>
    <div
      className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] opacity-[70%]"
      onClick={onClose}
    />
  </div>
));

export default ShiftNew;
