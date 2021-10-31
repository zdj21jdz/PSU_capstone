// Used to ensure the user's JWT is valid and signed to them
// Example data - { username: 'test', iat: 1635619670, exp: 1635623270 }
import jwt from 'jsonwebtoken';

export default function CheckJwt(token, uname) {
    if (!token || !uname) {
        return false;
    }
    
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const timeCheck = Math.floor(Date.now() / 1000);
        
        // Ensure token has not expired, username is correct, token expires in 1 hr
        if (data.exp > timeCheck && data.username == uname && (data.exp - data.iat == 3600)) {
            return true;
        } else {
            // Token is incorrect or expired
            return false;
    }
    } catch (error) {
        return false;
    }
    
}