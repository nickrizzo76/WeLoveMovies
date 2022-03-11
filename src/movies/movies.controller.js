const service = require('./movies.service');

async function list(req, res, _next) {
    const { is_showing } = req.query;
    if(is_showing) {
        const data = await service.listShowing();
        //console.log(data);
        return res.json({ data });
    }    
    const data = await service.list();
    //console.log(data)
    res.json({ data })
}

module.exports = {
    list
}