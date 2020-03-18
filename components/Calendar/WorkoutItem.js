import React from "react";
import moment from "moment";
import _ from "lodash";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Creators } from "../../store/calendar/reducer";
import { WorkoutItemWrapper } from "./calendar.style";
import ExerciseItem from "./ExerciseItem";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  zIndex: isDragging ? 1000 : 1,

  ...draggableStyle
});

function WorkoutItem({ workoutId, workout, index }) {
  if (!workout) return null;
  return (
    <Draggable key={workoutId} draggableId={workoutId} index={index} >
      {(provided, snapshot) => (
        <WorkoutItemWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <div className="workoutItem__heading">
            <div className="workoutHeading__workoutName">{workout.name}</div>
            <img className="workoutHeading__extraBtn" src="/static/images/three_dot.svg" />
          </div>
          <div className="workoutItem__exercises">
            {(workout.exercises || []).map(exe => (
              <ExerciseItem {...exe} key={exe._id} />
            ))}
          </div>
          <div className="workoutItem__footer">
            <img src="/static/images/plus_icon.svg" />
          </div>
        </WorkoutItemWrapper>
      )}
    </Draggable>
  );
}

const mapStateToProps = (state, props) => {
  return {
    workout: _.get(state.calendar, ["workouts", props.workoutId], null)
  };
};

export default connect(mapStateToProps, { ...Creators })(WorkoutItem);
