const db = require("../dbConfig/init");

module.exports = class Achievement {
    constructor(data)
    {
        this.id = data.id;
        this.name = data.name;
        this.imgsrc = data.imgsrc;
    };

    static get all() 
    {
        return new Promise(async (res,rej) =>
        {
            try
            {
                let achievementData = await db.query("SELECT * FROM achievements");
                let achievements = achievementData.rows.map((a) => new Achievement(a));
                res(achievements);
            }
            catch (err)
            {
                rej(`Error fetching achievements, err: ` +err);
            }
        });
    }

    static getById(id)
    {
        return new Promise(async (res,rej) => 
        {
            try
            {
                let achievementData = await db.query("SELECT * FROM achievements WHERE id = $1", [id])
                let achievement = new Achievement(achievementData.rows[0]);
                res(achievement)
            }
            catch (err)
            {
                rej("Achievement not found, err: " +err)
            }
        });
    }


}