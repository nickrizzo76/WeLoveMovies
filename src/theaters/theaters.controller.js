const service = require("./theaters.service");

async function read(req, res, next) {
    console.log("reading theaters")
    const data = await service.read(res.locals.movieId)
    if(data) {
        return res.json({ data })
    }
    next({
        status: 404,
        message: "That movie is not currently playing in theaters" // message not specified by test cases
    })
}

async function list(req, res, next) {
    const data = await service.list()
    if(data) {
        return res.json({ data })
    }
    next({
        status: 404,
        message: "There are no theaters" // message not specified by test cases
    })
}

module.exports = {
    read,
    list,
}