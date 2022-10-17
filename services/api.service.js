import https from 'https';
import http from 'http';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import axios from 'axios';

export async function getWeather(city) {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('No API key, add it by "-t [API KEY]"');
    }
    const coord = await getCoordinates(city, token);
    const { lat, lon } = coord[0];
    
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat,
            lon,
            appid: token,
        }
    })
    return data;
}

async function getCoordinates(city, appid) {
    const { data } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            limit: 1,
            appid
        }
    })
    return data;
}