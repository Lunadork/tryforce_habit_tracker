describe('authndpoints', () => {
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

    
    it('should create a new user on request', async () => {

        const res = await request(api).post('/auth/register')
        .send({ username: "Test", email: "test@test.com", password: "12345678" });

        expect(res.statusCode).toEqual(201);

    })

    it('should reject a new user with short pass', async () => {

        const res = await request(api).post('/auth/register')
        .send({ username: "Test", email: "test@test.com", password: "11" });

        expect(res.statusCode).toEqual(409);

    })

    it('should reject a new user with taken username', async () => {

        const res = await request(api).post('/auth/register')
        .send({ username: "Zeiadork", email: "test@test.com", password: "123456789" });

        expect(res.statusCode).toEqual(409);

    })

    it('should reject a new user with taken email', async () => {

        const res = await request(api).post('/auth/register')
        .send({ username: "Test", email: "Zeiadork@gmail.com", password: "123456789" });

        expect(res.statusCode).toEqual(409);

    })

    it('Should let us log in after making that user with that user', async () => {

        const res = await request(api).post('/auth/register')
        .send({ username: "Test", email: "test@test.com", password: "12345678" });


        const res2 = await request(api).post('/auth/login')
        .send({username: "Test", password: "12345678"});

        expect(res2.statusCode).toEqual(200);

    })


    it('Should  reject log in with wrong pass', async () => {

        const res = await request(api).post('/auth/register')
        .send({ username: "Test", email: "test@test.com", password: "12345678" });


        const res2 = await request(api).post('/auth/login')
        .send({username: "Test", password: "12345678233"});

        expect(res2.statusCode).toEqual(401);

    })

})