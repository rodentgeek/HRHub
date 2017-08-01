var express  = require("express"),
    router   = express.Router(),
    Employee = require("../models/employee"),
    Tax      = require("../models/tax");
    
// PAYROLL REPORT ROUTES

router.get("/payroll", function(req, res){
  Tax.find({}, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("payroll", {data});      
    }
  });
});

router.get("/payroll_report", function(req, res){
    Tax.find({}, function(err, taxes){
    if(err){
      console.log(err);
    } else {
      Employee.find({}).sort({lastName: 'ascending'}).exec(function(err, employees){
        if(err){
          console.log(err);
        } else {
          res.render("payroll_report", {employees, taxes});            
        }
      });
    }
  });
});

router.get("/payroll_tax", function(req, res){
  Tax.find({}, function(err, taxes){
    if(err){
      console.log(err);
    } else {
      res.render("taxrateform", {taxes});            
    }
  });
});

// PAYROLL EDIT ROUTES

router.get("/payroll_tax/:id/edit", function(req, res){
  var id = req.params.id;
  Tax.findById(id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("editTax", {data});
    }
  });
});

router.put("/payroll_tax/:id", function(req, res){
	Tax.findByIdAndUpdate(req.params.id, req.body.formfields, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/payroll");
		}
	});
});

// GEOGRAPHY REPORT ROUTES

router.get("/geography", function(req, res){
  Employee.find({}, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("geography", {data});      
    }
  });
});

// VACATION REPORT ROUTES

router.get("/vacation", function(req, res){
  var filter = req.query.q, searchObj = {};
  if(filter) searchObj = {state: filter};
  
  Employee.find(searchObj).sort({lastName: 'ascending'}).exec(function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("vacation", {data});      
    }
  });
});

module.exports = router;