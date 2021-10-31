// Create JWT using 
import jwt from 'jsonwebtoken';

export function mock_JwtGen(username) {
    // Mocked variables to ensure testing integrity
    const secret = 'test_secret';
    const iat = 1635701127;

    const token = jwt.sign({
        "username": username,
        "iat": iat
      }, secret,
      { expiresIn: '1h'});
    
    return token;
}