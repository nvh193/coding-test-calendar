import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, resetServerContext } from "react-beautiful-dnd";

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
  result[droppableSource.id] = sourceClone;
  result[droppableDestination.id] = destClone;

  return result;
};

function Calendar({ days, workouts, rearrangeDays, rearrangeWorkouts }) {
  // fix bug dnd with SSR
  resetServerContext();

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.type === "workout") {
      handleDragEndWorkoutContainer(result);
    } else if (result.type === "day") {
      handleDragEndDayContainer(result);
    }
  };

  const handleDragEndDayContainer = (result) => {
    const { source, destination, type } = result;
    const sourceDay = source.droppableId.split("_")[1];
    const destinationDay = destination.droppableId.split("_")[1];
    source.id = sourceDay;
    destination.id = destinationDay;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(days[sourceDay], source.index, destination.index);
      rearrangeDays({
        [sourceDay]: items
      });
    } else {
      rearrangeDays(move(days[sourceDay], days[destinationDay], source, destination));
    }
  };

  const handleDragEndWorkoutContainer = (result) => {
    const { source, destination, type } = result;
    const sourceWorkoutId = source.droppableId.split("_")[1];
    const destinationWorkoutId = destination.droppableId.split("_")[1];
    const exercisesSource = _.get(workouts, [sourceWorkoutId, 'exercises'], [])
    const exercisesDestiantion = _.get(workouts, [destinationWorkoutId, 'exercises'], [])
    source.id = sourceWorkoutId;
    destination.id = destinationWorkoutId;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(exercisesSource, source.index, destination.index);
      rearrangeWorkouts({
        [sourceWorkoutId]: {
          ..._.get(workouts, [sourceWorkoutId]),
          exercises: items
        }
      });
    } else {
      const resultDrag = move(exercisesSource, exercisesDestiantion, source, destination)
      rearrangeWorkouts({
        [sourceWorkoutId]: {
          ..._.get(workouts, [sourceWorkoutId]),
          exercises: resultDrag[sourceWorkoutId]
        },
        [destinationWorkoutId]: {
          ..._.get(workouts, [destinationWorkoutId]),
          exercises: resultDrag[destinationWorkoutId]
        },
      });
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
    days: state.calendar.days,
    workouts: state.calendar.workouts
  };
};

export default connect(mapStateToProps, { ...Creators })(Calendar);
