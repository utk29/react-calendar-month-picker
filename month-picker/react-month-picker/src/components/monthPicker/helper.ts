export const MONTHS_NAMES = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export const monthsNameToMonthsNumber = (key: string) => {
  if (key === "Jan") {
    return "01";
  }
  if (key === "Feb") {
    return "02";
  }

  if (key === "Mar") {
    return "03";
  }

  if (key === "Apr") {
    return "04";
  }

  if (key === "May") {
    return "05";
  }

  if (key === "Jun") {
    return "06";
  }

  if (key === "Jul") {
    return "07";
  }

  if (key === "Aug") {
    return "08";
  }
  if (key === "Sep") {
    return "09";
  }
  if (key === "Oct") {
    return "10";
  }
  if (key === "Nov") {
    return "11";
  } else return "12";
};

export const VIEW_YEARS = "YEARS";
export const VIEW_MONTHS = "MONTHS";

export const DateFormat = "YYYY-MM";
export const DateFormatForCard = "MMM YYYY";
