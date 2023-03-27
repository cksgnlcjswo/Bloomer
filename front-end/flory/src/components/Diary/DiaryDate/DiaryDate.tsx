import React, { useState, useEffect } from "react";
import { SContainer, SMain } from "./styles";
import { Dropdown } from "semantic-ui-react";
import DiaryDatePicker from "../DiaryDatePicker/DiaryDatePicker";
import { useAppDispatch } from "../../../redux/store.hooks";
import { getDiaryWithDate } from "../../../redux/modules/diary";

// 월 주차 계산 함수
const convertWeekIdx = (date: Date) => {
  const currentDate = date.getDate();
  const firstDay = new Date(date.setDate(1)).getDay();
  return Math.ceil((currentDate + firstDay) / 7);
};

const DiaryDate = ({ diaryData }: any) => {
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(diaryData.year);
  const [month, setMonth] = useState(diaryData.month);
  const [week, setWeek] = useState("1주차");
  const [isUpdate, setIsUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setIsUpdate(false);
  };
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(true);
  };

  useEffect(() => {
    if (isUpdate) {
      diaryData.year = year;
      diaryData.month = month;
      dispatch(getDiaryWithDate(diaryData));
    }
  }, [isUpdate]);

  return (
    <div>
      {open && (
        <DiaryDatePicker
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          open={open}
          handleClose={handleClose}
        />
      )}
      <SContainer>
        <SMain onClick={handleOpen} className="date-picker">
          {year.toString().substring(2) + "년"}
        </SMain>
        <SMain onClick={handleOpen} className="date-picker">
          {month}월
        </SMain>
        <SMain>{week}</SMain>
      </SContainer>
    </div>
  );
};

export default DiaryDate;
