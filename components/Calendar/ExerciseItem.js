import React from "react";
import moment from "moment";
import { Draggable } from 'react-beautiful-dnd'
import { ExerciseItemWrapper } from "./calendar.style";
import WorkoutItem from "./WorkoutItem";

export default function ExerciseItem({ _id, name, sets, setInformation, index }) {
  return (
    <Draggable key={_id} draggableId={_id} index={index} type="workout">
      {(provided, snapshot) => (
        <ExerciseItemWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
         >
          <div className="exerciseItem__heading">
            <span>{name}</span>
          </div>
          <div className="exerciseItem__content">
            <div className="dayBody__sets">{`${sets}x`}</div>
            <div className="dayBody__information">{setInformation}</div>
          </div>
        </ExerciseItemWrapper>
      )}
    </Draggable>
  );
}
