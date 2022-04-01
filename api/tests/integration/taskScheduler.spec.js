const Scheduler = require('../../taskScheduler');

describe("Test send fail email", async () => {

    test('it should send fail email successfully when given a habit object', () => 
    {
      let res = Scheduler.sendFailEmail(
          {id: 1, user_id: 1, title: "Test", frequency: 1, streak: 10, category: "Work", timesdone: 10, completed: true, daysexist: 5, dayscompleted: 5})

        console.log(res);

        expect(res).toBeInstanceOf(Object);
            
    });

    test('it should send streak email successfully when given a habit object', async () => 
    {
      let res = Scheduler.sendStreakEmail(
          {id: 1, user_id: 1, title: "Test", frequency: 1, streak: 10, category: "Work", timesdone: 10, completed: true, daysexist: 5, dayscompleted: 5})

        console.log(res);

        expect(res).toBeInstanceOf(Object);
            
    });

   });