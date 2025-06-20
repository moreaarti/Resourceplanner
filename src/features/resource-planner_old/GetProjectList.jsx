import React, { useState, useEffect, useRef } from "react";
import { getProjectsListforDD } from "./resourcesPlannerApi";

export default function GetProjectListDD({
  labelName = "Select Projects",
  wrapperClass,
  selectPlaceholder,
  searchPlaceholder,
  projectHandler,
  labelRequired = true,
  required = false,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [loadMore, setLoadMore] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownHeight = 270;

  useEffect(() => {
    loadInitialProjects();
  }, []);

  const loadInitialProjects = async () => {
    const res = await getProjectsListforDD("", 10, "");
    setProjectsList(res?.nodes || []);
    setPaginationInfo(res?.pageInfo || {});
  };

  const searchHandler = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const res = await getProjectsListforDD(value, 10, "");
    setProjectsList(res?.nodes || []);
    setPaginationInfo(res?.pageInfo || {});
  };

  const loadMoreHandler = async () => {
    setLoadMore(true);
    const res = await getProjectsListforDD(
      searchValue,
      10,
      paginationInfo?.endCursor,
    );
    setProjectsList((prev) => [...prev, ...(res?.nodes || [])]);
    setPaginationInfo(res?.pageInfo || {});
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
          {required && <span className="text-[#EA4242]">*</span>}
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
            {projectsList?.length > 0 ? (
              projectsList.map((item) => (
                <div
                  key={item.projectId}
                  onClick={() => {
                    setSelectedValue(item);
                    projectHandler(item);
                    setDropdownOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 hover:bg-[#E1DCFF] ${
                    selectedValue?.projectId === item.projectId
                      ? "bg-[#E1DCFF]"
                      : ""
                  }`}
                >
                  {item.title}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No Projects Found</div>
            )}

            {paginationInfo?.hasNextPage && (
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
    </div>
  );
}
