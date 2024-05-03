#! /usr/bin/env node

import  inquirer from 'inquirer';
import chalk from 'chalk';
import {differenceInSeconds} from 'date-fns';

const answer = await inquirer.prompt(
    {
        message: "Please enter the amount of seconds.",
        type: "number",
        name: "seconds",
        validate : (input) => {
            if(isNaN(input)){
                return "Please enter a valid number."
                process.exit();
            }
            else if(input > 60){
                return "Please enter a number less than 60."
                process.exit();
            
            }
            else{
                return true;
            }
        }
    }
);
let input = answer.seconds;

function startTime(value: number){
    const initialValue = new Date().setSeconds(new Date().getSeconds() + value)
    const intervalTime = new Date(initialValue);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if(timeDiff <= 0){
            console.log(chalk.bold.red("Timer has expired!"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24))/ 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.bold.green(`${min.toString().padStart(2, "0")} minutes and ${sec.toString().padStart(2, "0")} seconds left`))
        }), 1000)
}

startTime(input)
