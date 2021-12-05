/// Creating handlers for routes
import { parse } from "dotenv";
import userInfos from "../models/userInfos.js";

export const retrieveUserData = async (req, res) => {
    try {
        const uName = req.body.uName;

        /// Use with correct user/pass
        const retrievedData = await userInfos
                                        .findOne({username: uName});

        if (!retrievedData) {
            console.log("Can't find user");
            res.status(409).json({ message: error.message });
        } 
        else {
            console.log('User Found - sending data');
            res.status(200).send(retrievedData);
        }
        
    } catch (error) {
        console.log('internal error');
        res.status(404).json({ message: error.message });
        
    }
}

export const updatePortfolio = async (req, res) => {
    try {
        const uName = req.body.postData.uName;
        const sym = req.body.postData.submittedSymbol;
        const quant = parseInt(req.body.postData.submittedQuant);
        const currPrice = parseFloat(req.body.postData.submittedPrice);

        // Update Portfolio
        const updatePort = await userInfos.updateOne(
            { username: uName }, 
            { 
                $inc: { [`portfolio.stocks.${sym}.quantity`]: quant },
                $set: { [`portfolio.stocks.${sym}.current_price`]: currPrice}
            }
        )

        if (!updatePort) {
            console.log("Error updating portfolio - Unable to find user");
            res.status(409).json({ message: error.message });
        } 
        else {
            console.log('Portfolio Successfully Updated.');
            res.status(200).send('Purchased ' + quant + ' share(s) of ' + sym);
        }

    } catch (error) {
        console.log('Server side error - Portfolio Update')
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}