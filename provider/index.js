const axios = require('axios');

let cookie_session;

/**
 * authenticates axios with cookie info
 * @returns {Promise<AxiosResponse<T>>}
 */
async function postParkingLotAuthenticate(){
    const requestBody = {
        id: process.env.PARKINGLOT_ID,
        hash: process.env.PARKINGLOT_HASH,
    };
    const response = await axios.post(`${process.env.PROVIDER_URL}/api/parking_lot_authenticate`, requestBody, {
        withCredentials: true,
    });
    cookie_session=response.headers["set-cookie"][1];
    return response;
}

/**
 * updates a spot with appropriate request body
 * @param requestBody
 * @returns {Promise<AxiosResponse<T>>}
 */
async function putParkingLotSpotRequest(requestBody) {
    const response = await axios.put(`${process.env.PROVIDER_URL}/api/parking_lot/spot`, requestBody, {
        withCredentials: true,
        headers:{
            Cookie: cookie_session,
        },
    });
    return response;
}

/**
 * get request to cloud api for parking lot information
 * @returns {Promise<AxiosResponse<T>>}
 */
async function getParkingLotRequest(){
    const response = await axios.get(`${process.env.PROVIDER_URL}/api/parking_lot/${process.env.PARKINGLOT_HASH}`, {
        withCredentials: true,
        headers:{
            Cookie: cookie_session,
        },
    });
    return response;
}

module.exports = {postParkingLotAuthenticate, putParkingLotSpotRequest, getParkingLotRequest};
