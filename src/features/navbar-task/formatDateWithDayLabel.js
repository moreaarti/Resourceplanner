const formatDateWithDayLabel = (dateStr) => {
    
    const [day, month, year] = dateStr.split(" ");
    const taskDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    const options = { day: "2-digit", month: "short" };
    const formattedDate = taskDate.toLocaleDateString("en-GB", options);
    const dayOfWeek = taskDate.toLocaleDateString("en-GB", { weekday: "long" });
  
    if (taskDate.toDateString() === today.toDateString()) {
      return `Today - ${formattedDate}`;
    } else if (taskDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday - ${formattedDate}`;
    } else {
      return `${dayOfWeek} - ${formattedDate}`;
    }
  };
  
  export default formatDateWithDayLabel
  