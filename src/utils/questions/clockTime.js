const generateReadingClock = () => {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minuteOptions = [0, 15, 30, 45];
  const hour = hours[Math.floor(Math.random() * hours.length)];
  const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
  
  const timeString = minute === 0 ? `${hour}:00` : 
                     minute === 15 ? `${hour}:15` :
                     minute === 30 ? `${hour}:30` : `${hour}:45`;
  
  const timeWords = minute === 0 ? `${hour} o'clock` :
                    minute === 15 ? `quarter past ${hour}` :
                    minute === 30 ? `half past ${hour}` : 
                    `quarter to ${hour === 12 ? 1 : hour + 1}`;
  
  const options = [];
  const correctOption = timeWords;
  options.push(correctOption);
  
  while (options.length < 4) {
    const randomHour = hours[Math.floor(Math.random() * hours.length)];
    const randomMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const wrongTime = randomMinute === 0 ? `${randomHour} o'clock` :
                      randomMinute === 15 ? `quarter past ${randomHour}` :
                      randomMinute === 30 ? `half past ${randomHour}` : 
                      `quarter to ${randomHour === 12 ? 1 : randomHour + 1}`;
    if (!options.includes(wrongTime)) {
      options.push(wrongTime);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return {
    question: `What time is shown on the clock?`,
    answer: options.indexOf(correctOption),
    options: options,
    correctAnswer: correctOption,
    category: "Time",
    skill: "Reading Clocks",
    tip: "Remember: quarter past = 15 minutes after, half past = 30 minutes after, quarter to = 15 minutes before",
    inputType: "multiple-choice",
    clockTime: { hour, minute }
  };
};

const generateTimeElapsed = () => {
  const startHours = Math.floor(Math.random() * 11) + 1;
  const startMinutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  const elapsedOptions = [15, 30, 45, 60, 75, 90, 105, 120];
  const elapsedMinutes = elapsedOptions[Math.floor(Math.random() * elapsedOptions.length)];
  
  let endHours = startHours;
  let endMinutes = startMinutes + elapsedMinutes;
  
  while (endMinutes >= 60) {
    endHours++;
    endMinutes -= 60;
    if (endHours > 12) endHours -= 12;
  }
  
  const formatTime = (h, m) => {
    return `${h}:${m === 0 ? '00' : m}`;
  };
  
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedMins = elapsedMinutes % 60;
  
  let elapsedText = '';
  if (elapsedHours > 0 && elapsedMins > 0) {
    elapsedText = `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} and ${elapsedMins} minutes`;
  } else if (elapsedHours > 0) {
    elapsedText = `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''}`;
  } else {
    elapsedText = `${elapsedMins} minutes`;
  }
  
  return {
    question: `If it is ${formatTime(startHours, startMinutes)} now, what time will it be in ${elapsedText}?`,
    answer: formatTime(endHours, endMinutes),
    category: "Time",
    skill: "Time Elapsed",
    tip: "Add the minutes first, then convert to hours if needed. Remember: 60 minutes = 1 hour",
    inputType: "text"
  };
};

const generateTimeDifference = () => {
  const hour1 = Math.floor(Math.random() * 11) + 1;
  const minute1 = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  
  let hour2 = hour1 + Math.floor(Math.random() * 4) + 1;
  if (hour2 > 12) hour2 -= 12;
  const minute2 = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  
  let totalMinutes = (hour2 - hour1) * 60 + (minute2 - minute1);
  if (totalMinutes < 0) totalMinutes += 12 * 60;
  
  const hours = Math.floor(totalMinutes / 60);
  
  const formatTime = (h, m) => {
    return `${h}:${m === 0 ? '00' : m}`;
  };
  
  return {
    question: `How much time passes between ${formatTime(hour1, minute1)} and ${formatTime(hour2, minute2)}?`,
    answer: totalMinutes,
    category: "Time",
    skill: "Time Difference",
    tip: `Calculate the hours difference (${hours} hours = ${hours * 60} minutes) and add the minutes difference`,
    inputType: "number",
    unit: "minutes"
  };
};

const generateScheduleProblem = () => {
  const activities = [
    { name: "swimming lesson", duration: 45 },
    { name: "piano practice", duration: 30 },
    { name: "homework", duration: 60 },
    { name: "reading", duration: 30 },
    { name: "lunch", duration: 45 },
    { name: "art class", duration: 60 },
    { name: "sports practice", duration: 90 }
  ];
  
  const startHour = Math.floor(Math.random() * 8) + 2;
  const startMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  
  const numActivities = Math.floor(Math.random() * 2) + 2;
  const selectedActivities = [];
  let totalMinutes = 0;
  
  for (let i = 0; i < numActivities; i++) {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    selectedActivities.push(activity);
    totalMinutes += activity.duration;
    
    if (i < numActivities - 1) {
      const breakTime = [15, 30][Math.floor(Math.random() * 2)];
      selectedActivities.push({ name: "break", duration: breakTime });
      totalMinutes += breakTime;
    }
  }
  
  let endHour = startHour;
  let endMinute = startMinute + totalMinutes;
  
  while (endMinute >= 60) {
    endHour++;
    endMinute -= 60;
    if (endHour > 12) endHour -= 12;
  }
  
  const formatTime = (h, m) => {
    return `${h}:${m === 0 ? '00' : m}`;
  };
  
  let schedule = `starts at ${formatTime(startHour, startMinute)}. `;
  selectedActivities.forEach((act, i) => {
    if (act.name === "break") {
      schedule += `They take a ${act.duration}-minute break. `;
    } else {
      schedule += `They do ${act.name} for ${act.duration} minutes. `;
    }
  });
  
  const name = ["Emma", "Tom", "Sarah", "Jack", "Lily", "Oliver"][Math.floor(Math.random() * 6)];
  
  return {
    question: `${name} ${schedule}What time does ${name} finish?`,
    answer: formatTime(endHour, endMinute),
    category: "Time",
    skill: "Schedule Problems",
    tip: `Add up all the time: ${totalMinutes} minutes = ${Math.floor(totalMinutes/60)} hours and ${totalMinutes % 60} minutes`,
    inputType: "text"
  };
};

const generateClockAngles = () => {
  const times = [
    { hour: 3, minute: 0, angle: 90, description: "right angle" },
    { hour: 6, minute: 0, angle: 180, description: "straight angle" },
    { hour: 9, minute: 0, angle: 90, description: "right angle" },
    { hour: 12, minute: 0, angle: 0, description: "no angle" },
    { hour: 12, minute: 15, angle: 90, description: "right angle" },
    { hour: 12, minute: 30, angle: 180, description: "straight angle" }
  ];
  
  const selected = times[Math.floor(Math.random() * times.length)];
  
  const formatTime = (h, m) => {
    return `${h}:${m === 0 ? '00' : m}`;
  };
  
  return {
    question: `At ${formatTime(selected.hour, selected.minute)}, what type of angle do the clock hands make?`,
    answer: selected.description,
    category: "Time",
    skill: "Clock Angles",
    tip: "Right angle = 90°, Straight angle = 180°, Acute angle < 90°, Obtuse angle > 90°",
    inputType: "text"
  };
};

const generateTimeWordProblem = () => {
  const scenarios = [
    {
      setup: "leaves school at 3:30 PM",
      events: [
        { action: "walks to the library", time: 20 },
        { action: "studies", time: 90 },
        { action: "walks to the shop", time: 15 },
        { action: "shops", time: 10 },
        { action: "walks home", time: 25 }
      ]
    },
    {
      setup: "starts their morning routine at 7:00 AM",
      events: [
        { action: "gets dressed", time: 15 },
        { action: "eats breakfast", time: 30 },
        { action: "brushes teeth", time: 5 },
        { action: "packs their bag", time: 10 },
        { action: "walks to school", time: 20 }
      ]
    },
    {
      setup: "begins homework at 4:15 PM",
      events: [
        { action: "does maths", time: 45 },
        { action: "takes a break", time: 15 },
        { action: "does English", time: 30 },
        { action: "does science", time: 30 }
      ]
    }
  ];
  
  const name = ["Ben", "Amy", "Sam", "Kate", "Max", "Zoe"][Math.floor(Math.random() * 6)];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  let totalMinutes = 0;
  let description = `${name} ${scenario.setup}. `;
  
  scenario.events.forEach((event, i) => {
    if (i === scenario.events.length - 1) {
      description += `Finally, ${name} ${event.action}, which takes ${event.time} minutes. `;
    } else if (i === 0) {
      description += `${name} ${event.action} for ${event.time} minutes. `;
    } else {
      description += `Then ${name} ${event.action} for ${event.time} minutes. `;
    }
    totalMinutes += event.time;
  });
  
  const startTimeStr = scenario.setup.match(/\d{1,2}:\d{2} [AP]M/)[0];
  const [time, period] = startTimeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let startHour = period === 'PM' && hours !== 12 ? hours + 12 : hours;
  if (period === 'AM' && hours === 12) startHour = 0;
  
  let endHour = startHour;
  let endMinute = minutes + totalMinutes;
  
  while (endMinute >= 60) {
    endHour++;
    endMinute -= 60;
  }
  
  let displayHour = endHour;
  let endPeriod = 'AM';
  
  if (endHour >= 12) {
    endPeriod = 'PM';
    if (endHour > 12) displayHour = endHour - 12;
  }
  if (endHour === 0) displayHour = 12;
  
  const answer = `${displayHour}:${endMinute < 10 ? '0' : ''}${endMinute} ${endPeriod}`;
  
  return {
    question: `${description}What time does ${name} finish?`,
    answer: answer,
    category: "Time",
    skill: "Complex Time Problems",
    tip: `Total time: ${totalMinutes} minutes = ${Math.floor(totalMinutes/60)} hours and ${totalMinutes % 60} minutes`,
    inputType: "text"
  };
};

const exports = {
  generateReadingClock,
  generateTimeElapsed,
  generateTimeDifference,
  generateScheduleProblem,
  generateClockAngles,
  generateTimeWordProblem
};

export default exports;