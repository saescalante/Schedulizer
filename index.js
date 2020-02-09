var express = require("express");
var app = express();

app.use(express.static("public"));  //Serve Public folder
app.set("view engine", "ejs");      //allows links to "about" instead of "about.ejs"



// ==============================================
// ROUTES
// ==============================================

//Empty
app.get("/", function(req,res){
    console.log("Incoming / request from " + req.ip)
    res.redirect("/login");
});

//Login
app.get("/login", function(req,res){
    res.render("login");
});


//User
app.get("/user", function(req,res){
    var tempData = [
        { Schedule: 3,
          Manager: "Bill",
          Date: "12-4-2021",
          Start: "11:30 am",
          Stop: "4:30 pm"  
        },
        { Schedule: 2,
            Manager: "Willa",
            Date: "12-5-2021",
            Start: "12:30 pm",
            Stop: "5:30 pm"  
        },
        { Schedule: 3,
            Manager: "Bill",
            Date: "12-6-2021",
            Start: "11:30 am",
            Stop: "4:30 pm"  
        }
    ];
    res.render("user", {Sdata : tempData});
});


//Time Off Requests
app.get("/request", function(req,res){
    var tempData = [
        { Date: "12-4-2021",
          Approve: "Yes",
          id: 11  
        },
        {   Date: "12-5-2021",
            Approve: "No",
            id: 43  
        },
        {   Date: "12-6-2021",
            Approve: "Yes",
            id: 21  
        }
    ];
    res.render("requests", {Rdata : tempData});
});

//avalibility
app.get("/avail", function(req,res){

    var tempData = {
        Sun1: "12:00",
        Sun2: "12:00",
        Mon1: "12:00",
        Mon2: "12:00",
        Tues1: "12:00",
        Tues2: "12:00",
        Wed1: "12:00",
        Wed2: "12:00",
        Thu1: "12:00",
        Thu2: "12:00",
        Fri1: "12:00",
        Fri2: "12:00",
        Sat1: "12:00",
        Sat2: "12:00",
    };
    res.render("avail", {Adata: tempData});
});


//manager
app.get("/manager", function(req,res){
    var tempData = [
        { name: "Cashier - Week6",
          start: "12-12-2021",
          end: "12-18-2021",
          id: 6  
        },
        {   name: "Maintenance - Week6",
            start: "12-12-2021",
            end: "12-18-2021",
            id: 8  
        },
        {   name: "Stocker - Week6",
            start: "12-12-2021",
            end: "12-18-2021",
            id: 153 
        }
    ];
    res.render("manager",{Rdata: tempData});
});

//NewUser
app.get("/newuser", function(req,res){
    res.render("newuser");
});

//Scheduler
app.get("/scheduler/:SchedID", function(req,res){
    console.log(req.params.SchedID)
    var tempData = [
        { scheduleID: req.params.SchedID,
          shiftID: 9889,
          date:  "12-18-2021",
          startTime: "12:10",
          stopTime:  "12:15",  
          employee:  "Bill"
        },
        {   scheduleID: req.params.SchedID,
            shiftID: 9565,
            date:  "12-18-2021",
            startTime: "12:10",
            stopTime:  "12:15",  
            employee:  "Will" 
        },
        {   scheduleID: req.params.SchedID,
            shiftID: 9822,
            date:  "12-18-2021",
            startTime: "12:10",
            stopTime:  "12:15",  
            employee:  "Jill"
        }
    ];



    res.render("scheduler",{shifts: tempData});
});

//Shifts
app.get("/shifts/:shiftID", function(req,res){
var shiftData = {
            scheduleID: 51,
    }

var tempData = [
    {   username: "Bill",
        id: 44
    },
    {   username: "Sarah",
        id: 456
    },
    {   username: "Moore",
        id: 21
    },
    {   username: "Sally",
        id: 70
    },
]

    res.render("shift", {shift: shiftData, employees: tempData});
});

//logout
app.get("/logout", function(req,res){
    res.redirect("/login");
});

//wildcard
app.get("*", function(req,res){
    res.send("404 - not known");
});



// ==============================================
// LISTEN
// ==============================================

const PORT = process.env.PORT || 31115;
app.listen(PORT, function(){
    console.log("Kudos Server started on port", PORT)
})
