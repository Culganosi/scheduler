import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors";

export default function Application() {
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
    })
  }, [])

    return (
    <main className="layout">
      <section className="sidebar">
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList 
        days={state.days} 
        day={state.day} 
        setDay={setDay} 
      />
      </nav>
      <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {/* { Object.values(dailyAppointments).map((appointment) => {
        return ( */}

          {getAppointmentsForDay(state, state.day).map(x => <Appointment key={x.id} {...x}/>)}



      <Appointment key="last" time="5pm" />
      </section>
    </main>
);
}
