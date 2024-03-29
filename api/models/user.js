const db = require ('../dbConfig/init');
const Habit = require('./habit');

module.exports = class User
{

    constructor(data)
    {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.rupees = data.rupees;
        this.profilepic = data.profilepic;
        this.xp = data.xp;
        this.level = data.level;
        this.xptarget = data.xptarget;
        this.src = data.src;
        this.hp = data.hp;   
        this.achievements = data.achievements;
        this.items = data.items;
    }


    static get all()
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                const result = await db.query(`SELECT users.id, users.username, users.email, users.rupees, users.profilePic, profilePics.src, users.level, users.xp, levels.xptarget, users.hp 
                                                FROM users 
                                                INNER JOIN levels 
                                                ON users.level = levels.id
                                                INNER JOIN profilePics
                                                ON users.profilePic = profilePics.id;`)
                const users = result.rows.map(a => new User(a));
                res(users);
            } 
            catch (err) 
            {
                rej("Error retrieving users");
            }
        });
    }


    static getById(id)
    {
        return new Promise(async (res, rej) =>
        {
            try
            {
                let userData = await db.query(`SELECT users.id, users.username, users.email, users.rupees, users.profilePic, profilePics.src, users.level, users.xp, levels.xptarget, users.hp 
                                                FROM users 
                                                INNER JOIN levels 
                                                ON users.level = levels.id
                                                INNER JOIN profilePics
                                                ON users.profilePic = profilePics.id
                                                WHERE users.id = $1;`, [id]);
                res(userData.rows[0]);
            }
            catch (err)
            {
                //intentional blank response
                res();
            }
        });
    }

    static getByUsername(name)
    {
        return new Promise(async (res, rej) =>
        {
            try
            {
                let userData = await db.query(`SELECT * FROM users WHERE username = $1;`, [name]);
                res(new User(userData.rows[0]));
            }
            catch (err)
            {
                //intentional blank response
                res();
            }
        });
    }

    static getByEmail(email)
    {
        return new Promise(async (res, rej) =>
        {
            try
            {
                let userData = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
                res(new User(userData.rows[0]));
            }
            catch (err)
            {
                //intentional blank response
                res();
            }
        });
    }

    static async create(userData)
    {
        let { username, email, password} = userData;
        let rupees = 0;
        let profilePic = 1;
        let xp = 1;
        let level = 1;
        let hp = 100;
        let achievements = [];
        let items = [];

        return new Promise (async (res,rej) => 
        {
            try 
            {
                let result = await db.query(`INSERT INTO users (username, email, password, rupees, profilePic, xp, level, hp, achievements, items)
                                                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, 
                                                          [username, email, password, rupees, profilePic, xp, level, hp, achievements, items])
                console.log(`User created with ID: ${result.rows[0].id}`);
                res(new User(result.rows[0]));
            }
            catch (err)
            {
                rej('User creatus failus');
            }
        });
    }

    destroy()
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [ this.id ]);

                const habits = await this.habits;

                let idsDeleted = [];

                try
                {
                    habits.array.forEach( async (habit) => 
                    {
                        idsDeleted.push(habit.title);
                        await habit.destroy();    
                    });
    
                    res(`user ${result.id} and habits ${idsDeleted} yeetus deeletus successus`)
                }
                catch (err)
                {
                    rej('Deleted user but the habits still remain... errored' + err)
                }

            } 
            catch (err) 
            {
                rej('user yeetus failus')
            }
        });
    }

    static update(updateData)
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                const result = await db.query(`UPDATE users SET profilePic = $1 WHERE id = $2 RETURNING *;`, [ updateData.profilePic, updateData.id ]);
                res(new User(result.rows[0]));
            } 
            catch (err) 
            {
                rej('User updatus yeetus wehas failus');
            }
        });
    }

    static habits(id)
    {

        return new Promise(async (res, rej) => 
        {
            try 
            {
                const result = await db.query('SELECT * FROM habits WHERE user_id = $1', [ id ]);
                let habits = result.rows.map(a => new Habit(a));
                res(habits);
            } 
            catch (err) 
            {
                rej('Habitus non existus or non findus');
            };
        });

    }

    static getXpTarget(id)
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                const result = await db.query(`SELECT users.id, users.level, levels.xptarget 
                                                FROM users 
                                                INNER JOIN levels
                                                ON users.level = levels.id
                                                WHERE users.id = $1 ;`, [ id ]);
                res(result.rows[0]);
            } 
            catch (err) 
            {
                rej('Habitus non existus or non findus');
            };
        });
    }

    static levelUp(id)
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                let result = await db.query(`SELECT level FROM users WHERE id = $1`,[id] )                
                let levelup = parseInt(result.rows[0].level) + 1;
                let updateResult = await db.query(`UPDATE users SET level = $1 WHERE id = $2 RETURNING *;`, [ levelup, id ]);
                res(new User(updateResult.rows[0]));
            } 
            catch (err) 
            {
                rej('User updatus yeetus wehas failus');
            }
        });
    }

    static addXP(id)
    {
        return new Promise(async (res, rej) => 
        {
            try 
            {
                let result = await db.query(`SELECT users.xp AS xp, users.level AS level, levels.xptarget AS xptarget
                                             FROM users 
                                             INNER JOIN levels
                                             ON users.level = levels.id
                                             WHERE users.id = $1;`,[id] )                
                let xp = parseInt(result.rows[0].xp) + 1;

                if(parseInt(xp) >= parseInt(result.rows[0].xptarget))
                {
                    console.log(`User ${id} leveled up - applying now!`)
                    try
                    {
                        let levelupResult = await this.levelUp(id);
                    }
                    catch (err)
                    {
                        rej("Failed to level up user");
                    }
                }

                let updateResult = await db.query(`UPDATE users SET xp = $1 WHERE id = $2 RETURNING *;`, [ xp, id ]);
                res(new User(updateResult.rows[0]));
            } 
            catch (err) 
            {
                rej('User updatus yeetus wehas failus');
            }
        });
    }

    static addRupees(id)
    {
        let newRupees = 0;
        return new Promise(async (res, rej) => 
        {
            // Get current value, set new rupees to = that + 1
            try
            {
                let result = await db.query('SELECT rupees FROM users WHERE id = $1;', [id]);
                newRupees = parseInt(result.rows[0].rupees) + 10;
            }
            catch (err)
            {
                rej("Couldn't get user current rupees");
            }

            try 
            {
                let result = await db.query('UPDATE users SET rupees = $1 WHERE id = $2;',[newRupees,id])
                console.log("Updated user " + id + " with 10 more rupees")
            }
            catch (err)
            {
                rej("Couldn't give the user more rupees");
            }
        })
    }
}