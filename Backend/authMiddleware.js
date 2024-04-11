
import jwt from 'jsonwebtoken'

export let auth = (req, res, next) => {
  try{
  var token = req.header('myToken');
  console.log(token)
    if (!token) {
      return res.send('Token not Found')
    }
    else {
      var decode = jwt.verify(token, 'secret')
      console.log('decode:', decode);
      req.id = decode.id
      console.log("after decode:", decode.id)
      next()
    }
  } catch (err) {
    console.log(err)
  }
}