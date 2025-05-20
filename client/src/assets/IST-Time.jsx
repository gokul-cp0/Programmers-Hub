export const FormatToIST = (utcDate) => {
    const options = {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(utcDate).toLocaleString("en-US", options).replace(",", " at");
  };
  