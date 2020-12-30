const axios = require('axios');


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
    const cookie_session=response.headers["set-cookie"][1];
    axios.defaults.headers.common['Cookie'] = cookie_session?cookie_session:'';
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
    });
    return response;
}

module.exports = {postParkingLotAuthenticate, putParkingLotSpotRequest, getParkingLotRequest};
