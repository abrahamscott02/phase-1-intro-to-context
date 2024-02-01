// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employee.timeOutEvents.find(
      (event) => event.date === date
    );
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((sum, date) => {
      return sum + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((sum, employee) => {
      return sum + allWagesFor(employee);
    }, 0);
    return totalPayroll;
  }
  
  // Sample data
  const twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3],
  ];
  
  const employees = createEmployeeRecords(twoRows);
  const employee = employees[0];
  
  createTimeInEvent(employee, "2021-10-01 09:00");
  createTimeOutEvent(employee, "2021-10-01 17:00");
  
  console.log(hoursWorkedOnDate(employee, "2021-10-01")); // Output: 8
  console.log(wagesEarnedOnDate(employee, "2021-10-01")); // Output: 16
  console.log(allWagesFor(employee)); // Output: 16
  console.log(calculatePayroll(employees)); // Output: 16