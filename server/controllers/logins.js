/// Creating handlers for routes
import dev_databases from "../models/loginUser.js";
import JwtGen from "../utils/JwtGen.js";

export const validateUser = async (req, res) => {
    try {
        // TODO - add in decryption of user/pass
        const uName = req.body.postData.submittedUsername;
        const uPass = req.body.postData.submittedPass;

        console.log(uName, uPass);

        /// Check username/pass
        const retrievedData = await dev_databases
                                        .findOne({username: uName,
                                                  pass: uPass});

        console.log('After checking database');
        console.log(retrievedData);
        console.log('See retrieved data above');

        if (!retrievedData) {
            res.status(200).send('Invalid Credentials!')
        } else {
            console.log('User Properly Authenticated');

            console.log('Setting JWT token..');
            const token = JwtGen(uName);
            console.log('JWT Set.');

            // Send user the token
            res.status(200).send(token);
        }
        
    } catch (error) {
        console.log('we_errored_here');
        res.status(404).json({ message: error.message });
        
    }
}

