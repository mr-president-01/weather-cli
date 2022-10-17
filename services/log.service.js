import chalk from 'chalk';
import dedent from 'dedent-js';

export function printError(error) {
    console.log(`${chalk.bgRed('ERROR')} ${error}`);
}

export function printSuccess(msg) {
    console.log(`${chalk.bgGreen('SUCCESS')} ${msg}`);
}

export function printHelp() {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without arguments - Weather output
        -s [CITY] - to establish the city
        -h - to Help output
        -t - to establish the token
        `
    );
}