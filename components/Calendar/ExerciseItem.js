import React from "react";
import moment from "moment";
import { ExerciseItemWrapper } from "./calendar.style";
import WorkoutItem from "./WorkoutItem";

export default function ExerciseItem({ name, sets, setInformation }) {
  return (
    <ExerciseItemWrapper>
      <div className="exerciseItem__heading">
        <span>{name}</span>
      </div>
      <div className="exerciseItem__content">
        <div className="dayBody__sets">{`${sets}x`}</div>
        <div className="dayBody__information">{setInformation}</div>
      </div>
    </ExerciseItemWrapper>
  );
}
