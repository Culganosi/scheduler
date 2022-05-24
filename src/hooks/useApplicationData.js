import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW} from "../reducer/applicationData"

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {
        dispatch({ type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};
export default useApplicationData;