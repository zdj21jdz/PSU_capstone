/// Creating handlers for routes
import dev_databases from "../models/loginUser.js";

export const validateUser = async (req, res) => {
    try {
        const uName = req.body.submittedUsername;
        const uPass = req.body.submittedPass;

        /// Use with correct user/pass
        const retrievedData = await dev_databases
                                        .findOne({username: uName,
                                                  pass: uPass});

        

        console.log(retrievedData)

        if (!retrievedData) {
            res.status(200).send('Invalid Credentials!')
        } else {
            console.log('Good!');
            res.status(200).send(retrievedData);
        }
        
    } catch (error) {
        console.log('we_errored_here');
        res.status(404).json({ message: error.message });
        
    }
}

