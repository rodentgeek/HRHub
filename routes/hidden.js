var express            = require("express"),
    router             = express.Router(),
    Employee           = require("../models/employee"),
    Tax                = require("../models/tax"),
    seedData_employees = require("../models/seeddata/employees2"),
    seedData_tax       = require("../models/seeddata/tax");

// Add initial employee data

router.get("/seed_employees", function(req, res){
  Employee.create(seedData_employees, function(err, data){
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

// Add initial tax data

router.get("/seed_tax", function(req, res){
  Tax.remove({}, function(err, data){
    if(err){
      console.log(err);
    } else {
      Tax.create(seedData_tax, function(err, data){
        if(err){
          console.log(err);
        } else {
          console.log("reseed", data);
        }
      });
    }
  });
});

// Return JSON for Angular AJAX request

router.get("/ajax", function(req, res){
	Employee.find({}, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.send(data);
		}
	});
});

module.exports = router;