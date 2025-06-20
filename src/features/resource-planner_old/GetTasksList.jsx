import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTasksListforDD } from "./resourcesPlannerApi";
import {
  setresourcesPlannerHasNextListView,
  setresourcesPlannerListView,
  setresourcesPlannerListViewPagination,
} from "./resourcesPlannerSlice";

export default function GetTasksListDD({
  labelName = "Tasks",
  wrapperClass,
  selectPlaceholder,
  searchPlaceholder,
  taskHandler,
  labelRequired = true,
  required = false,
  projectId,
}) {
  console.log("projectList in", projectId);
  const dispatch = useDispatch();
  const { resourcesPlanner_list, resourcesPlanner_list_pagination } =
    useSelector((state) => state.resourcesPlanner);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownHeight = 270;

  useEffect(() => {
    if (projectId) {
      loadInitialData();
    } else {
      // Clear dropdown when no project selected
      dispatch(setresourcesPlannerListView([]));
      setSelectedValue(null);
    }
  }, [projectId]);

  const loadInitialData = async () => {
    const res = await getTasksListforDD("", 10, "", projectId);
    console.log("loadInitialData res", res);
    dispatch(setresourcesPlannerListView(res.nodes));
    dispatch(setresourcesPlannerListViewPagination(res.pageInfo));
  };

  const searchHandler = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const res = await getTasksListforDD(value, 10, "", projectId);
    console.log("res getTasksListforDD", res);
    dispatch(setresourcesPlannerListView(res.nodes));
    dispatch(setresourcesPlannerListViewPagination(res.pageInfo));
  };

  const loadMoreHandler = async () => {
    setLoadMore(true);
    const res = await getTasksListforDD(
      searchValue,
      10,
      resourcesPlanner_list_pagination?.endCursor,
      projectId,
    );
    dispatch(setresourcesPlannerHasNextListView(res.nodes));
    dispatch(setresourcesPlannerListViewPagination(res.pageInfo));
    setLoadMore(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col gap-2 text-sm font-medium leading-6 text-[#26212E]"
    >
      {labelRequired && (
        <div className="-mt-1">
          {labelName}
          {/* {required && <span className="text-[#EA4242]">*</span>} */}
        </div>
      )}

      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={`${
          dropdownOpen ? "border-2 border-[#806BFF]" : "border-[#DCD6FF]"
        } relative -mt-1 flex h-10 w-full cursor-pointer items-center justify-between rounded border bg-[#F8F7FC] px-2 ${
          wrapperClass || ""
        }`}
      >
        {selectedValue ? (
          <div className="truncate">{selectedValue?.title}</div>
        ) : (
          <div className="truncate text-[#9F9F9F]">
            {selectPlaceholder || "Select " + labelName}
          </div>
        )}
        <span
          className={`transform transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {dropdownOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg"
          style={{ maxHeight: dropdownHeight }}
        >
          <div className="p-3">
            <input
              type="text"
              placeholder={searchPlaceholder || "Search " + labelName}
              className="w-full rounded border border-[#E1DCFF] px-3 py-2 outline-none"
              value={searchValue}
              onChange={searchHandler}
            />
          </div>

          <div className="max-h-[200px] overflow-y-auto">
            {resourcesPlanner_list?.length > 0 ? (
              resourcesPlanner_list.map((item) => (
                <div
                  key={item.projectTaskId}
                  onClick={() => {
                    setSelectedValue(item);
                    taskHandler(item);
                    setDropdownOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 hover:bg-[#E1DCFF] ${
                    selectedValue?.projectTaskId === item.projectTaskId
                      ? "bg-[#E1DCFF]"
                      : ""
                  }`}
                >
                  {item.title}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No Tasks Found</div>
            )}

            {resourcesPlanner_list_pagination?.hasNextPage && (
              <div className="flex justify-center py-2">
                {loadMore ? (
                  <div className="text-[#806BFF]">Loading...</div>
                ) : (
                  <button
                    className="text-[#806BFF] hover:underline"
                    onClick={loadMoreHandler}
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {dropdownOpen && (
        <div
          className="absolute bottom-full left-0 z-50 mb-1 w-full rounded border border-gray-300 bg-white shadow-lg"
          style={{ maxHeight: dropdownHeight }}
          // className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
      {/*

{dropdownOpen && (
  <div
    className="absolute left-0 bottom-full z-50 mb-1 w-full rounded border border-gray-300 bg-white shadow-lg"
    style={{ maxHeight: dropdownHeight }}
  > */}
    </div>
  );
}
