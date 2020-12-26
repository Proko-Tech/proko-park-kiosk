const tokenUtil = require('../auth/tokenUtil');

/**
 * verifies cookie token for each parking spot, and returns info back from cookie to req.spotInfo.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function verifyCookieToken(req, res, next) {
    const spotToken = req.cookies.spotInfo;
    const spotInfo = spotToken?await tokenUtil.validateToken(spotToken):null;
    if (spotInfo) {
        req.spotInfo = spotInfo.spotInfo;
        next();
    } else {
        res.status(404)
            .json({status:'failed', data: 'Session over'});
    }
}

module.exports=verifyCookieToken;