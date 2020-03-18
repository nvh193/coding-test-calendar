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
  rearrangeDays: ["days"]
});

export const handleRerrangeDays = (state, action) =>
  Immutable.merge(state, {
    days: {
      ...state.days,
      ...action.days
    }
  });

export const HANDLERS = {
  [Types.REARRANGE_DAYS]: handleRerrangeDays
};

export default createReducer(INITIAL_STATE, HANDLERS);
