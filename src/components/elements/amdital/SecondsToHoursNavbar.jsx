import React from "react";



export const SecondsToHoursNavbar = ({ seconds }) => {

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Format hours and minutes as two-digit numbers
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds =secs.toString().padStart(2, "0");

    // Choose output based on conditions
    const output = seconds ===0 ? `00:00 m` : seconds < 3599 ? `${formattedHours}:${formattedMinutes} m` :   `${formattedHours}:${formattedMinutes} hrs`;

    return <div>{output}</div>;
};
