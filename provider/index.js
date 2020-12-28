

/**
 * 
 * @returns {Promise<void>}
 */
async function authenticateParkingLotRequest(){

    const data = JSON.stringify({
        todo: 'Buy the milk',
    })

    const options = {
        hostname: 'http://ec2-52-53-246-255.us-west-1.compute.amazonaws.com/',
        port: 80,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    }

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data)
    req.end()
}


async function putParkingLotRequest() {

}

async function getParkingLotRequest(){

}

module.exports = {putParkingLotRequest, getParkingLotRequest};
