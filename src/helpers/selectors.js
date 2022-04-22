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

      // const result = [];
      // const filteredDay = state.days.filter(x => x.name === day) 
      
      // if (interview === true) {
      if (interview) {
      let interviewer = state.interviewers[interview.interviewer];
      return {...interview, interviewer}
      }
      return null
      };

    export { getAppointmentsForDay, getInterview }