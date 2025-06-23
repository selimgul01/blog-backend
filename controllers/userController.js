const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

 
const register = async (req,res) => {

    const {username, email, password } = req.body

    try {
        const userExist = await User.findOne({email})
        if (userExist) return res.status(400).json({message:"Bu Mail Zaten Kayıtlı"})
        if (password.length < 6) return res.status(400).json({message:"Parola En Az 6 Karakterden Oluşmalı "})
        if(!isEmail(email)) return res.status(400).json({message:"Geçersiz Email Adresi"})
        
        const hashedPass = await bcrypt.hash(password, 12)
        const newUser = await  User.create({ username, email, password: hashedPass })

        const token = jwt.sign({id:newUser._id }, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.status(201).json({message:"Kayıt Başarılı", user: newUser, token})
        
    } catch (error) {
        res.status(500).json({message:"Sunucu Hatası"})
        console.log("error:",error)
    } 
}

 


const login = async (req,res) =>  {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        
        if(!user) return res.status(400).json({message:"Böyle Bir Kullanıcı Kayıtlı Değil "})
       
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare) return res.status(400).json({message:"Şifreniz Yanlış "})

        const token = jwt.sign({id:user._id }, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.status(201).json({message:"Giriş Başarılı", user, token})

    } catch (error) {
        res.status(500).json({message:"Sunucu Hatası"})
        console.log("error:",error)
    } 
}

const getAllUser = async (req, res) => {
  try {
    const posts = await User.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Sunucu Hatası ${error}` });
  }
};



function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regex)) return true;
  else return false;
}

module.exports = {register , login, getAllUser}