const Achievement = require('../models/achievement');

async function getAll(req,res)
{
    try
    {
        const achievements = await Achievement.all;
        res.status(200).json(achievements);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
}

async function getById(req,res)
{
    try
    {
        const achievement = await Achievement.getById(req.params.id);
        res.status(200).json(achievement);
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

module.exports = { getAll, getById}