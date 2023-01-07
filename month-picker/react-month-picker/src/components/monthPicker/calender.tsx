import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import {
  MONTHS_NAMES,
  VIEW_YEARS,
  VIEW_MONTHS,
  monthsNameToMonthsNumber,
  DateFormat,
} from "./helper";
import "./multiMonthPicker.scss";
interface Props {
  open: boolean;
  setMonths: string[];
  onChange: (e: string[]) => void;
  enableMultiSelection: boolean;
}
export const Calender = (props: Props) => {
  useEffect(() => {
    setOpen(props.open);
    setSelectedMonths(props.setMonths);
  }, [props.open, props.setMonths]);

  const [years, setYears] = useState<number[]>(
    Array.from({ length: 12 }, (_v, k) => k + new Date().getFullYear())
  );
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    Object.keys(MONTHS_NAMES)[new Date().getMonth()]
  );
  const [currentView, setCurrentView] = useState<string>(
    new Date().getFullYear() ? VIEW_MONTHS : VIEW_YEARS
  );
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const onChange = (selectedMonth: string, selectedYear: number, saveValues: boolean = true) => {
    if (saveValues) {
      let selectedData: string[] = [];
      if (
        selectedMonths?.indexOf(
          moment.utc(`${selectedMonth} ${selectedYear}`).format(DateFormat)
        ) >= 0
      ) {
        selectedData = selectedMonths.filter(
          (item) => item !== moment.utc(`${selectedMonth} ${selectedYear}`).format(DateFormat)
        );
      } else {
        if (props.enableMultiSelection) {
          selectedData = selectedMonths.concat(
            moment.utc(`${selectedMonth} ${selectedYear}`).format(DateFormat)
          );
        } else {
          selectedData[0] = moment.utc(`${selectedMonth} ${selectedYear}`).format(DateFormat);
        }
      }
      setSelectedMonths(selectedData);
      props.onChange(selectedData);
    }
  };

  const selectMonthYear = (selectedMonth: string, selectedYear: number, check: boolean) => {
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);
    onChange(selectedMonth, selectedYear, check);
  };
  const previous = () => {
    if (currentView === VIEW_YEARS) {
      if (selectedYear === years[0]) {
        updateYears(years[0] - 12);
      }
    }
    selectMonthYear(selectedMonth, selectedYear - 1, false);
  };

  const updateYears = (startYear: number) => {
    const years = Array.from({ length: 12 }, (_v, k) => {
      return k + startYear;
    });
    setYears(years);
  };

  const previousMonth = () => {
    if (selectedYear === years[0]) {
      updateYears(years[0] - 12);
    }
    selectMonthYear(selectedMonth, selectedYear - 1, false);
  };

  const next = () => {
    if (currentView === VIEW_YEARS) {
      if (selectedYear === years[11]) {
        updateYears(years[11] + 1);
      }
    }
    selectMonthYear(selectedMonth, selectedYear + 1, false);
  };

  const nextMonth = () => {
    if (selectedYear === years[11]) {
      updateYears(years[11] + 1);
    }

    selectMonthYear(selectedMonth, selectedYear + 1, false);
  };

  const renderMonths = () => {
    return Object.keys(MONTHS_NAMES).map((month: string, i) => {
      return (
        <div
          className="column"
          key={i}
          onClick={() => {
            selectMonthYear(month, selectedYear, true);
          }}
        >
          <span
            className={
              selectedMonths?.indexOf(`${selectedYear}-${monthsNameToMonthsNumber(month)}`) >= 0
                ? "selectedMonthsHighlighter"
                : "nonSelectedMonths"
            }
          >
            {month}
          </span>
        </div>
      );
    });
  };

  const renderYears = () => {
    return years.map((year, i) => {
      return (
        <div
          className="column"
          key={i}
          onClick={() => {
            selectMonthYear(selectedMonth, year, false);
            setCurrentView(VIEW_MONTHS);
          }}
        >
          {year}
        </div>
      );
    });
  };

  const renderHead = () => {
    return (
      <div className="head">
        {currentView === VIEW_YEARS ? (
          <div
            className="column prevent-selection"
            id="picker-prev"
            onClick={() => {
              previous();
            }}
          >
            &lt;
          </div>
        ) : (
          <div
            className="column prevent-selection"
            id="picker-prev"
            onClick={() => {
              previousMonth();
            }}
          >
            &lt;
          </div>
        )}
        <div
          className="column"
          onClick={() => setCurrentView(currentView === VIEW_YEARS ? VIEW_MONTHS : VIEW_YEARS)}
        >
          {`${selectedMonth} ${selectedYear}`}
        </div>
        {currentView === VIEW_YEARS ? (
          <div
            className="column prevent-selection"
            id="picker-next"
            onClick={() => {
              next();
            }}
          >
            &gt;
          </div>
        ) : (
          <div
            className="column prevent-selection"
            id="picker-next"
            onClick={() => {
              nextMonth();
            }}
          >
            &gt;
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {open && (
        <div className="year-month-wrapper">
          {renderHead()}
          <div className="year-month">
            {currentView === VIEW_YEARS ? renderYears() : renderMonths()}
          </div>
        </div>
      )}
    </div>
  );
};
