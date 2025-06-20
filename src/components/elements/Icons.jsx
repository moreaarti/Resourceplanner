import React from "react";

const Icons = (props) => {
  let icon = null;
  switch (props.name) {
    // menu-icons

    case "overview":
      icon = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={props.sideBarIconClass}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 16.6667V8.33337"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 16.6667V3.33337"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 16.6666V11.6666"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
       
      );
      break;

    case "sites":
      icon = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={props.sideBarIconClass}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 7.5H17.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 17.5V7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
      
    case "Tags":
      icon = (
        <svg width="20" height="20" className={props.sideBarIconClass} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.1577 11.175L11.1827 17.15C11.0279 17.305 10.8441 17.4279 10.6417 17.5118C10.4394 17.5956 10.2225 17.6388 10.0035 17.6388C9.78449 17.6388 9.56761 17.5956 9.36528 17.5118C9.16295 17.4279 8.97914 17.305 8.82435 17.15L1.66602 9.99999V1.66666H9.99935L17.1577 8.82499C17.4681 9.13726 17.6423 9.55968 17.6423 9.99999C17.6423 10.4403 17.4681 10.8627 17.1577 11.175Z"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.83398 5.83334H5.84398"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
      break;

    case "clients":
        icon = (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={props.sideBarIconClass} xmlns="http://www.w3.org/2000/svg">
<path d="M16.6673 17.5V15.8333C16.6673 14.9493 16.3161 14.1014 15.691 13.4763C15.0659 12.8512 14.218 12.5 13.334 12.5H6.66732C5.78326 12.5 4.93542 12.8512 4.31029 13.4763C3.68517 14.1014 3.33398 14.9493 3.33398 15.8333V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        );
        break;

    case "team":
        icon = (
          <svg width="20" height="20" className={props.sideBarIconClass} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3206_15233)">
          <path d="M14.1673 17.5V15.8333C14.1673 14.9493 13.8161 14.1014 13.191 13.4763C12.5659 12.8512 11.718 12.5 10.834 12.5H4.16732C3.28326 12.5 2.43542 12.8512 1.8103 13.4763C1.18517 14.1014 0.833984 14.9493 0.833984 15.8333V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.49935 9.16667C9.3403 9.16667 10.8327 7.67428 10.8327 5.83333C10.8327 3.99238 9.3403 2.5 7.49935 2.5C5.6584 2.5 4.16602 3.99238 4.16602 5.83333C4.16602 7.67428 5.6584 9.16667 7.49935 9.16667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.166 17.5V15.8333C19.1655 15.0948 18.9196 14.3773 18.4672 13.7936C18.0147 13.2099 17.3811 12.793 16.666 12.6083" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.334 2.60834C14.051 2.79192 14.6865 3.20892 15.1403 3.7936C15.5942 4.37827 15.8405 5.09736 15.8405 5.8375C15.8405 6.57765 15.5942 7.29674 15.1403 7.88141C14.6865 8.46609 14.051 8.88309 13.334 9.06667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_3206_15233">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        );
        break;

    case "project":
        icon = (
          <svg width="20" height="20" viewBox="0 0 20 20" className={props.sideBarIconClass} fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3327 10H13.3327L11.666 12.5H8.33268L6.66601 10H1.66602" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.54101 4.2585L1.66602 10.0002V15.0002C1.66602 15.4422 1.84161 15.8661 2.15417 16.1787C2.46673 16.4912 2.89065 16.6668 3.33268 16.6668H16.666C17.108 16.6668 17.532 16.4912 17.8445 16.1787C18.1571 15.8661 18.3327 15.4422 18.3327 15.0002V10.0002L15.4577 4.2585C15.3197 3.98082 15.107 3.74714 14.8435 3.58373C14.58 3.42032 14.2761 3.33366 13.966 3.3335H6.03268C5.72261 3.33366 5.41874 3.42032 5.15522 3.58373C4.8917 3.74714 4.679 3.98082 4.54101 4.2585Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        );
        break;

    case "support":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20"  className={props.sideBarIconClass} fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 17H13.8889C15.608 17 17 16.1745 17 14.6789V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 8C16.7075 7.99957 17.3924 8.21238 17.9335 8.60079C18.4746 8.98919 18.8371 9.52815 18.9568 10.1223C19.0765 10.7165 18.9457 11.3276 18.5875 11.8475C18.2294 12.3675 17.667 12.7627 16.9998 12.9633C16.8868 12.9975 16.7658 13.008 16.647 12.994C16.5282 12.98 16.4151 12.942 16.3172 12.883C16.2192 12.8241 16.1393 12.746 16.0841 12.6553C16.0289 12.5646 16.0001 12.4639 16 12.3617V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 8C3.29248 7.99957 2.60759 8.21238 2.06648 8.60079C1.52536 8.98919 1.1629 9.52815 1.04321 10.1223C0.923525 10.7165 1.05432 11.3276 1.41247 11.8475C1.77061 12.3675 2.33302 12.7627 3.00021 12.9633C3.11323 12.9975 3.23422 13.008 3.353 12.994C3.47178 12.98 3.5849 12.942 3.68285 12.883C3.7808 12.8241 3.86072 12.746 3.91591 12.6553C3.97109 12.5646 3.99993 12.4639 4 12.3617V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 8V6.52632C16 5.06065 15.3679 3.65501 14.2426 2.61862C13.1174 1.58224 11.5913 1 10 1C8.4087 1 6.88258 1.58224 5.75736 2.61862C4.63214 3.65501 4 5.06065 4 6.52632V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.72727 17H12.6364C12.7328 17 12.8253 17.0263 12.8935 17.0732C12.9617 17.1201 13 17.1837 13 17.25V17.75C13 17.8163 12.9617 17.8799 12.8935 17.9268C12.8253 17.9737 12.7328 18 12.6364 18H9.72727C9.53439 18 9.3494 17.9473 9.21301 17.8536C9.07662 17.7598 9 17.6326 9 17.5C9 17.3674 9.07662 17.2402 9.21301 17.1464C9.3494 17.0527 9.53439 17 9.72727 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
      break;

    case "setting":
      icon = (
        <svg width="20" height="20" className={props.sideBarIconClass} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_6278_1054)">
          <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" strokeWidth="1.5"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.1673 12.4987C16.0564 12.75 16.0233 13.0289 16.0723 13.2992C16.1213 13.5695 16.2502 13.819 16.4423 14.0154L16.4923 14.0654C16.6473 14.2202 16.7702 14.404 16.8541 14.6063C16.938 14.8086 16.9811 15.0255 16.9811 15.2445C16.9811 15.4636 16.938 15.6804 16.8541 15.8828C16.7702 16.0851 16.6473 16.2689 16.4923 16.4237C16.3375 16.5787 16.1537 16.7016 15.9514 16.7855C15.7491 16.8693 15.5322 16.9125 15.3132 16.9125C15.0941 16.9125 14.8772 16.8693 14.6749 16.7855C14.4726 16.7016 14.2888 16.5787 14.134 16.4237L14.084 16.3737C13.8876 16.1816 13.6381 16.0527 13.3678 16.0037C13.0975 15.9547 12.8187 15.9878 12.5673 16.0987C12.3208 16.2043 12.1106 16.3797 11.9626 16.6033C11.8145 16.8269 11.7351 17.0889 11.734 17.357V17.4987C11.734 17.9407 11.5584 18.3646 11.2458 18.6772C10.9333 18.9898 10.5093 19.1654 10.0673 19.1654C9.62529 19.1654 9.20137 18.9898 8.88881 18.6772C8.57625 18.3646 8.40065 17.9407 8.40065 17.4987V17.4237C8.3942 17.1479 8.30492 16.8804 8.14441 16.6559C7.9839 16.4315 7.7596 16.2606 7.50065 16.1654C7.2493 16.0544 6.97049 16.0213 6.70016 16.0704C6.42983 16.1194 6.18038 16.2483 5.98398 16.4404L5.93398 16.4904C5.7792 16.6453 5.59538 16.7683 5.39305 16.8521C5.19072 16.936 4.97384 16.9792 4.75482 16.9792C4.53579 16.9792 4.31891 16.936 4.11658 16.8521C3.91425 16.7683 3.73044 16.6453 3.57565 16.4904C3.42069 16.3356 3.29776 16.1518 3.21388 15.9494C3.13001 15.7471 3.08684 15.5302 3.08684 15.3112C3.08684 15.0922 3.13001 14.8753 3.21388 14.673C3.29776 14.4706 3.42069 14.2868 3.57565 14.132L3.62565 14.082C3.81777 13.8856 3.94664 13.6362 3.99565 13.3659C4.04467 13.0955 4.01158 12.8167 3.90065 12.5654C3.79502 12.3189 3.61961 12.1087 3.39604 11.9606C3.17246 11.8126 2.91047 11.7331 2.64232 11.732H2.50065C2.05862 11.732 1.6347 11.5564 1.32214 11.2439C1.00958 10.9313 0.833984 10.5074 0.833984 10.0654C0.833984 9.62334 1.00958 9.19941 1.32214 8.88685C1.6347 8.57429 2.05862 8.3987 2.50065 8.3987H2.57565C2.85148 8.39225 3.11899 8.30296 3.3434 8.14246C3.56781 7.98195 3.73875 7.75764 3.83398 7.4987C3.94491 7.24735 3.978 6.96854 3.92899 6.69821C3.87997 6.42788 3.7511 6.17843 3.55898 5.98203L3.50898 5.93203C3.35402 5.77724 3.23109 5.59343 3.14722 5.3911C3.06334 5.18877 3.02017 4.97189 3.02017 4.75286C3.02017 4.53384 3.06334 4.31696 3.14722 4.11463C3.23109 3.9123 3.35402 3.72849 3.50898 3.5737C3.66377 3.41874 3.84759 3.29581 4.04992 3.21193C4.25225 3.12806 4.46913 3.08489 4.68815 3.08489C4.90718 3.08489 5.12405 3.12806 5.32639 3.21193C5.52872 3.29581 5.71253 3.41874 5.86732 3.5737L5.91732 3.6237C6.11372 3.81581 6.36316 3.94469 6.63349 3.9937C6.90382 4.04272 7.18264 4.00963 7.43398 3.8987H7.50065C7.74713 3.79306 7.95733 3.61766 8.1054 3.39409C8.25346 3.17051 8.33292 2.90852 8.33398 2.64036V2.4987C8.33398 2.05667 8.50958 1.63275 8.82214 1.32019C9.1347 1.00763 9.55862 0.832031 10.0007 0.832031C10.4427 0.832031 10.8666 1.00763 11.1792 1.32019C11.4917 1.63275 11.6673 2.05667 11.6673 2.4987V2.5737C11.6684 2.84185 11.7478 3.10384 11.8959 3.32742C12.044 3.55099 12.2542 3.7264 12.5007 3.83203C12.752 3.94296 13.0308 3.97605 13.3011 3.92704C13.5715 3.87802 13.8209 3.74915 14.0173 3.55703L14.0673 3.50703C14.2221 3.35207 14.4059 3.22914 14.6083 3.14527C14.8106 3.06139 15.0275 3.01822 15.2465 3.01822C15.4655 3.01822 15.6824 3.06139 15.8847 3.14527C16.087 3.22914 16.2709 3.35207 16.4257 3.50703C16.5806 3.66182 16.7035 3.84563 16.7874 4.04796C16.8713 4.25029 16.9145 4.46717 16.9145 4.6862C16.9145 4.90522 16.8713 5.1221 16.7874 5.32443C16.7035 5.52676 16.5806 5.71058 16.4257 5.86536L16.3757 5.91536C16.1835 6.11176 16.0547 6.36121 16.0056 6.63154C15.9566 6.90187 15.9897 7.18068 16.1007 7.43203V7.4987C16.2063 7.74517 16.3817 7.95538 16.6053 8.10344C16.8288 8.25151 17.0908 8.33096 17.359 8.33203H17.5007C17.9427 8.33203 18.3666 8.50763 18.6792 8.82019C18.9917 9.13275 19.1673 9.55667 19.1673 9.9987C19.1673 10.4407 18.9917 10.8646 18.6792 11.1772C18.3666 11.4898 17.9427 11.6654 17.5007 11.6654H17.4257C17.1575 11.6664 16.8955 11.7459 16.6719 11.894C16.4484 12.042 16.273 12.2522 16.1673 12.4987Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_6278_1054">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
          </defs>
          </svg>
      );
      break;

    // sub-sidebar icons

    case "overview-new":
      icon = (

        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.4993 2.5H11.666V8.33333H17.4993V2.5Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.4993 11.666H11.666V17.4993H17.4993V11.666Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33333 11.666H2.5V17.4993H8.33333V11.666Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    
    case "updates":
      icon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.166 0.833984L17.4993 4.16732L14.166 7.50065" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 9.16602V7.49935C2.5 6.61529 2.85119 5.76745 3.47631 5.14233C4.10143 4.5172 4.94928 4.16602 5.83333 4.16602H17.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.83333 19.1667L2.5 15.8333L5.83333 12.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 10.834V12.5007C17.5 13.3847 17.1488 14.2326 16.5237 14.8577C15.8986 15.4828 15.0507 15.834 14.1667 15.834H2.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      break;
    
      case "themes":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z" stroke="#CCCCCC" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.08203 8.33203C7.77239 8.33203 8.33203 7.77239 8.33203 7.08203C8.33203 6.39168 7.77239 5.83203 7.08203 5.83203C6.39168 5.83203 5.83203 6.39168 5.83203 7.08203C5.83203 7.77239 6.39168 8.33203 7.08203 8.33203Z" stroke="#CCCCCC" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5013 12.4987L13.3346 8.33203L4.16797 17.4987" stroke="#CCCCCC" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
      );
      break;

    case "plugins":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.8">
<path d="M15.625 12.5793C15.725 12.5793 15.8375 12.5793 15.9375 12.5793C16.6834 12.5793 17.3988 12.2902 17.9262 11.7756C18.4537 11.261 18.75 10.5631 18.75 9.83537C18.75 9.10764 18.4537 8.40972 17.9262 7.89513C17.3988 7.38055 16.6834 7.09146 15.9375 7.09146C15.8375 7.09146 15.725 7.09146 15.625 7.09146L15.625 3.75L11.875 3.75L11.875 4.05488C11.875 4.78261 11.5787 5.48053 11.0512 5.99511C10.5238 6.50969 9.80842 6.79878 9.0625 6.79878C8.31658 6.79878 7.60121 6.50969 7.07376 5.99511C6.54632 5.48053 6.25 4.78261 6.25 4.05488L6.25 3.75L2.5 3.75L2.5 15.0305C2.5 15.3539 2.63169 15.6641 2.86612 15.8928C3.10054 16.1215 3.41848 16.25 3.75 16.25L15.625 16.25L15.625 12.5793Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</g>
</svg>

      );
      break;

    case "users":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1654 17.5V15.8333C14.1654 14.9493 13.8142 14.1014 13.1891 13.4763C12.5639 12.8512 11.7161 12.5 10.832 12.5H4.16536C3.28131 12.5 2.43346 12.8512 1.80834 13.4763C1.18322 14.1014 0.832031 14.9493 0.832031 15.8333V17.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.5013 9.16667C9.34225 9.16667 10.8346 7.67428 10.8346 5.83333C10.8346 3.99238 9.34225 2.5 7.5013 2.5C5.66035 2.5 4.16797 3.99238 4.16797 5.83333C4.16797 7.67428 5.66035 9.16667 7.5013 9.16667Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.168 17.4991V15.8324C19.1674 15.0939 18.9216 14.3764 18.4691 13.7927C18.0166 13.209 17.3831 12.7921 16.668 12.6074" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.332 2.60742C14.049 2.79101 14.6846 3.20801 15.1384 3.79268C15.5922 4.37735 15.8386 5.09645 15.8386 5.83659C15.8386 6.57673 15.5922 7.29582 15.1384 7.8805C14.6846 8.46517 14.049 8.88217 13.332 9.06576" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "support":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0005 17H13.8894C15.6085 17 17.0005 16.1745 17.0005 14.6789V13" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.001 8C16.7085 7.99957 17.3934 8.21238 17.9345 8.60079C18.4756 8.98919 18.8381 9.52815 18.9578 10.1223C19.0775 10.7165 18.9467 11.3276 18.5885 11.8475C18.2304 12.3675 17.668 12.7627 17.0008 12.9633C16.8877 12.9975 16.7668 13.008 16.648 12.994C16.5292 12.98 16.4161 12.942 16.3181 12.883C16.2202 12.8241 16.1403 12.746 16.0851 12.6553C16.0299 12.5646 16.001 12.4639 16.001 12.3617V8Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.00098 8C3.29346 7.99957 2.60857 8.21238 2.06745 8.60079C1.52634 8.98919 1.16388 9.52815 1.04419 10.1223C0.924501 10.7165 1.0553 11.3276 1.41344 11.8475C1.77159 12.3675 2.334 12.7627 3.00119 12.9633C3.11421 12.9975 3.23519 13.008 3.35397 12.994C3.47276 12.98 3.58587 12.942 3.68382 12.883C3.78177 12.8241 3.8617 12.746 3.91688 12.6553C3.97207 12.5646 4.00091 12.4639 4.00098 12.3617V8Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.999 8V6.52632C15.999 5.06065 15.3669 3.65501 14.2417 2.61862C13.1164 1.58224 11.5903 1 9.99902 1C8.40772 1 6.8816 1.58224 5.75638 2.61862C4.63116 3.65501 3.99902 5.06065 3.99902 6.52632V8" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.7263 17H12.6354C12.7318 17 12.8243 17.0263 12.8925 17.0732C12.9607 17.1201 12.999 17.1837 12.999 17.25V17.75C12.999 17.8163 12.9607 17.8799 12.8925 17.9268C12.8243 17.9737 12.7318 18 12.6354 18H9.7263C9.53341 18 9.34843 17.9473 9.21204 17.8536C9.07565 17.7598 8.99902 17.6326 8.99902 17.5C8.99902 17.3674 9.07565 17.2402 9.21204 17.1464C9.34843 17.0527 9.53341 17 9.7263 17Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
      );
      break;

    case "backups":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3346 10H1.66797" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.54297 4.25703L1.66797 9.9987V14.9987C1.66797 15.4407 1.84356 15.8646 2.15612 16.1772C2.46868 16.4898 2.89261 16.6654 3.33464 16.6654H16.668C17.11 16.6654 17.5339 16.4898 17.8465 16.1772C18.159 15.8646 18.3346 15.4407 18.3346 14.9987V9.9987L15.4596 4.25703C15.3217 3.97935 15.1089 3.74567 14.8454 3.58226C14.5819 3.41885 14.278 3.3322 13.968 3.33203H6.03464C5.72457 3.3322 5.42069 3.41885 5.15717 3.58226C4.89366 3.74567 4.68095 3.97935 4.54297 4.25703Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5 13.332H5.00833" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33203 13.332H8.34036" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "uptime":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3346 10H15.0013L12.5013 17.5L7.5013 2.5L5.0013 10H1.66797" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "analytics":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 16.6654V8.33203" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15 16.6654V3.33203" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5 16.6654V13.332" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "broken-links":
      icon=<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6.46854L11.7194 3.75043C12.2 3.26993 12.8518 3 13.5315 3C14.2111 3 14.8629 3.26993 15.3435 3.75043L16.2496 4.65646C16.7301 5.1371 17 5.78891 17 6.46854C17 7.14816 16.7301 7.79997 16.2496 8.28061L13.5315 11" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 13.5309L8.28061 16.2495C7.79997 16.73 7.14816 17 6.46854 17C5.78891 17 5.1371 16.73 4.65646 16.2495L3.75043 15.3433C3.26993 14.8626 3 14.2106 3 13.5309C3 12.8512 3.26993 12.1993 3.75043 11.7185L6.46725 9" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 13V15" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 11H18" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 16V18" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5H5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4V2" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 9H2" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      break;

    case "ranking":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5020_35933)">
        <path d="M8.72786 13.3346H6.64453C6.31301 13.3346 5.99507 13.2029 5.76065 12.9685C5.52623 12.7341 5.39453 12.4162 5.39453 12.0846V7.91797C5.39453 7.58645 5.52623 7.26851 5.76065 7.03409C5.99507 6.79966 6.31301 6.66797 6.64453 6.66797H8.72786" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.39453 10H7.47786" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.7513 6.66797H1.96297C1.61502 6.66809 1.2773 6.78567 1.0045 7.00165C0.731694 7.21764 0.539787 7.51938 0.45985 7.85803C0.379914 8.19667 0.41663 8.55239 0.564051 8.86756C0.711473 9.18274 0.960969 9.43893 1.27214 9.59464L2.89714 10.408C3.2083 10.5637 3.4578 10.8199 3.60522 11.135C3.75264 11.4502 3.78936 11.8059 3.70942 12.1446C3.62948 12.4832 3.43758 12.785 3.16478 13.001C2.89197 13.2169 2.55425 13.3345 2.2063 13.3346H0.417969" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.418 10.0013C10.418 10.6032 10.5365 11.1992 10.7669 11.7553C10.9972 12.3113 11.3348 12.8166 11.7604 13.2422C12.186 13.6678 12.6913 14.0054 13.2473 14.2357C13.8034 14.4661 14.3994 14.5846 15.0013 14.5846C15.6032 14.5846 16.1992 14.4661 16.7553 14.2357C17.3113 14.0054 17.8166 13.6678 18.2422 13.2422C18.6678 12.8166 19.0054 12.3113 19.2357 11.7553C19.4661 11.1992 19.5846 10.6032 19.5846 10.0013C19.5846 9.39941 19.4661 8.80341 19.2357 8.24734C19.0054 7.69126 18.6678 7.186 18.2422 6.7604C17.8166 6.33479 17.3113 5.99719 16.7553 5.76685C16.1992 5.53652 15.6032 5.41797 15.0013 5.41797C14.3994 5.41797 13.8034 5.53652 13.2473 5.76685C12.6913 5.99719 12.186 6.33479 11.7604 6.7604C11.3348 7.186 10.9972 7.69126 10.7669 8.24734C10.5365 8.80341 10.418 9.39941 10.418 10.0013Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.8426 7.5H16.7184C16.2691 7.50989 15.8416 7.69532 15.5273 8.01657C15.2131 8.33782 15.0371 8.76935 15.0371 9.21875C15.0371 9.66815 15.2131 10.0997 15.5273 10.4209C15.8416 10.7422 16.2691 10.9276 16.7184 10.9375H17.2918C17.2915 11.3521 17.4038 11.7591 17.6166 12.115C17.8293 12.4708 18.1347 12.7623 18.5001 12.9583" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.4922 10.832H12.9164C13.1374 10.832 13.3493 10.9198 13.5056 11.0761C13.6619 11.2324 13.7497 11.4444 13.7497 11.6654V14.4095" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_5020_35933">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        
      );
      break;

    case "security":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.9987 18.3346C9.9987 18.3346 16.6654 15.0013 16.6654 10.0013V4.16797L9.9987 1.66797L3.33203 4.16797V10.0013C3.33203 15.0013 9.9987 18.3346 9.9987 18.3346Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "performance":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1654 5L11.2487 12.9167L7.08203 8.75L0.832031 15" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.168 5H19.168V10" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "reports":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5020_35951)">
        <path d="M17.6766 13.2427C17.1465 14.4964 16.3173 15.6012 15.2615 16.4605C14.2058 17.3197 12.9556 17.9072 11.6203 18.1717C10.2851 18.4362 8.90532 18.3695 7.60176 17.9775C6.2982 17.5856 5.11049 16.8803 4.14249 15.9233C3.17448 14.9662 2.45565 13.7867 2.04883 12.4877C1.64202 11.1887 1.55961 9.80978 1.8088 8.47157C2.058 7.13336 2.63122 5.87656 3.47834 4.81107C4.32547 3.74557 5.42071 2.90381 6.66831 2.35938" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.3333 10.0013C18.3333 8.90695 18.1178 7.82332 17.699 6.81227C17.2802 5.80123 16.6664 4.88257 15.8926 4.10875C15.1187 3.33492 14.2001 2.7211 13.189 2.30231C12.178 1.88352 11.0943 1.66797 10 1.66797V10.0013H18.3333Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_5020_35951">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        
      );
      break;

    case "logs":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.832 1.66797H4.9987C4.55667 1.66797 4.13275 1.84356 3.82019 2.15612C3.50763 2.46868 3.33203 2.89261 3.33203 3.33464V16.668C3.33203 17.11 3.50763 17.5339 3.82019 17.8465C4.13275 18.159 4.55667 18.3346 4.9987 18.3346H14.9987C15.4407 18.3346 15.8646 18.159 16.1772 17.8465C16.4898 17.5339 16.6654 17.11 16.6654 16.668V7.5013L10.832 1.66797Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.832 1.66797V7.5013H16.6654" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "site-settings":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33203 17.5013V11.668" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.33203 8.33333V2.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 17.5V10" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 6.66667V2.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.668 17.4987V13.332" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.668 10V2.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M0.832031 11.668H5.83203" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 6.66797H12.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.168 13.332H19.168" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
      );
      break;

   
     


    // profile sub-sidebar
    case "profile":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6654 17.5V15.8333C16.6654 14.9493 16.3142 14.1014 15.6891 13.4763C15.0639 12.8512 14.2161 12.5 13.332 12.5H6.66536C5.78131 12.5 4.93346 12.8512 4.30834 13.4763C3.68322 14.1014 3.33203 14.9493 3.33203 15.8333V17.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.0013 9.16667C11.8423 9.16667 13.3346 7.67428 13.3346 5.83333C13.3346 3.99238 11.8423 2.5 10.0013 2.5C8.16035 2.5 6.66797 3.99238 6.66797 5.83333C6.66797 7.67428 8.16035 9.16667 10.0013 9.16667Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
      );
      break;

    case "my-subscriptions":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_5761_963)">
