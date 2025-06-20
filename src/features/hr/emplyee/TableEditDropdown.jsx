import React, { useState, useCallback, useRef, useEffect } from "react";

const MemberCellRendererDropDown = ({
  row,
  selectedMembers: initialSelectedMembers = [],
  onMemberSelect,
  boardCard
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    placement: "top",
  });
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0, // For dropdown width
    placement: "bottom",
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(initialSelectedMembers);

  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const dropdownRef = useRef(null);

  const getInitial = (name) => name?.[0] || "";

  // Calculate tooltip position
  const calculateTooltipPosition = useCallback(() => {
    if (containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const placement =
        containerRect.top >= tooltipRect.height
          ? "top"
          : "bottom";

      const x = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
      const y =
        placement === "top"
          ? containerRect.top - tooltipRect.height - 8
          : containerRect.bottom + 8;

      setTooltipPosition({ x, y, placement });
    }
  }, []);

  // Calculate dropdown position
  const calculateDropdownPosition = useCallback(() => {
    if (containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const spaceAbove = containerRect.top;
      const spaceBelow = window.innerHeight - containerRect.bottom;

      const placement =
        spaceBelow >= dropdownRect.height || spaceAbove < dropdownRect.height
          ? "bottom"
          : "top";

      const x = containerRect.left;
      const y =
        placement === "top"
          ? containerRect.top - dropdownRect.height - 8
          : containerRect.bottom + 8;

      setDropdownPosition({
        x,
        y,
        width: containerRect.width, // Match dropdown width with parent
        placement,
      });
    }
  }, []);

  useEffect(() => {
    if (showTooltip) calculateTooltipPosition();
    if (dropdownOpen) calculateDropdownPosition();

    const updatePositions = () => {
      if (showTooltip) calculateTooltipPosition();
      if (dropdownOpen) calculateDropdownPosition();
    };

    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [showTooltip, dropdownOpen, calculateTooltipPosition, calculateDropdownPosition]);

  const handleMemberSelect = (member, event) => {
    event.stopPropagation();
    const newSelectedMembers = selectedMembers.includes(member)
      ? selectedMembers.filter((m) => m !== member)
      : [...selectedMembers, member];

    setSelectedMembers(newSelectedMembers);
    onMemberSelect && onMemberSelect(newSelectedMembers);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
    setShowTooltip(false); // Hide tooltip when opening dropdown
  };

  const allMembers = row?.members || [];
  const otherMembers = allMembers.filter((member) => !selectedMembers.includes(member));
  const visibleMembers = selectedMembers.slice(0, 3);
  const remainingSelectedCount = Math.max(0, selectedMembers.length - 3);

  return (
    <>
          <div
      ref={containerRef}
      className={`relative inline-flex p-1 px-2 w-full min-h-[40px] rounded hover:border border-[#1C1C1C] ${
        dropdownOpen ? "border" : ""
      } cursor-pointer`}
      onClick={toggleDropdown}
      onMouseEnter={() => !dropdownOpen && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Visible Members */}
      <div className="flex items-center h-full">
        {visibleMembers.map((member, index) => (
          <div
            key={member}
            className={`w-7 h-7 rounded-full bg-green-100 flex items-center justify-center border border-green-300 text-xs font-medium ${
              index !== 0 ? "-ml-2" : ""
            } relative z-10 hover:z-20`}
          >
            {getInitial(member)}
          </div>
        ))}
        {remainingSelectedCount > 0 && (
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center border border-green-300 -ml-2 relative z-10 text-xs font-medium">
            +{remainingSelectedCount}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && !dropdownOpen && (
          <div
            ref={tooltipRef}
            className={`
              fixed bg-white shadow-lg rounded-md py-1
              border border-gray-200
              z-[9999]
              transition-opacity duration-150 ease-in-out
              text-sm
            `}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              opacity: showTooltip ? 1 : 0,
            }}
          >
            <div 
              className={`
                absolute w-3 h-3 bg-white border-t border-l border-gray-200
                transform rotate-45
                ${tooltipPosition.placement === 'top' ? 'bottom-[-6px] border-r border-b border-t-0 border-l-0' : 'top-[-6px]'}
              `}
              style={{
                left: '50%',
                marginLeft: '-6px',
              }}
            />
            
            <div className="relative bg-white rounded-md z-10">
              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className=" border-gray-100 pb-1">
                  {selectedMembers.map((member, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-0.5 whitespace-nowrap hover:bg-green-50 cursor-default"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999]"
          style={{
            left: `${dropdownPosition.x}px`,
            top: `${dropdownPosition.y}px`,
            width: boardCard? `  ` : `${dropdownPosition.width}px`,
          }}
        >
          <div className="max-h-[240px] overflow-y-auto scrollbar-thin custom-table">
            {selectedMembers.map((member, index) => (
              <label
                key={index}
                className="flex items-center px-3 py-2 hover:bg-green-50 cursor-pointer border-b"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={true}
                  onChange={(event) => handleMemberSelect(member, event)}
                  className="mr-2 h-5 w-5 text-green-600"
                />
                <span>{member}</span>
              </label>
            ))}

            {otherMembers.map((member, index) => (
              <label
                key={index}
                className="flex items-center px-3 py-2 hover:bg-green-50 cursor-pointer border-b"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={false}
                  onChange={(event) => handleMemberSelect(member, event)}
                  className="mr-2 h-5 w-5"
                />
                <span>{member}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
    {dropdownOpen && <div className=' fixed z-[1000] inset-0' onClick={()=>{setDropdownOpen(!dropdownOpen)}} ></div>}
    </>
  );
};

export default MemberCellRendererDropDown;
