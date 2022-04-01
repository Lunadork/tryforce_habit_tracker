//const { request } = require("../../server");

describe('User endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    });

    it('should return a list of all users in database', async () => {
        const res = await request(api).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });

    it('should return a single user', async () => {
        const res = await request(api).get('/users/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    });
    
    it('should return a list of habits by a specific user', async () => {
        const res = await request(api).get('/users/1/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(4);
    });

    it('should return the xp target of a single user', async () => {
        const res = await request(api).get('/users/1/xptarget');
        expect(res.statusCode).toEqual(200);
        expect(res.body.xptarget).toEqual(2);
    });

    it('Should accept instruction to add XP to a user - and update correctly.', async () =>
    {

        const res1 = await request(api).get('/users/1');
        const res2 = await request(api).put('/users/1/addxp');
        const res3 = await request(api).put('/users/1/addxp');
        const res4 = await request(api).put('/users/1/addxp');
        const res5 = await request(api).put('/users/1/addxp');

        console.log("lvl"+res1.body.level);
        console.log("lvle" + res5.body.level);

        expect(res2.statusCode).toEqual(202);
        expect (res2.body.xp).toEqual(parseInt(res1.body.xp) + 1);
    })

    it('Should accept instruction to level up a user - and update correctly.', async () =>
    {

        const res1 = await request(api).get('/users/1');
        const res2 = await request(api).put('/users/1/levelup');

        expect(res2.statusCode).toEqual(202);
        expect (res2.body.level).toEqual(parseInt(res1.body.level) + 1);
    })

    it('Should update profile pic when asked to', async () =>
    {
        const res = await request(api).put('/users/1')
        .send({ id: 1, profilePic: 2});

        expect(res.body.profilepic).toEqual(2);
    })

    it('Should destroy user when asked to', async() =>
    {
        const res = await request(api).delete('/users/1');
        expect(res.statusCode).toEqual(204);
    })

})