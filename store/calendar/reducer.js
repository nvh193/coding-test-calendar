import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { workouts as workoutsData } from "../../fake/workouts";

function transformData() {
  const days = {};
  const workouts = {};
  workoutsData.map(o => {
    days[o.day] = (days[o.day] || []).concat(o);
    workouts[o._id] = o;
  });
  return { days, workouts };
}

const INITIAL_STATE = Immutable(transformData());

export const { Types, Creators } = createActions({
  rearrangeDays: ["days"],
  rearrangeWorkouts: ["workouts"],
  addExercise: ["workoutId", "exercise"],
});

export const handleRerrangeDays = (state, action) =>
  Immutable.merge(state, {
    days: {
      ...state.days,
      ...action.days
    }
  });

export const handleRearrangeWorkouts = (state, action) =>
  Immutable.merge(state, {
    workouts: {
      ...state.workouts,
      ...action.workouts
    }
  });

export const handleAddExercise = (state, action) => // TODO refactor
  Immutable.merge(state, {
    workouts: {
      ...state.workouts,
      [action.workoutId]: {
        ...state.workouts[action.workoutId],
        exercises: state.workouts[action.workoutId].exercises.concat([action.exercise])
      }
    }
  });

export const HANDLERS = {
  [Types.REARRANGE_DAYS]: handleRerrangeDays,
  [Types.REARRANGE_WORKOUTS]: handleRearrangeWorkouts,
  [Types.ADD_EXERCISE]: handleAddExercise
};

export default createReducer(INITIAL_STATE, HANDLERS);
