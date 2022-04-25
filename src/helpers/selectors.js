    function getAppointmentsForDay(state, day) {

    const result = [];
    const filteredDay = state.days.filter(x => x.name === day) 

    if (filteredDay.length === 0 )
    return result;

    for (const el of filteredDay[0].appointments) {
      result.push(state.appointments[el]);
    }
    return result;
    };

    function getInterview(state, interview) {

      if (interview) {
      let interviewer = state.interviewers[interview.interviewer];
      return {...interview, interviewer}
      }
      return null
      };

      function getInterviewersForDay(state, day) {
        const results = [];
        const intDays = state.days.filter((intDay) => {
          return intDay.name === day;
        }) 

        if (intDays[0] === undefined) {
          return results;
        }
        intDays[0].interviewers.forEach((id) => {
          results.push(state.interviewers[id]);
        })
        return results;
      }
    export { getAppointmentsForDay, getInterview, getInterviewersForDay }