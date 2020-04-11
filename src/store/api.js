import axios from 'axios';

const host = 'https://qmarsala-shadow-box.builtwithdark.com';

const client = axios.create({
    baseURL: host,
    timeout: 3000,
});

async function getMoves() {
    try {
        const response = await client.get('/moves');
        console.log('get moves');
        console.log(response);
        return response.data.moves;
    } catch (error) {
        console.error(error);
    }
}

async function getCombos() {
    try {
        const response = await client.get('/combos');
        return response.data.combos;
    } catch (error) {
        console.error(error);
    }
}

async function createCombo(payload) {
    try {
        const response = await client.post('/combos', payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default {
    getCombos,
    getMoves,
    createCombo
}