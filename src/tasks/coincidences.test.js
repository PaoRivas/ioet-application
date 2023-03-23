const {getCoincidences, parseSchedule, stringHourtoMinutes, countCoincidences} = require("./coincidences.js");

// test getCoincidences
let setOfValues = `RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU21:00-22:00
OLIVER=MO09:15-10:00,TU10:00-12:30,TH13:00-13:15,SA14:00-18:00
PERCY=MO08:00-10:00,WE12:00-15:00,TH12:00-14:00
ANDREA=TU08:00-12:00,WE12:00-14:00,SA01:00-08:00,SU00:00-01:00
MARIELA=SA03:00-10:00`

test('get coincidences in inputOne', () => {
  expect(getCoincidences(setOfValues)).toEqual({
    'RENE - ASTRID': 2,
    'RENE - ANDRES': 1,
    'RENE - OLIVER': 2,
    'RENE - ANDREA': 1,
    'ASTRID - ANDRES': 2,
    'ASTRID - OLIVER': 1,
    'ASTRID - PERCY': 1,
    'ANDRES - OLIVER': 1,
    'ANDRES - PERCY': 1,
    'OLIVER - PERCY': 2,
    'OLIVER - ANDREA': 1,
    'PERCY - ANDREA': 1,
    'ANDREA - MARIELA': 1
  });
});

test('get coincidences with no data', () => {
    expect(() => getCoincidences(' ')).toThrow('There is no data.');
});

test('get coincidences with null value', () => {
    expect(() => getCoincidences(null)).toThrow('There is no data.');
});

test('get coincidences with undefined value', () => {
    expect(() => getCoincidences(undefined)).toThrow('There is no data.');
});

let singleValue = `RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00`

test('input with one value', () => {
  expect(getCoincidences(singleValue)).toEqual({});
});

// test parseSchedule
describe('schedule array verification', () => {
    const schedule = parseSchedule('TU10:00-12:00,SU20:00- 21:00');
    test('parseSchedule is an array', () => {
        expect(Array.isArray(schedule)).toBe(true);
    });

    test('parse schedule into an array of objects', () => {
        expect(schedule).toContainEqual({day:'TU', start:600, end:720});
    });
});

// test stringHourtoMinutes
test('convert hour to minutes with an invalid hour', () => {
    expect(() => stringHourtoMinutes('24:10')).toThrow('The time value is invalid.');
});

test('check if the hour is within the limit of minutes', () => {
    const value = stringHourtoMinutes('14:28')
    expect(value).toBeLessThanOrEqual(1439); // 23 * 60 + 59 maximum number of minutes in a day
});

// test countCoincidences
const empA = [
    { day: 'MO', start: 480, end: 600 },
    { day: 'WE', start: 720, end: 900 },
    { day: 'TH', start: 720, end: 840 }
  ];
const empB = [
    { day: 'TU', start: 480, end: 720 },
    { day: 'WE', start: 720, end: 840 },
    { day: 'SA', start: 60, end: 480 },
    { day: 'SU', start: 0, end: 60 }
  ];
  
test('count coincidences between empA and empB', () => {
    expect(countCoincidences(empA, empB)).toBe(1);
});

const empC = [
    { day: 'FR', start: 480, end: 600 },
    { day: 'WE', start: 720, end: 900 },
    { day: 'TH', start: 720, end: 840 }
  ];
const empD = [
    { day: 'WE', start: 720, end: 900 },
    { day: 'TH', start: 720, end: 840 },
    { day: 'FR', start: 480, end: 600 },
  ];
  
test('count coincidences between empA and empB', () => {
    expect(countCoincidences(empC, empD)).toBe(3);
});

const empE = [
    { day: 'FR', start: 480, end: 600 },
    { day: 'WE', start: 720, end: 900 },
    { day: 'TH', start: 720, end: 840 }
  ];
const empF = [
    { day: 'MO', start: 720, end: 900 },
    { day: 'SA', start: 720, end: 840 },
    { day: 'TU', start: 480, end: 600 },
  ];
  
test('count coincidences between empA and empB', () => {
    expect(countCoincidences(empE, empF)).toBe(0);
});