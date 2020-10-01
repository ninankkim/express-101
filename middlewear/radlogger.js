function radLogger(req, res, next) {
    console.log('SWEET REQUEST BR0:');
    console.log(`New ${req.method} request at ${req.url}`);
    console.log('Req Query: ', req.query);
    next();
}

module.exports = radLogger;