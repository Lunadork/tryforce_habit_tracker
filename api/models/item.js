const db = require("../dbConfig/init");

module.exports = class Item {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.dtext = data.dtext;
        this.imgsrc = data.imgsrc;
        this.cost = data.cost
    }

    static get all()
    {
        return new Promise(async (res, rej) => 
        {
            try
            {
                let itemData = await db.query("SELECT * FROM items;");
                let items = itemData.rows.map((a) => new Item(a));
                res(items);
            }
            catch (err)
            {
                rej(`Error fetching items, err: ` +err)
            }
        });
    }


    static getById(id) 
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                let itemData = await db.query("SELECT * FROM items WHERE id = $1;", [id]);
                let item = new Item(itemData.rows[0]);
                res (item);
            }
            catch (err)
            {
                rej ('Item not found, err: ' +err)
            }
        })
    }




}