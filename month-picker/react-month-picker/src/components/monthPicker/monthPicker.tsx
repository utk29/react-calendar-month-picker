import { useState } from "react";
import moment from "moment";
import { Calender } from "./calender";
import "./multiMonthPicker.scss";
import { DateFormatForCard } from "./helper";

interface Props {
  handleMultipleAllocation: (date: string[]) => void;
  dataSource?: string[];
  placeHolder?: string;
  enableMultiSelection: boolean;
}

export const MonthPicker = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const renderMonthCard = (val: string[] | undefined) => {
    if (val?.length !== 0 && val != null) {
      if (props.enableMultiSelection) {
        return val.map((res: string) => {
          return (
              <div className="chip" key={res} >{moment(res).format(DateFormatForCard)}</div>
          );
        });
      } else {
        //setOpen(false);   //close after single selection
        return <div className="singleAllocation" key={val[0]}>{moment(val[0]).format(DateFormatForCard)}</div>;
      }
    } else {
      return (
        <div className="singleAllocation">
          <b>{props?.placeHolder}</b>
        </div>
      );
    }
  };
  return (
    <>
      <div
        className="parentWrapper"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div id="monthPickerInputTag" className="calenderInput">
          {renderMonthCard(props.dataSource)}
        </div>
        <i className='fas fa-calendar-alt calenderIcon'></i>
      </div>
      <div className="calendar">
        <Calender
          open={open}
          setMonths={props.dataSource ?? []}
          enableMultiSelection={props.enableMultiSelection}
          onChange={(e) => {
            setOpen(props.enableMultiSelection)
            props.handleMultipleAllocation(e);
          }}
        />
      </div>
    </>
  );
};

