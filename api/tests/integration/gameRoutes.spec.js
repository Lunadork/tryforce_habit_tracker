describe('gameendpoints', () => {
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

    
    it('should return a list of all levels in database', async () => {
        const res = await request(api).get('/game/levels');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(100);
    })

    it('should return one level when asked for only one by id', async() =>
    {
        const res = await request(api).get('/game/levels/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    })

})