import React from "react";
import moment from "moment";
import _ from "lodash";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Creators } from "../../store/calendar/reducer";
import { DayContainerWrapper } from "./calendar.style";
import WorkoutItem from "./WorkoutItem";

function DayContainer({ day, dayTitle, workouts }) {
  const dayNow = moment().date()
  const currentDay = moment().startOf("isoWeek").add(day, "days").date()
    
  return (
    <Droppable droppableId={`day_${day}`} type="day">
      {(provided, snapshot) => (
        <DayContainerWrapper ref={provided.innerRef} isActive={dayNow === currentDay}>
          <div className="dayContainer__heading">
            <span>{dayTitle}</span>
          </div>
          <div className="dayContainer__body">
            <div className="dayBody__dateOfMonth">
              <span>
                {currentDay}
              </span>
            </div>
            <div className="dayBody__workouts">
              {workouts.map((w, index) => (
                <WorkoutItem index={index} key={w._id} workoutId={w._id} />
              ))}
            </div>
          </div>
          {provided.placeholder}
        </DayContainerWrapper>
      )}
    </Droppable>
  );
}

const mapStateToProps = (state, props) => {
  return {
    workouts: _.get(state.calendar, ["days", props.day], [])
  };
};

export default connect(mapStateToProps, { ...Creators })(DayContainer);
