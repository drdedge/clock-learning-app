const generateReadingClock = (difficulty = 'medium') => {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Difficulty-based minute options
  let minuteOptions;
  if (difficulty === 'easy') {
    minuteOptions = [0, 30]; // Only o'clock and half past
  } else if (difficulty === 'medium') {
    minuteOptions = [0, 15, 30, 45]; // Quarter intervals
  } else {
    minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // All 5-minute intervals
  }

  const hour = hours[Math.floor(Math.random() * hours.length)];
  const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
  
  // timeString removed as it was revealing the answer in the question text
  
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

const generateTimeElapsed = (difficulty = 'medium') => {
  const startHours = Math.floor(Math.random() * 11) + 1;

  // Difficulty-based time intervals
  let startMinutes, elapsedOptions;
  if (difficulty === 'easy') {
    startMinutes = [0, 30][Math.floor(Math.random() * 2)];
    elapsedOptions = [30, 60]; // Simple half-hour and hour
  } else if (difficulty === 'medium') {
    startMinutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    elapsedOptions = [15, 30, 45, 60, 75, 90];
  } else {
    startMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)];
    elapsedOptions = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150];
  }
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

const generateTimeDifference = (difficulty = 'medium') => {
  const hour1 = Math.floor(Math.random() * 11) + 1;

  // Difficulty-based minute intervals
  let minute1, minute2;
  if (difficulty === 'easy') {
    minute1 = [0, 30][Math.floor(Math.random() * 2)];
  } else if (difficulty === 'medium') {
    minute1 = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  } else {
    minute1 = Math.floor(Math.random() * 12) * 5; // Any 5-minute interval
  }

  let hour2 = hour1 + Math.floor(Math.random() * (difficulty === 'easy' ? 2 : 4)) + 1;
  if (hour2 > 12) hour2 -= 12;

  if (difficulty === 'easy') {
    minute2 = [0, 30][Math.floor(Math.random() * 2)];
  } else if (difficulty === 'medium') {
    minute2 = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  } else {
    minute2 = Math.floor(Math.random() * 12) * 5;
  }
  
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

const generateScheduleProblem = (difficulty = 'medium') => {
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
  const startMinute = difficulty === 'easy' ? [0, 30][Math.floor(Math.random() * 2)] : [0, 15, 30, 45][Math.floor(Math.random() * 4)];

  // Easy: 1-2 activities, Medium: 2-3 activities, Hard: 3-4 activities
  const numActivities = difficulty === 'easy' ? Math.floor(Math.random() * 2) + 1 :
                         difficulty === 'medium' ? Math.floor(Math.random() * 2) + 2 :
                         Math.floor(Math.random() * 2) + 3;
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

const generateClockAngles = (difficulty = 'medium') => {
  // Easy: Simple angles at o'clock positions
  const easyTimes = [
    { hour: 3, minute: 0, angle: 90, description: "right angle" },
    { hour: 6, minute: 0, angle: 180, description: "straight angle" },
    { hour: 9, minute: 0, angle: 90, description: "right angle" }
  ];

  // Medium: Include quarter positions
  const mediumTimes = [
    ...easyTimes,
    { hour: 12, minute: 15, angle: 90, description: "right angle" },
    { hour: 12, minute: 30, angle: 180, description: "straight angle" }
  ];

  // Hard: More complex angles
  const hardTimes = [
    ...mediumTimes,
    { hour: 1, minute: 0, angle: 30, description: "acute angle" },
    { hour: 2, minute: 0, angle: 60, description: "acute angle" },
    { hour: 4, minute: 0, angle: 120, description: "obtuse angle" },
    { hour: 5, minute: 0, angle: 150, description: "obtuse angle" }
  ];

  const times = difficulty === 'easy' ? easyTimes :
                difficulty === 'medium' ? mediumTimes : hardTimes;

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

const generateSetClock = (difficulty = 'medium') => {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let minuteOptions;

  // Difficulty-based minute options
  if (difficulty === 'easy') {
    minuteOptions = [0, 30]; // Only o'clock and half past
  } else if (difficulty === 'medium') {
    minuteOptions = [0, 15, 30, 45]; // Quarter intervals
  } else {
    minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // All 5-minute intervals
  }

  const targetHour = hours[Math.floor(Math.random() * hours.length)];
  const targetMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];

  const timeWords = targetMinute === 0 ? `${targetHour} o'clock` :
                    targetMinute === 15 ? `quarter past ${targetHour}` :
                    targetMinute === 30 ? `half past ${targetHour}` :
                    targetMinute === 45 ? `quarter to ${targetHour === 12 ? 1 : targetHour + 1}` :
                    `${targetMinute} minutes past ${targetHour}`;

  const formatTime = (h, m) => {
    return `${h}:${m === 0 ? '00' : m}`;
  };

  return {
    question: `Set the clock to show ${timeWords}`,
    answer: formatTime(targetHour, targetMinute),
    category: "Time",
    skill: "Setting Clocks",
    tip: "Remember: quarter past = 15 minutes after, half past = 30 minutes after, quarter to = 15 minutes before",
    inputType: "text",
    clockTime: { hour: 12, minute: 0 } // Start at 12:00 for user to set
  };
};

const generateTimeWordProblem = (difficulty = 'medium') => {
  // Easy scenarios: Fewer steps, simpler times
  const easyScenarios = [
    {
      setup: "starts homework at 3:00 PM",
      events: [
        { action: "does maths", time: 30 },
        { action: "does English", time: 30 }
      ]
    },
    {
      setup: "begins lunch at 12:00 PM",
      events: [
        { action: "eats lunch", time: 30 },
        { action: "plays outside", time: 30 }
      ]
    }
  ];

  const mediumScenarios = [
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

  // Hard scenarios: More complex, irregular times
  const hardScenarios = [
    {
      setup: "starts their day at 6:45 AM",
      events: [
        { action: "gets ready", time: 25 },
        { action: "has breakfast", time: 35 },
        { action: "does chores", time: 40 },
        { action: "reads", time: 55 },
        { action: "leaves for school", time: 20 }
      ]
    },
    {
      setup: "begins activities at 2:35 PM",
      events: [
        { action: "does homework", time: 55 },
        { action: "practices instrument", time: 40 },
        { action: "has a snack", time: 20 },
        { action: "plays games", time: 65 }
      ]
    }
  ];

  const scenarios = difficulty === 'easy' ? easyScenarios :
                    difficulty === 'medium' ? mediumScenarios : hardScenarios;

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
  generateSetClock,
  generateTimeWordProblem
};

export default exports;