/// Creating handlers for routes
import userInfos from "../models/userInfos.js";

export const retrieveUserData = async (req, res) => {
    try {
        const uName = req.body.uName;

        console.log(uName)

        /// Use with correct user/pass
        const retrievedData = await userInfos
                                        .findOne({username: uName});

        if (!retrievedData) {
            console.log("Can't find user");
            res.status(409).json({ message: error.message });
        } 
        else {
            console.log('User Found');
            res.status(200).send(retrievedData);
        }
        
    } catch (error) {
        console.log('internal error');
        res.status(404).json({ message: error.message });
        
    }
}