let express = require('express');
let router = express.Router();
let jsonList = require('../userlistJson/userListJson.json');
let CalcDistance = require('../modules/calcDistance');


let intercomDublinOffice = new CalcDistance(53.339428, -6.257664), getDistance = [], km , d;


/* GET userslist page. */
router.get('/', function(req, res, next) {
    jsonList.userList.forEach((e)=>{
        let userLocation = new CalcDistance(e.latitude, e.longitude);
        d = intercomDublinOffice.distanceTo(userLocation);
        km = d / 1000;
        km <= 100 ? getDistance.push({id: e.user_id, name:e.name, distance:km.toFixed(1) + " km"}) : false;
    });
    getDistance.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );
    getDistance ? res.render('userslist', {data: getDistance, totalUsers : jsonList.userList.length}) : res.render('userslist'), {loading : 'true'};
    getDistance = [];
});

module.exports = router;