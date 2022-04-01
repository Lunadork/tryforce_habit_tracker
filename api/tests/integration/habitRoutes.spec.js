
describe('Habitendpoints', () => {
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

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(6);
    })

    it('should return one habit when asked for only one by id', async() =>
    {
        const res = await request(api).get('/habits/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    })

    it('should increment timesDone by 1 for habit when asked to', async() =>
    {
        const res1 = await request(api).get('/habits/1');
        const res2 = await request(api)
                          .put('/habits/1')
                          .send({
                            id: 1,
                            operation: "increment",
                            userid: 1
                        });


        expect(res2.statusCode).toEqual(202);
        expect(res2.body.timesdone).toEqual(parseInt(res1.body.timesdone) +1);

        
    })

    it('should mark task done when done enough times ', async() =>
    {
        const res1 = await request(api)
                          .put('/habits/1')
                          .send({
                            id: 3,
                            operation: "increment",
                            userid: 1
                        });
        const res2 = await request(api)
                        .put('/habits/1')
                        .send({
                          id: 3,
                          operation: "increment",
                          userid: 1
                      });
                      const res3 = await request(api)
                      .put('/habits/1')
                      .send({
                        id: 3,
                        operation: "increment",
                        userid: 1
                    });
      
        
            


        expect(res2.statusCode).toEqual(202);
    })


    it('should decrement timesDone by 1 for habit when asked to', async() =>
    {
        const res1 = await request(api).get('/habits/6');
        const res2 = await request(api)
                          .put('/habits/6')
                          .send({
                            id: 6,
                            operation: "decrement",
                            userid: 1
                        });


        expect(res2.statusCode).toEqual(202);
        expect(res2.body.timesdone).toEqual(parseInt(res1.body.timesdone) -1);
    })

    it ('should create a habit when asked to', async() =>
    {
        const res = await request(api).post('/habits')
                          .send({ id: 99, title: "Test", frequency: 1, category: "Work" });

        expect(res.statusCode).toEqual(201);
    })

    it ('Should delete a habit when asked to', async() =>
    {
        const res = await request(api).delete('/habits/1');
        expect(res.statusCode).toEqual(204);
    })
    
})