import config from "../../config/config";


const groupRender = ({ group }) => {
  // console.log(group);
  return (
    <div className="flex items-center gap-[14px]">
      <div className="-rotate-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M10.99 1.29932L5.98999 6.29932L0.98999 1.29932"
            stroke="#260B6A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="w-10 h-10 flex-shrink-0">
        <img src={config.PUBLIC_URL + "/assets/images/amdital/timeline_profile_fall_back.svg"} alt="" className="rounded-full" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#26212E] ">{group.title}</p>
        <p className="text-sm font-normal text-[#26212E]">
          {group.designation}
        </p>
      </div>
    </div>
  );
};

export default groupRender;
