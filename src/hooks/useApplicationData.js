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

function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({...state, appointments });
      })
    };
    //       const isEditingAppointment = prev.appointments[id].interview
    //       console.log("isEditingAppointment", isEditingAppointment)
    //       const updatedDays = prev.days.map(day => {
    //         return {
    //           ...day,
    //           spots: day.name === prev.day && !isEditingAppointment ? day.spots - 1 : day.spots
    //         }
    //       })
    //       return { ...prev, appointments, days: updatedDays }
    //     })
    //   })
    // }
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
  
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
}
}
export default useApplicationData;