
function getCoincidences(data) {
        if (!data || !data.trim()) {
            throw new Error("There is no data.");
        }

        const employees = {};
        const employeesInfo = data.trim().split(/\r?\n/);
        
        for (const employee of employeesInfo){
            const [name, schedule] = employee.split('=');
            employees[name] = parseSchedule(schedule);
        }
        
        const employeesPairs = {}
        const employeesName = Object.keys(employees);

        for (let i=0; i<employeesName.length-1; i++){
            for (let j=i+1; j<employeesName.length; j++){

                let employeeA = employees[employeesName[i]];
                let employeeB = employees[employeesName[j]];

                const coincidences = countCoincidences(employeeA,employeeB);
                
                if (coincidences > 0){
                    employeesPairs[`${employeesName[i]} - ${employeesName[j]}`] = coincidences;
                }
            }
        }

        return employeesPairs;
}

function parseSchedule(schedule) {
    const scheduleArr = schedule.split(",").map(date => {
        const day = date.substring(0,2);
        const [startHour, endHour] = date.substring(2).split('-');
        const start = stringHourtoMinutes(startHour);
        const end = stringHourtoMinutes(endHour);

        return {day, start, end};
    })

    return scheduleArr
}

function stringHourtoMinutes(hour) {
    const [hours, minutes] = hour.split(':').map(x => parseInt(x));
    if (hours > 23 || minutes > 59) {
        throw new Error("The time value is invalid.");
    }
    return hours * 60 + minutes;
}

function countCoincidences(employeeA, employeeB) {
    let count = 0;
    for (let intervalA of employeeA){
        for (let intervalB of employeeB){
            if(intervalA.day === intervalB.day && intervalA.start < intervalB.end && intervalA.end > intervalB.start){
                count++;
            }
        }
    }
    return count;
}

module.exports = {
    getCoincidences,
    parseSchedule,
    stringHourtoMinutes,
    countCoincidences
}