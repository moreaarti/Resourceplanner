const convertTo12HourFormat = (datetime) => {
    if (!datetime) {
      return '0:00'; // Handle null or undefined input
    }
  
    const date = new Date(datetime);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return '0:00'; // Handle invalid date
    }
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Format minutes to always be two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${formattedMinutes} ${ampm}`;
  };
  
  export default convertTo12HourFormat;
  