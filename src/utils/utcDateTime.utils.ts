class UtcDateTime {
  utcDateTime = (date_time: string, type: string) => {
    let month_names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let short_month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let day_names = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let short_day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let result_date_time: Date =
      date_time === "today" ? new Date() : new Date(date_time);
    let utc =
      result_date_time.getTime() + result_date_time.getTimezoneOffset() * 60000;
    result_date_time = new Date(utc + 3600000 * +5.5);
    let final_result: string = "";

    switch (type) {
      case "hour":
        final_result = `${result_date_time.getHours()}`;
        break;
      case "minute":
        final_result = `${result_date_time.getMinutes()}`;
        break;
      case "time" || "time_without_am_pm":
        let result_hour: number | string = result_date_time.getHours(),
          result_minute: number | string = result_date_time.getMinutes();
        let time_type = "AM";
        if (result_hour >= 12) {
          time_type = "PM";
        }

        if (result_hour > 12 && type === "time") {
          result_hour = result_hour - 12;
        }
        if (result_hour < 10) {
          result_hour = `0${result_hour}`;
        }
        if (result_minute < 10) {
          result_minute = `0${result_minute}`;
        }
        final_result =
          type === "time"
            ? `${result_hour}:${result_minute} ${time_type}`
            : `${result_hour}:${result_minute}`;
        break;
      case "time_in_sec":
        final_result = `${result_date_time.getTime()}`;
        break;
      case "date":
        let date_result = result_date_time.getDate();
        if (date_result < 10) {
          final_result = `0${result_date_time}`;
        } else {
          final_result = `${result_date_time}`;
        }
        break;
      case "date_with_prefix":
        let result_case = result_date_time.getDate(),
          result_value = result_date_time.getDate();
        if (result_case < 10) {
          final_result = `0${result_value}`;
        }
        if (result_case === 1 || result_case === 21 || result_case === 31) {
          final_result = `${result_value}st`;
        } else if (result_case === 2 || result_case === 22) {
          final_result = `${result_value}nd`;
        } else if (result_case === 3 || result_case === 23) {
          final_result = `${result_value}rd`;
        } else {
          final_result = `${result_value}th`;
        }
        break;
      case "day":
        final_result = `${result_date_time.getDay()}`;
        break;
      case "day_name":
        final_result = `${day_names[result_date_time.getDay()]}`;
        break;
      case "short_day_name":
        final_result = `${short_day_names[result_date_time.getDay()]}`;
        break;
      case "month":
        final_result = `${result_date_time.getMonth()}`;
        break;
      case "month_name":
        final_result = `${month_names[result_date_time.getMonth()]}`;
        break;
      case "short_month_name":
        final_result = `${short_month_names[result_date_time.getMonth()]}`;
        break;
      case "year":
        final_result = `${result_date_time.getFullYear()}`;
        break;
      case "two_digit_year":
        final_result = `${result_date_time.getFullYear()}`;
        final_result = final_result.toString().substring(2);
        break;
      case "display_dt":
        final_result = `${result_date_time.toLocaleString()}`;
        break;

      default:
        final_result = `${result_date_time}`;
        break;
    }
    return final_result;
  };

  localDateTime = (date: string) => {
    return `${this.utcDateTime(date, "short_day_name")}, ${this.utcDateTime(
      date,
      "date_with_prefix"
    )} ${this.utcDateTime(date, "short_month_name")} ${this.utcDateTime(
      date,
      "year"
    )}, ${this.utcDateTime(date, "time")}`;
  };
}

const utcDateTime = new UtcDateTime();

export default utcDateTime;
