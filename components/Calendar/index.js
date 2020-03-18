import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Creators } from "../../store/calendar/reducer";
import { CalendarWrapper } from "./calendar.style";
import DayContainer from "./DayContainer";

const daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination || []);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.day] = sourceClone;
  result[droppableDestination.day] = destClone;

  return result;
};

function Calendar({ days, rearrangeDays }) {
  const onDragEnd = result => {
    const { source, destination } = result;
    const sourceDay = source.droppableId.split("_")[1];
    const destinationDay = destination.droppableId.split("_")[1];
    source.day = sourceDay;
    destination.day = destinationDay;

    const updateData = {};
    updateData[sourceDay] = days[sourceDay];

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(days[sourceDay], source.index, destination.index);
      rearrangeDays({
        [sourceDay]: items
      });
    } else {
      const result = move(days[sourceDay], days[destinationDay], source, destination);
      rearrangeDays(result);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CalendarWrapper>
        {daysInWeek.map((dayTitle, day) => {
          return <DayContainer key={dayTitle} {...{ dayTitle, day }} />;
        })}
      </CalendarWrapper>
    </DragDropContext>
  );
}

const mapStateToProps = (state, props) => {
  return {
    days: state.calendar.days
  };
};

export default connect(mapStateToProps, { ...Creators })(Calendar);
