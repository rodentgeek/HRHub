var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
/*var seedData = require("./seeddata");
var seedData_tax = require("./seeddata_tax");*/

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  job: String,
  ssn: String,
  cNumber: Number,
  salary: Number
});

var Employee = mongoose.model("Employee", employeeSchema);

var taxSchema = new mongoose.Schema({
  type: String,
  label: String,
  rate: Number
});

var Tax = mongoose.model("Tax", taxSchema);

mongoose.connect(process.env.DB);

app.get("/", function(req, res){
  res.redirect("/employees");
});

app.get("/employees", function(req, res){
  res.render("main");  
});

app.get("/employees/new", function(req, res){
  res.render("new");
});

app.post("/employees", function(req, res){
	Employee.create(req.body.employee, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/employees");
		}
	});
});

app.get("/employees/:id/edit", function(req, res){
  var id = req.params.id;
  Employee.findById(id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("edit", {data});
    }
  });
});

app.get("/employees/:id", function(req, res){
  var id = req.params.id;
  Employee.findById(id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("employee", {data});
    }
  });
});

app.get("/ajax", function(req, res){
	Employee.find({}, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.send(data);
		}
	});
});

app.put("/employees/:id", function(req, res){
	Employee.findByIdAndUpdate(req.params.id, req.body.employee, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/employees");
		}
	});
});

app.delete("/employees/:id", function(req, res){
	Employee.findByIdAndRemove(req.params.id, function(err, data){
		if(err){
			console.log(err);
		} else {
		  console.log("Deleted");
			res.redirect("/employees");
		}
	}); 
});

app.get("/payroll", function(req, res){
  Tax.find({}, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.render("payroll", {data});      
    }
  });
});

app.get("/payroll_report", function(req, res){
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

/*
app.get("/seed_employees", function(req, res){
  Employee.create(seedData, function(err, data){
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
  });
});
*/

/*app.get("/seed_tax", function(req, res){
  Tax.create(seedData_tax, function(err, data){
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
  });
});*/

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is up");
});

// https://hrhub2-rodentsoft.c9users.io/