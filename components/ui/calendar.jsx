import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  onSelect,
  showOutsideDays = true,
  selectedYear,
  onYearChange,
  ...props
}) {
  const [inputYear, setInputYear] = React.useState(selectedYear || new Date().getFullYear());
  const [isEditingYear, setIsEditingYear] = React.useState(false);

  const handleYearChange = (year) => {
    setInputYear(year);
  };

  const handleConfirmYear = () => {
    onYearChange(parseInt(inputYear, 10));
    setIsEditingYear(false);
  };

  return (
    <div className="relative">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        onSelect={onSelect}
        onYearChange={onYearChange}
        selected={selectedYear ? new Date(selectedYear, 0, 1) : null}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <ChevronLeft className={cn("h-4 w-4 cursor-pointer", isEditingYear && "hidden")} onClick={() => onYearChange(selectedYear - 1)} />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRight className={cn("h-4 w-4 cursor-pointer", isEditingYear && "hidden")} onClick={() => onYearChange(selectedYear + 1)} />
          ),
        }}
        {...props}
      />
      {isEditingYear && (
        <div className="absolute top-0 left-0 right-0 flex justify-center items-center mt-2">
          <input
            type="number"
            value={inputYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-16 px-1 py-1 text-sm text-center border rounded"
          />
          <button
            onClick={handleConfirmYear}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "ml-2 h-7 px-2 bg-transparent opacity-50 hover:opacity-100 cursor-pointer"
            )}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };



// import React, { useState } from "react";
// import dayjs from "dayjs";
// import { TextField } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// function Calendar({ showOutsideDays = true, field, setBornDate, ...props }) {
//   const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (field && field.onChange) {
//       setBornDate(date);
//       field.onChange(date);

//       // Actualiza el valor del campo born_date
//       field.setValue(date);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div>
//         <DesktopDatePicker
//           showOutsideDays={showOutsideDays}
//           disableFuture
//           label="responsive"
//           inputFormat="MM/DD/YYYY"
//           value={selectedDate}
//           onChange={handleDateChange}
//         >
//           {(params) => <TextField {...params} />}
//         </DesktopDatePicker>
//       </div>
//     </LocalizationProvider>
//   );
// }

// Calendar.displayName = "Calendar";

// export { Calendar };