import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "./fetchEmployees";
import config from "../../../config/config";

const EmployeeDropdown = ({ onSelect, labelName, selectedValue }) => {

  const user_deatils = useSelector(store=>store?.auth?.api_call_company_details);
  const companyId = user_deatils?.companyId;


  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState(null);
  // Local state to hold the full employee object of the selected employee
  const [localSelectedEmployee, setLocalSelectedEmployee] = useState(null);

  const dispatch = useDispatch();
  const { employees, pageInfo, loading } = useSelector((state) => state.employees);
  const allEmployees = useSelector((state) => state.employees.employees);

  // When the selectedValue prop or the Redux employee list changes,
  // update the local selected employee if a match is found.
  useEffect(() => {
    if (selectedValue && selectedValue !== "all") {
      const foundEmployee = allEmployees.find(emp => emp.userId === selectedValue);
      // Only update if we found a match; otherwise, keep local state (if already set)
      if (foundEmployee) {
        setLocalSelectedEmployee(foundEmployee);
      }
    }
  }, [selectedValue, allEmployees]);

  // Debounce helper to reduce API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchEmployeesDebounced = useCallback(
    debounce((query, cursor) => {
      dispatch(fetchEmployees({ first: 10, search: query, after: cursor ,companyId}));
    }, 300),
    [dispatch]
  );

  // Fetch employees on initial load, on search change, or when loading more (cursor changes)
  useEffect(() => {
    fetchEmployeesDebounced(searchQuery, cursor,companyId);
  }, [searchQuery, cursor, fetchEmployeesDebounced]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCursor(null); // Reset cursor on new search
  };

  // Use the local selected employee if available; otherwise, try finding one from Redux
  const displayEmployee =
    localSelectedEmployee || allEmployees.find((emp) => emp.userId === selectedValue);

  const filteredEmployees = useMemo(() => {
    const list = [
      { userId: "all",email:"All", firstName: "All", userDesignation: "", profileImage: null },
      ...(displayEmployee ? [displayEmployee] : []),
      ...(employees || [])
    ];
    // Remove duplicates based on userId
    return list.filter((emp, index, self) =>
      index === self.findIndex(e => e.userId === emp.userId)
    );
  }, [employees, displayEmployee]);

  const handleSelect = (employee) => {
    setLocalSelectedEmployee(employee);
    onSelect(employee);
    setIsOpen(false);
  };

  const handleLoadMore = () => {
    if (pageInfo?.hasNextPage) {
      setCursor(pageInfo.endCursor);
    }
  };

  return (
    <div className="relative w-full">
      <label className="mb-2 mt-4 block text-sm text-[#26212E]">
        {labelName || "Employee"}
      </label>
      <div
        className="flex cursor-pointer items-center justify-between rounded-md border border-[#DCD6FF] bg-white px-4 py-2 shadow-sm"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div>
          {displayEmployee && displayEmployee.userId !== "all" ? (
            <div className="flex items-center space-x-2">
              {displayEmployee.profileImage ? (
                <img
                  src={displayEmployee.profileImage}
                  alt={displayEmployee.firstName || ""}
                  className="h-8 w-8 rounded-full"
                />
              ):
             ( <div className="w-9 h-9 bg-[#806BFF] text-white font-semibold flex justify-center items-center rounded-full uppercase">{displayEmployee?.firstName[0]}</div>)}
              <div className="flex flex-col">
                <span className="text-sm capitalize text-[#26212E]">
                  {displayEmployee.firstName || "N/A"} {displayEmployee.lastName || ""}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-sm text-[#26212E]">All</span>
          )}
        </div>
        <img
          src={config.PUBLIC_URL + "/assets/images/amdital/down_arrow.svg"}
          alt="arrow"
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

  

      {isOpen && (
        <>
        <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          <div className="relative p-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-md border px-4 pr-8 py-2 text-sm outline-none"
            />
            <div className="absolute right-5 top-5">
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/search_gray_color.svg"}
                alt="searchnew"
              />
            </div>
          </div>
          <ul>
            {filteredEmployees.length < 2 ? (
              <li className="px-4 py-2 text-sm text-[#26212E]">No results found</li>
            ) : (
              filteredEmployees.map(employee => (
                <li
                  key={employee.userId}
                  className={`flex cursor-pointer items-center space-x-2 px-4 py-2 text-sm text-[#26212E] hover:bg-[#E1DCFF] ${
                    displayEmployee && displayEmployee.userId === employee.userId ? "bg-[#E1DCFF]" : ""
                  }`}
                  onClick={() => handleSelect(employee)}
                >
                  {employee.profileImage ? (
                    <img
                      src={employee.profileImage}
                      alt={employee.firstName}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    employee.firstName !== "All" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#806BFF] text-white">
                        <p className="capitalize">{employee.firstName?.trim()?.[0] || ""}</p>
                      </div>
                    )
                  )}
                  <div>
                    <p className="text-xs font-semibold capitalize text-[#26212E]">
                      {employee.firstName === "All"
                        ? employee.firstName
                        : `${employee.firstName} ${employee.lastName}`}
                    </p>
                    {employee.firstName !== "All" && (
                      <p className="text-xs capitalize text-[#26212E]">
                        {employee.userDesignation || "Designation"}
                      </p>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
          {pageInfo?.hasNextPage && (
            <button
              className="w-full py-2 text-center text-sm text-[#806BFF] hover:underline"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
        <div className="fixed top-0  w-screen h-screen z-10 " onClick={()=>setIsOpen(false)}>
      
        </div>
        </>

      )}
       
    
    </div>
    
  );
};

export default EmployeeDropdown;
