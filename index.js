'use strict';

const http = require('./httpserver');

http.listen('3000', function(req,res) {
    console.log('Server running at 3000');
});
