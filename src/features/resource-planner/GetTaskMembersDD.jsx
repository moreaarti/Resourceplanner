import React, { useState, useEffect, useRef } from "react";

export default function GetTaskMembersDDcompo({
  labelName = "Task Members",
  wrapperClass,
  selectPlaceholder,
  searchPlaceholder,
  memberHandler,
  labelRequired = true,
  required = false,
  selectedTask, // This should be full task object received from GetTasksListDD
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [membersList, setMembersList] = useState([]);

  const dropdownRef = useRef(null);
  const dropdownHeight = 270;

  useEffect(() => {
    if (selectedTask) {
      const members =
        selectedTask?.taskFields?.relatedProject?.nodes?.[0]?.projectFields
          ?.projectMembers?.nodes || [];

      setMembersList(members);
    }
  }, [selectedTask]);

  const filteredList = membersList.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    return fullName.includes(searchValue.toLowerCase());
  });

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
          <div className="flex items-center gap-2 truncate">
            {selectedValue?.profileImage && (
              <img
                src={selectedValue?.profileImage}
                alt="profile"
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span>{`${selectedValue?.firstName} ${selectedValue?.lastName}`}</span>
          </div>
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
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="max-h-[200px] overflow-y-auto">
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <div
                  key={item.userId}
                  onClick={() => {
                    setSelectedValue(item);
                    memberHandler(item);
                    setDropdownOpen(false);
                  }}
                  className={`flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-[#E1DCFF] ${
                    selectedValue?.userId === item.userId ? "bg-[#E1DCFF]" : ""
                  }`}
                >
                  {item.profileImage ? (
                    <img
                      src={item.profileImage}
                      alt="profile"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DCD6FF] text-sm">
                      {item.firstName?.[0]}
                    </div>
                  )}
                  <span>{`${item.firstName} ${item.lastName}`}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No Members Found</div>
            )}
          </div>
        </div>
      )}

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}
