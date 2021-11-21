export function mock_buysell_handler(url, symbol) {
    let sym = symbol;
    let demo_url = url;
    console.log(demo_url);

    // To Do - query API to check validity of symbol
    if(sym === undefined) {
        return ('please provide a symbol')
    }
    else {
        const data = {
            "Global Quote": {
                "01. symbol": "IBM",
                "02. open": "116.4900",
                "03. high": "116.5600",
                "04. low": "115.2700",
                "05. price": "116.0500",
                "06. volume": "5384548",
                "07. latest trading day": "2021-11-19",
                "08. previous close": "116.6600",
                "09. change": "-0.6100",
                "10. change percent": "-0.5229%"
            }
        };

        let buyPrice = data['Global Quote']['05. price'];

        if(buyPrice === null || buyPrice === undefined || sym === 'Bad Symbol') {
            return ('Symbol not found!')
        } else {
            return buyPrice
        }
    }  
};