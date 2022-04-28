import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data,
      }));
    })
    .catch((err) => {
      console.log("error", err);
    });
  }, []);

  function dayFinder(day) {
    const weekDays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    }
    return weekDays[day]
  }

function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const weekDay = dayFinder(state.day)
    let day = {
      ...state.days[weekDay],
      spots: state.days[weekDay]
    }
    
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[weekDay],
        spots: state.days[weekDay].spots - 1
      }
    } else {
      day = {
        ...state.days[weekDay],
        spots: state.days[weekDay].spots
      }
    }

    let weekDays = state.days
    weekDays[weekDay] = day;

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({...state, appointments, weekDays });
      })
    };


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const weekDay = dayFinder(state.day)

    const day = {
      ...state.days[weekDay],
      spots: state.days[weekDay].spots + 1
    }

    let weekDays = state.days
    weekDays[weekDay] = day;
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then((res) => {
      setState({...state, appointments, weekDays });
  });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
}
}
export default useApplicationData;