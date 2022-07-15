const Item = require("../models/item");

async function getAll(req,res) 
{
    try
    {
        const items = await Item.all;
        res.status(200).json(items);
    }
    catch (err)
    {
        res.status(500).send(err);
    }
}

async function getById(req,res)
{
    try
    {
        const item = await Item.getById(req.params.id);
        res.status(200).json(item);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
}

module.exports = { getAll, getById };