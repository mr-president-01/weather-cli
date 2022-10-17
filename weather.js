#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

async function initCLI() {
    const args = getArgs(process.argv);
    
    if (args.h) {
        printHelp();
    };
    if (args.t) {
        return saveToken(args.t);
    };
    if (args.s) {
        await saveKeyValue(TOKEN_DICTIONARY.city, args.s);
    };

    getForecast();
}

async function saveToken(token) {
    if (!token) {
        printError('No token!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token was saved!');
    } catch(e) {
        printError(e.message);
    }
}

async function getForecast() {
    try {
        const weather = await getWeather(await getKeyValue(TOKEN_DICTIONARY.city));
        console.log(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Wrong city!');
        } else if (e?.response?.status === 401) {
            printError('Wrong token!');
        } else {
            printError(e.message);
        }
    }
}

initCLI();