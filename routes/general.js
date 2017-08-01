var express      = require("express"),
    router       = express.Router(),
    Employee     = require("../models/employee"),
    Tax          = require("../models/tax");

router.get("/", function(req, res){
  res.redirect("/employees");
});

// SHOW ROUTE

router.get("/employees", function(req, res){
  res.render("main");  
});

// CREATE ROUTES

router.get("/employees/new", function(req, res){
  res.render("new");
});

router.post("/employees", function(req, res){
	Employee.create(req.body.employee, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/employees");
		}
	});
});

// EDIT ROUTES

router.get("/employees/:id/edit", function(req, res){
  var id = req.params.id;
  var queryStr = req.query.highlight;
  Employee.findById(id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("edit", {data, queryStr});
    }
  });
});

router.get("/employees/:id", function(req, res){
  var id = req.params.id;
  Employee.findById(id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("employee", {data});
    }
  });
});

router.put("/employees/:id", function(req, res){
	Employee.findByIdAndUpdate(req.params.id, req.body.employee, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/employees/" + req.params.id);
		}
	});
});

// DELETE ROUTE

router.delete("/employees/:id", function(req, res){
	Employee.findByIdAndRemove(req.params.id, function(err, data){
		if(err){
			console.log(err);
		} else {
		  console.log("Deleted");
			res.redirect("/employees");
		}
	}); 
});

module.exports = router;