export function mock_buysell(data, test) {
    // Determine which test we're doing
    if(test === 'Radio') {
        // Run Radio test
        if(data === 1) {
            return 1
        }
        else {
            return 'error'
        }
    }
    else if (test === 'limit') {
        // Test sell limit
        const max = data[0];
        const bad = data[1];
        const good = data[2];

        if(bad > max && good <= max) {
            return true
        } else { return false}
    }
    else if (test === 'price') {
        const testStock = data;
        if (testStock === 'AAPL') {
            return (130.45)
        }
    }
    else if (test === 'stock') {
        if (data === 'AAPL') {
            return true
        } else { return 'Stock DNE' }
    }
    else {
        console.log('Error!');
    }
    
};