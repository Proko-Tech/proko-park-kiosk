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
 * updates a spot with appropriate request body.
 *
 * NOTE: Will be removed after beta testing.
 * @param requestBody
 * @returns {Promise<AxiosResponse<T>>}
 */
async function putV0ParkingLotSpotRequest(requestBody) {
    const response = await axios.put(`${process.env.PROVIDER_URL}/api/v0_parking_lot/spot`, requestBody, {
        withCredentials: true,
    });
    return response;
}

/**
 * get request to cloud api for parking lot information
 *  * @param requestBody
 * @returns {Promise<AxiosResponse<T>>}
 */
async function postParkingLotRequest(requestBody){
    const response = await axios.post(`${process.env.PROVIDER_URL}/api/parking_lot/${process.env.PARKINGLOT_HASH}`, requestBody, {
        withCredentials: true,
    });
    return response;
}

/**
 * post request to check if user scan is valid
 * @param requestBody
 * @returns {Promise<AxiosResponse<T>>}
 */
async function postParkingLotScannedRequest(requestBody){
    const response = await axios.post(`${process.env.PROVIDER_URL}/api/parking_lot/scan`, requestBody, {
        withCredentials: true,
    });
    return response;
}

/**
 * post request to send spot violation
 * @param requestBody
 * @returns {Promise<AxiosResponse<T>>}
 */
async function postSpotViolationRequest(requestBody){
    const response = await axios.post(`${process.env.PROVIDER_URL}/api/parking_lot/violation`, requestBody, {
        withCredentials: true,
    });
    return response;
}

async function getLotReservationsCountRequest() {
    const response = await axios.get(`${process.env.PROVIDER_URL}/api/parking_lot/reservations_count`, {
        withCredentials: true,
    });
    return response;
}

async function postSuggestedPrice(requestBody) {
    const response = await axios.post(`${process.env.PROVIDER_URL}/api/parking_lot/suggested_price`, requestBody, {
        withCredentials: true,
    });
    return response;
}

module.exports = {postParkingLotAuthenticate, putParkingLotSpotRequest, putV0ParkingLotSpotRequest, postParkingLotRequest, postParkingLotScannedRequest, postSpotViolationRequest, getLotReservationsCountRequest, postSuggestedPrice};
