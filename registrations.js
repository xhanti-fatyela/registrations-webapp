module.exports = function Registrations(pool) {

    async function regAdd(enteredRegs) {

        if (enteredRegs !== "") {
            const code = enteredRegs.substring(0, 2);
            const fetchId = await pool.query('select id from reg_town where (town_code) = ($1)', [code]);
            const idForTown = fetchId.rows[0].id;
            let existing;


            if (idForTown > 0) {


                existing = await pool.query('select * from reg_numbers where reg = ($1)', [enteredRegs])

            } else {
                return false
            }

            if (existing.rows.length < 1) {

                await pool.query('insert into reg_numbers (reg, town_id) values ($1, $2)', [enteredRegs, idForTown]);
                return true;
            } else {
                return false
            }
        } else {
            return false
        }
    }

    async function doesRegExist(reg) {


        let exists = await pool.query('select * from reg_numbers where reg = ($1)', [reg])

        return exists.rowCount;

    }

    async function filterRegs(id) {
        if (id === 'All') {
            let allRegs = await pool.query('select reg from reg_numbers');
            return allRegs.rows
        } else  {
            const theId = await pool.query('select reg from reg_numbers where town_id = ($1)', [id])
            return theId.rows
        }
    }


    async function displayallRegs() {
        const allRegs = await pool.query('select reg from reg_numbers');

        return allRegs.rows;
    }
    return {
        regAdd,
        doesRegExist,
        filterRegs,
        displayallRegs
    }
}




