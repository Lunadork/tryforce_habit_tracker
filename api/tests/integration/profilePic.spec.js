describe('profilePicendpoints', () => {
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
    })

    
    it('should return a list of all profile pics in database', async () => {
        const res = await request(api).get('/pfp');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(5);
    })

    it('should return one profile pic when asked for only one by id', async() =>
    {
        const res = await request(api).get('/pfp/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    })

})