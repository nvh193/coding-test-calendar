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

var objectId = function() {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function() {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

function WorkoutItem({ workoutId, workout, index, addExercise }) {
  if (!workout) return null;

  const handleAddExercise = () => {
    const exercise = {
      _id: objectId(),
      name: "Exercise E",
      setInformation: "50 lb x 5",
      sets: 1
    };
    addExercise(workoutId, exercise);
  };

  return (
    <Draggable key={workoutId} draggableId={workoutId} index={index}  type="day">
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

          <Droppable droppableId={`workout_${workoutId}`} type="workout">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className="workoutItem__exercises">
                {(workout.exercises || []).map((exe, i) => (
                  <ExerciseItem {...exe} key={exe._id} index={i} />
                ))}
              </div>
            )}
          </Droppable>
          <div className="workoutItem__footer">
            <img onClick={handleAddExercise} src="/static/images/plus_icon.svg" />
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