<path d="M15.4199 3.33398H1.25326C0.793018 3.33398 0.419922 3.70708 0.419922 4.16732V12.5007C0.419922 12.9609 0.793018 13.334 1.25326 13.334H15.4199C15.8802 13.334 16.2533 12.9609 16.2533 12.5007V4.16732C16.2533 3.70708 15.8802 3.33398 15.4199 3.33398Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.9154 5V14.1667C17.9154 14.3877 17.8276 14.5996 17.6713 14.7559C17.515 14.9122 17.303 15 17.082 15H2.08203" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.5833 6.66602V15.8327C19.5833 16.0537 19.4955 16.2657 19.3393 16.4219C19.183 16.5782 18.971 16.666 18.75 16.666H3.75" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33789 10.834C9.7186 10.834 10.8379 9.7147 10.8379 8.33398C10.8379 6.95327 9.7186 5.83398 8.33789 5.83398C6.95718 5.83398 5.83789 6.95327 5.83789 8.33398C5.83789 9.7147 6.95718 10.834 8.33789 10.834Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.08789 11.666H3.75456" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.9199 5H14.5866" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_5761_963">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

      );
      break;

    case "billing":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0.833984V19.1673" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.1667 4.16602H7.91667C7.14312 4.16602 6.40125 4.47331 5.85427 5.02029C5.30729 5.56727 5 6.30913 5 7.08268C5 7.85623 5.30729 8.5981 5.85427 9.14508C6.40125 9.69206 7.14312 9.99935 7.91667 9.99935H12.0833C12.8569 9.99935 13.5987 10.3066 14.1457 10.8536C14.6927 11.4006 15 12.1425 15 12.916C15 13.6896 14.6927 14.4314 14.1457 14.9784C13.5987 15.5254 12.8569 15.8327 12.0833 15.8327H5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "h_payment":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4987 3.33398H2.4987C1.57822 3.33398 0.832031 4.08018 0.832031 5.00065V15.0007C0.832031 15.9211 1.57822 16.6673 2.4987 16.6673H17.4987C18.4192 16.6673 19.1654 15.9211 19.1654 15.0007V5.00065C19.1654 4.08018 18.4192 3.33398 17.4987 3.33398Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M0.832031 8.33398H19.1654" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "notification":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6.66602C15 5.33993 14.4732 4.06816 13.5355 3.13048C12.5979 2.1928 11.3261 1.66602 10 1.66602C8.67392 1.66602 7.40215 2.1928 6.46447 3.13048C5.52678 4.06816 5 5.33993 5 6.66602C5 12.4993 2.5 14.166 2.5 14.166H17.5C17.5 14.166 15 12.4993 15 6.66602Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.44 17.5C11.2935 17.7526 11.0832 17.9622 10.8302 18.1079C10.5771 18.2537 10.2903 18.3304 9.99831 18.3304C9.70632 18.3304 9.41947 18.2537 9.16645 18.1079C8.91344 17.9622 8.70315 17.7526 8.55664 17.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
      );
      break;

    case "announce":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.7186 14.7046L5.12903 15.3245C4.78107 15.4603 4.40975 15.5263 4.03628 15.5186C3.66281 15.511 3.29451 15.4299 2.95239 15.2799C2.26146 14.977 1.71916 14.412 1.44479 13.7093C1.17042 13.0065 1.18645 12.2235 1.48936 11.5326C1.79227 10.8417 2.35724 10.2994 3.05999 10.025L4.65046 9.4043L6.7186 14.7046Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.71853 14.7037C9.82875 13.49 13.2286 13.2239 16.4898 13.9391L17.5 14.1604L12.9499 2.5L12.3571 3.34741C10.4418 6.08202 7.76039 8.18906 4.65039 9.4034L6.71853 14.7037Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.3984 5.97852L18.2252 8.09883" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.71875 14.7031C6.98927 15.3971 7.39807 16.0288 7.9203 16.5598C8.44254 17.0909 9.06731 17.5102 9.75664 17.7923" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "terms":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6654 1.66602H4.9987C4.55667 1.66602 4.13275 1.84161 3.82019 2.15417C3.50763 2.46673 3.33203 2.89065 3.33203 3.33268V16.666C3.33203 17.108 3.50763 17.532 3.82019 17.8445C4.13275 18.1571 4.55667 18.3327 4.9987 18.3327H14.9987C15.4407 18.3327 15.8646 18.1571 16.1772 17.8445C16.4898 17.532 16.6654 17.108 16.6654 16.666V6.66602L11.6654 1.66602Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.668 1.66602V6.66602H16.668" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.3346 10.834H6.66797" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.3346 14.166H6.66797" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33464 7.5H7.5013H6.66797" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
      );
      break;

    case "password":
      icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4993 1.66602L15.8326 3.33268M15.8326 3.33268L18.3326 5.83268L15.4159 8.74935L12.9159 6.24935M15.8326 3.33268L12.9159 6.24935M9.49092 9.67435C9.9212 10.0989 10.2633 10.6044 10.4974 11.1617C10.7315 11.719 10.8531 12.3171 10.8551 12.9215C10.8571 13.526 10.7396 14.1249 10.5092 14.6838C10.2788 15.2426 9.94014 15.7504 9.51271 16.1778C9.08528 16.6052 8.57752 16.9439 8.01867 17.1743C7.45982 17.4047 6.86092 17.5222 6.25645 17.5202C5.65197 17.5182 5.05387 17.3966 4.49658 17.1625C3.93928 16.9284 3.43381 16.5863 3.00925 16.156C2.17436 15.2916 1.71239 14.1338 1.72283 12.9321C1.73327 11.7304 2.2153 10.5808 3.06508 9.73101C3.91487 8.88123 5.06443 8.3992 6.26616 8.38876C7.4679 8.37832 8.62566 8.84029 9.49009 9.67518L9.49092 9.67435ZM9.49092 9.67435L12.9159 6.24935" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      );
      break;

    case "workspace":
      icon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.667 2.5H3.33366C2.41318 2.5 1.66699 3.24619 1.66699 4.16667V12.5C1.66699 13.4205 2.41318 14.1667 3.33366 14.1667H16.667C17.5875 14.1667 18.3337 13.4205 18.3337 12.5V4.16667C18.3337 3.24619 17.5875 2.5 16.667 2.5Z" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66699 17.5H13.3337" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14.166V17.4993" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
    default:
      break;
  }
  return icon;
};

export default Icons;
