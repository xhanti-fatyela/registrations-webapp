let assert = require('assert');

  const Registrations = require("../registrations");
  


const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registrations';

const pool = new Pool({
    connectionString
});


const registrations = Registrations(pool);

describe('The Registration App Factory Function', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from reg_numbers;");
    });


        describe("The regAdd() should add a reg number that is entered ", function(){
            it("should return true if a reg number is added", async function () {


                var actual = await registrations.regAdd("CA 123 456")
                var expected = true
        
                assert.strictEqual(actual, expected)
        
        
            });

        })
        describe("The doesRegExist() should not duplicate", function(){
            it("should not duplicate a reg if it already exist", async function () {

                await registrations.regAdd("CA 123 456")
                var actual = await registrations.doesRegExist("CA 123 456")
                var expected = 1
        
                assert.strictEqual(actual, expected)
        
        
            });

            it("should not duplicate a reg if it already exist", async function () {

                var actual = await registrations.doesRegExist("CA 123 456")
                var expected = 0
        
                assert.strictEqual(actual, expected)
        
        
            });

        })

        describe("The displayallRegs() return all the reg numbers ", function(){
            it("should return all the reg numbers that are entered", async function () {

                await registrations.regAdd("CA 245 816")
                await registrations.regAdd("CA 323 455")
                var actual = await registrations.displayallRegs()
                var expected = [ { reg: 'CA 245 816' }, { reg: 'CA 323 455' } ]

        
                assert.deepStrictEqual(actual, expected)
        
        
            });

        })


        describe("The filterRegs() return all the reg numbers ", function(){
            it("should filter reg by selected town", async function () {

                await registrations.regAdd("CA 245 816")
                await registrations.regAdd("CA 323 455")
                var actual = await registrations.filterRegs('All')
                var expected = [ { reg: 'CA 245 816' }, { reg: 'CA 323 455' } ]

        
                assert.deepStrictEqual(actual, expected)
        
        
            });

            it("should filter reg by selected town", async function () {

                await registrations.regAdd("CA 245 816")
                await registrations.regAdd("CA 323 455")
                var actual = await registrations.filterRegs('All')
                var expected = [ { reg: 'CA 245 816' }, { reg: 'CA 323 455' } ]

        
                assert.deepStrictEqual(actual, expected)
        
        
            });

        })
   

  




    after(function () {
        pool.end();
    })
});