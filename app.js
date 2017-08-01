var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    hiddenRoutes    = require("./routes/hidden"),
    generalRoutes   = require("./routes/general"),
    reportRoutes    = require("./routes/report");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB);

app.use(hiddenRoutes);
app.use(generalRoutes);
app.use(reportRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is up");
});

// https://hrhub2-rodentsoft.c9users.io/