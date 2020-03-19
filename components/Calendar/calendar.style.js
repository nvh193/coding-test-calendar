import styled from "styled-components";

export const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, calc((100% - 6 * 0.625em) / 7));
  grid-template-rows: auto;
  grid-gap: 0.625em;
  width: calc(100vw - 8em );;
  min-width: 1080px;
  height: calc(100vh - 9em );
  color: #6A7988;
  padding: 4em;
}
`;
export const DayContainerWrapper = styled.div`
  .dayContainer__heading {
    margin-bottom: 0.5625em;

    span {
      text-transform: uppercase;
      font-size: 0.625em;
      font-style: normal;
      font-weight: 600;
      line-height: 14px;
      color: #6a7988;
    }
  }
  .dayContainer__body {
    height: 100%;
    background: #f3f5f8;
    mix-blend-mode: normal;
    opacity: 0.8;
    border-radius: 6px;
    padding: 0px 7px;

    .dayBody__dateOfMonth {
      padding-top: 0.625em;
      padding-bottom: 0.3125em;
      font-size: 0.6875em;
      color: ${props => props.isActive ? '#5a57cb' : '#6A7988' };
      font-weight: ${props => props.isActive ? 'bold' : 'normal' };
    }
  }
`;
export const WorkoutItemWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;

  margin-bottom: 0.3125em;
  .workoutItem__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.416em 0.4375em;
    .workoutHeading__workoutName {
      text-transform: uppercase;
      color: #5a57cb;
      font-size: 0.625em;
      font-weight: bold;
      overflow: hidden;
      min-width: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .workoutHeading__extraBtn {
      padding-left: 1em;
    }
  }

  .workoutItem__exercises {
    padding: 0 0.1875em;
  }

  .workoutItem__footer {
    text-align: right;
    padding-right: 4px;
    margin-top: -3px;
  }
`;

export const ExerciseItemWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 0.1875em;
  padding: 0.3125em 0.5626em;
  .exerciseItem__heading {
    font-weight: 600;
    font-size: 0.8125em;
    line-height: 18px;
    /* identical to box height */

    text-align: right;

    color: #000000;
    overflow: hidden;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 1em;
  }

  .exerciseItem__content {
    display: flex;
    justify-content: space-between;
    .dayBody__sets {
      font-style: normal;
      font-weight: bold;
      font-size: 0.625em;
      line-height: 14px;
      /* identical to box height */

      text-align: right;

      color: #919cad;
      padding-right: 1em;
    }
    .dayBody__information {
      font-style: normal;
      font-weight: normal;
      font-size: 0.625em;
      line-height: 14px;
      /* identical to box height */

      text-align: right;

      color: #95a6b7;
      overflow: hidden;
      min-width: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
