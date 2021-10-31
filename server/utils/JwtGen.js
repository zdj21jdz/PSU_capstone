// Create JWT using 
import jwt from 'jsonwebtoken';

export default function JwtGen(username) {
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({
        "username": username,
        "iat": Math.floor(Date.now() / 1000)
      }, secret,
      { expiresIn: '1h'});
    
    return token;
}