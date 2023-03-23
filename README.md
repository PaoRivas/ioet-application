# ioet_application
The "ioet-application" is a command-line program written in JavaScript that calculates the number of overlapping hours worked by different employees within a given time frame.

## Overview

The program reads a text file containing work schedules for different employees and calculates the total number of hours that two or more employees have worked at the same time. The input file should have the following format:

```bash
<employee-name>: <day-of-week> <start-time>-<end-time>, <day-of-week> <start-time>-<end-time>, ...
```

where `<employee-name>` is a string representing the name of the employee, `<day-of-week>` is a string representing the day of the week (e.g., "MO" for Monday), and `<start-time>` and `<end-time>` are strings representing the start and end times of the work interval, respectively.

The program outputs the total number of overlapping hours worked by different employees, grouped by pairs of employees.

## Architecture

The application is written in JavaScript and uses the Node.js runtime environment. The program consists of two code files, including `index.js`, which is responsible for reading the input file and also prints the output to the console, and `coincideces.js`, which contains helper functions used throughout the program.

The program follows a modular design pattern, with each module responsible for a specific task. The index.js file is the entry point for the program and coordinates the interaction between the existing module.

## Approach and Methodology

The program reads the input file line by line and separates the employee name from their schedule information. The schedule information is then parsed to extract the days and times when the employee was in the office. This information is stored in an object where each key represents an employee's name and each value represents an array of objects where each object has the data of the day, the start and end hour worked.

Once the object is created, the program iterates through each combination of employees and calculates the number of overlapping hours between their schedules. The output table is then generated, which shows the pairs of employees that have coincided in the office and the number of overlapping hours.

## Getting Started

### Prerequisites
  
  - NodeJS
  
### Installation

1. Clone the repository to your local machine.

```bash
  git clone https://github.com/PaoRivas/ioet-application.git.
```
2. Open a terminal or command prompt and navigate to the root directory of the repository.

3. Install the required dependencies by running the following command:

```bash
  npm install
```

### Run locally

1. Create a text file containing the work schedules for different employees. The file should be in the format mentioned above.

2. Run the program by running the following command:

```bash
  npm start <path_to_input_file>
```
Note: Replace `<path_to_input_file>` with the actual path to your file created in step 1.

3. To run unit test:

```bash
  npm test
```

That's it! You should now be able to run the "ioet-application" program locally on your machine. If you have any questions or issues, please refer to the documentation or open an issue on the GitHub repository.
