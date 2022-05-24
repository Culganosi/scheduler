const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS"


export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state,
      day: action.day };
    
      case SET_APPLICATION_DATA:
      return { ...state,
      days: action.days,
    appointments: action.appointments,
    interviewers: action.interviewers}
    
    case SET_SPOTS: {
      return { ...state, days: action.days, appointments: action.appointments};
    }

    case SET_INTERVIEW: {
      const newState = { ...state,
      appointments: {...state.appointments, 
      [action.id]: {...state.appointments[action.id], interview: action.interview}
    }
  }
      return {
        ...newState, days: state.days.map(day => ({
          ...day, spots: getSpots(newState, day.name)
        }))
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

function getSpots(state, day) {
  return state.days
  .find(days => days.name === day)
  .appointments.reduce((accumulator, count) => {
    return state.appointments[count].interview ? accumulator : accumulator + 1;
  }, 0);
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW};