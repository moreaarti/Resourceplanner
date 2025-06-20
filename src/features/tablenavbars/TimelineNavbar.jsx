import {useState} from 'react'
import config from '../../config/config'
import FilterComponentNew from '../timeline/TimelineSidebar';

export default function TimelineNavbar(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 md:gap-0 md:flex-nowrap h-[66px] w-full bg-[#F8F7FC] py-4 px-10 border-b border-[#E1DCFF] ">
        {/* Left Section: Timeline Name and Navigation Arrows */}
        <div className="flex items-center space-x-4">
          {/* <h1 className="text-2xl font-semibold text-gray-800">Timeline</h1> */}
          <div className="flex space-x-2">
            <div className=" min-h-8 max-h-8 flex items-center">
              <button
                onClick={()=>{props?.handleNavigateLeft()}}
                className="bg-white h-8 px-3 rounded-l-md border border-[#DCD6FF]"
              >
                <img src={config.PUBLIC_URL + "/assets/images/amdital/timeline_leftarrow.svg"} alt="" />
              </button>

              <button
                onClick={()=>{props?.handleNavigateRight()}}
                className="bg-white h-8 px-3 rounded-r-md  border border-[#DCD6FF]"
              >
                <img src={config.PUBLIC_URL + "/assets/images/amdital/timeline_rightarroww.svg"} alt="" />
              </button>
            </div>
            <button
              onClick={()=>{props?.handleNavigateToday()}}
              className="text-[#260B6A] h-8 bg-white px-4 font-semibold text-sm rounded border border-[#DCD6FF]"
            >
              Today
            </button>
          </div>
        </div>

        {/* Right Section: Filter Buttons and Create Assignment */}
        <div className="flex items-center space-x-4">
          {/* <div className="flex space-x-2">
          <button
            onClick={() => handleFilterChange("hourly")}
            className={`px-4 py-2 rounded-l ${
              filter === "hourly" ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
          >
            H
          </button>
          <button
            onClick={() => handleFilterChange("weekly")}
            className={`px-4 py-2 ${
              filter === "weekly" ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
          >
            W
          </button>
          <button
            onClick={() => handleFilterChange("monthly")}
            className={`px-4 py-2 rounded-r ${
              filter === "monthly"
                ? "bg-orange-500 text-white"
                : "bg-gray-200"
            }`}
          >
            M
          </button>
        </div> */}
<div>
          <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className=" h-8 flex items-center text-[#260B6A] font-semibold text-sm bg-white px-4 py-2 rounded border border-[#DCD6FF]"
          >
            {/* Image on the left side */}
            <img
              src={config.PUBLIC_URL + "/assets/images/amdital/timeline_filter.svg"} // Replace with your image URL
              alt="Filter Icon"
              className="mr-2" // Adjust size of the image and margin-right for spacing
              
            />
            Filter
          </button>
          {isFilterOpen && <FilterComponentNew />} 
          </div>

          <button
            onClick={()=>{props?.handleAddAssignment()}}
            className="bg-[#FF845C] h-8 text-white px-4 py-2 f  rounded flex justify-center items-center text-sm font-semibold leading-4 tracking-[0.8px] "
          >
            Create Assignment
          </button>
        </div>
      </div>
  )
}