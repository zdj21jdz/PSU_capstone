/// Creating handlers for routes
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
        const price = req.body.postData.submittedPrice;

        // Update Portfolio
        const updatePort = await userInfos
                                .bulkWrite({
                                    updateOne: {
                                      filter: { username: uName,
                                        portfolio: {stocks: sym} },
                                      update: {
                                        $set: {
                                          portfolio: {
                                              stocks: {
                                                  sym: {
                                                      'quantity': 1,
                                                      'current_price': price
                                                  }
                                              }
                                          }
                                        }
                                      }
                                    }
                                });

    } catch (error) {
        console.log('internal error - Portfolio Update')
        res.status(404).json({ message: error.message });
    }
}