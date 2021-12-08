/// Creating handlers for routes
import { parse } from "dotenv";
import userInfos from "../models/userInfos.js";
import stockInfo from '../models/stockInfo.js';

export const retrieveUserData = async (req, res) => {
    try {
        const uName = req.body.uName;

        /// Use with correct user/pass
        const retrievedData = await userInfos
                                        .findOne({username: uName});

        console.log(retrievedData)
        if (!retrievedData) {
            console.log("Can't find user");
            res.status(409).json({ message: error.message });
        } 
        else {
            console.log('User Found - sending data');
            console.log(retrievedData)
            res.status(200).send(retrievedData);
        }
        
    } catch (error) {
        console.log('internal error');
        res.status(404).json({ message: error.message });
        
    }
}

export const updatePortfolio = async (req, res) => {
    try {
        // Buy Logic
        if(req.body.postData.updateType === 'Buy') {
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
        }
        // Sell Logic
        else if(req.body.postData.updateType === 'Sell') {
            const uName = req.body.postData.uName;
            const sym = req.body.postData.submittedSymbol;
            const quant = parseInt(req.body.postData.submittedQuant);
            const maxQuantity = parseInt(req.body.postData.maxQuantity);

            console.log('Start query');
            console.log(req.body.postData);

            // Update Portfolio
            if (quant === maxQuantity) {

                console.log('Clear stock');

                // Pull stock from portfolio after purchase
                const updatePort = await userInfos.findOneAndUpdate(
                    { username: uName },
                    { $unset: { [`portfolio.stocks.${sym}`]: "" } }
                );

                if (!updatePort) {
                    console.log("Error updating portfolio - Unable to find user");
                    res.status(409).json({ message: error.message });
                } 
                else {
                    console.log('Portfolio Successfully Updated.');
                    res.status(200).send('Purchased ' + quant + ' share(s) of ' + sym);
                }
            }
            else {
                console.log('Normal Update');

                const updatePort = await userInfos.updateOne(
                    { username: uName }, 
                    { 
                        $inc: { [`portfolio.stocks.${sym}.quantity`]: -quant }
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
            }
        }

    } catch (error) {
        console.log('Server side error - Portfolio Update')
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const userInsights = async (req, res) => {
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
            console.log('User Found - Determining Insights');

            // Parse out symbols in array
            const symbols = Object.keys(retrievedData.portfolio.stocks);

            const industries = await stockInfo.aggregate([
                {$match: {Symbol: { $in: symbols } }},
                {$unwind: {path: '$Industry', preserveNullAndEmptyArrays: true}},
                {$group: {_id: null, uniqueIndustries: {$addToSet: '$Industry'}}}
                ]);
            
            // Grab the unique industries, prep blank dict
            const uniqueIndus = industries[0]['uniqueIndustries']
            var dataInsight = {'insights':{}};

            for(const indus of uniqueIndus) {
                // And finally, pull back some stocks in related industries
                const insights = await stockInfo.find(
                    {$and: [ { Industry: {$in: indus}}, {Symbol: {$nin: symbols}} ] }
                )
                
                dataInsight['insights'][indus]=[]
                dataInsight['insights'][indus].push(insights[0]['Symbol'],
                                        insights[1]['Symbol'],
                                        insights[2]['Symbol'])

            }
            // Send insights
            console.log(dataInsight)
            res.status(200).send(dataInsight);
        }
        
    } catch (error) {
        console.log('internal error');
        res.status(404).json({ message: error.message });
        
    }
}