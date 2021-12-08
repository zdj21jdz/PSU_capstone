import mongoose from 'mongoose';

const stockSchema = mongoose.Schema({
    Symbol: String,
    Cname: String,
    Industry: String,
    marketCap: String
}, {collection: 'stock_info'});

const stockInfo = mongoose.model('stock_info', stockSchema)

export default stockInfo;