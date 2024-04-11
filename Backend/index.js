
import express from 'express';
import { PORT } from './config.js';
import {dbUrl} from './config.js'
import mongoose from 'mongoose';
import { User } from './Model/UsersModel.js';
import jwt from 'jsonwebtoken'
import cors from 'cors'
import {auth} from './authMiddleware.js'
let app = express() // when we  create an instance of the express server, it is assigned to the variable "app"const app = express();

app.use(express.json()); // parse requests of content-type - application/json
app.use(cors())
app.get('/', (req, res) => {
  res.send("Hello I am from update")
})

//Route for create user in db
app.post("/signup", async(req, res) => { 
  try {
    let { username, email, password, confirmpassword } = req.body
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).send("Required username, email, password, confirmpassword")
    }
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords do not match.")
    }

    let newUser = {
      username :  username ,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    }

    let emailExist = await User.findOne({ email: email})
    
    if (emailExist) {
      return res.status(400).send( "Email already exists in db." )
    }
    
    let user = await User.create(newUser);
    return res.status(201).send(user)

  } catch (error) {
    return res.status(500).send('internal server error')
  }
})

//Route for user login

app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send('Required email and password')
    }

    let existUser = await User.findOne({ email })
    console.log(existUser)

    if (!existUser) {
      return res.status(404).send('User not found')
    }
    if (existUser.password !== password) {
      return res.status(400).send('Invalid credentails')
    }

    // if (existUser) {
    //   return res.status(200).send('Login success')
    // }
    if (existUser.email && existUser.password) {
      let token = jwt.sign({ id: existUser._id }, 'secret', { expiresIn: '1d' })
      // console.log(token)
      return res.json({ token, userID: existUser._id})
    }
   } catch (error) {
    res.status(500).send("Internal Server Error");
   }
})

app.get('/home',auth, async(req, res) => {
  try {
    let exist = await User.findById(req.id);
    console.log('exist:', exist);
    if (!exist) {
      return res.send('User not found')
    }
    else {
      return res.json(exist)
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
})
mongoose.connect(dbUrl)
  .then(() => {
    console.log('DB connect Successfully')
    app.listen(PORT, () => {
  console.log(`SERVER STARTED IN PORT ${PORT}`);
})
  }).catch((err) => {
  console.log(err)
  })