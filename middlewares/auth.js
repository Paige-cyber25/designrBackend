
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  // console.log(req.headers.authorization.split(' ')[1])
  
 try {
     const token = req.headers['x-access-token']
    //  console.log(token)
     if (!token)
       return res.send({ msg: 'Access denied', msgType: 'error' }).status(401)
        // const token = awairization.split(" ")[1];
        // if(!token) return res.status(401).json({msg: 'unauthorized'})
        const isCustomAuth = token.length < 500
        let decodedData;
        if(token && isCustomAuth) {
            // console.log('nprmal-auth')
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData.id
        } else{
            // console.log('google-auth')
            decodedData = jwt.decode(token)
            req.userId = decodedData.sub
        }

        next()
    } catch (error) {
        return error
    }
}
// module.exports = auth