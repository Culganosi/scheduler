function getAppointmentsForDay(state, day) {

  const result = [];
  const filteredDay = state.days.filter(x => x.name === day);

  if (filteredDay.length === 0)
    return result;

  for (const el of filteredDay[0].appointments) {
    result.push(state.appointments[el]);
  }
  return result;
};

function getInterview(state, interview) {

  if (interview) {
    let interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  }
  return null;
};

function getInterviewersForDay(state, dayName) {
  const results = [];
  const day = state.days.find(d => d.name === dayName)
  if (!day) {
    return [];
  }
  for (const id of day.interviewers) {
    const interviewer = state.interviewers[id]
    results.push(interviewer)
  }
  return results;
}
export { getAppointmentsForDay, getInterview, getInterviewersForDay };