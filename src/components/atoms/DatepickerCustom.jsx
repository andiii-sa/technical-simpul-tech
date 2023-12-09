import { IconCalendar, IconSchedule } from "assets/icons";
import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerCustom = ({ date, handleDate = () => {} }) => {
  return (
    <div className="flex gap-2 items-center p-2">
      <IconSchedule
        color={`${date ? "fill-blue-1" : "fill-gray-2"}`}
        className="w-[17px] h-[17px]"
      />
      <div className="flex gap-2 border border-gray-2 rounded-md px-3 py-2 items-center">
        <DatePicker
          selected={date ? moment(date, "DD/MM/YYYY").toDate() : ""}
          onChange={(val) =>
            val ? handleDate(moment(val).format("DD/MM/YYYY")) : handleDate("")
          }
          className="focus:outline-none"
          placeholderText="Set Date"
          dateFormat={["dd/MM/yyyy"]}
        />
        <IconCalendar className="w-[14px] h-[14px]" />
      </div>
    </div>
  );
};

export default DatepickerCustom;
