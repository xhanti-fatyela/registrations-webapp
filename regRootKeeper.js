module.exports = function routeKeeper(registrations) {
    // const Registrations = require("./registrations");
    // const registrations = Registrations(pool);
    async function addRegs(req, res, next) {
        let value = req.body.name
            let upper = value.toUpperCase();
            if (value !== "") {
                if (/^C[YLKA] [\d\s-]{5,10}/.test(upper)){
                    if (await registrations.doesRegExist(upper) === 0) {
                        await registrations.regAdd(upper)
                        req.flash('msg', 'Successfuly Entered')
                    } else {
                        req.flash('info', 'Registration number Already Entered')
                    }
                } else {
                    req.flash('info', 'Enter A Valid Registration Number')
                }
            } else {
                req.flash('info', 'Enter A Registration Number')
            }

            res.render("index", {
                reg: await registrations.displayallRegs()
            });

    };

    async function home(req, res, next) {
       res.render("index",{
        
        reg: await registrations.displayallRegs()
       });
    }
       
    async function filterByTown(req, res, next) {
            let town = req.query.opt;
            let all = await registrations.filterRegs(town)

            res.render("index", {
                reg: all
            });

    }

    async function forClearing(req, res) {

        await registrations.clearData();
    
    
        res.redirect('/')
    
    
      }
    return {
        addRegs,
        home,
        filterByTown,
        forClearing
    }
};