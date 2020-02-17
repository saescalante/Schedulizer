var express = require("express");
var request = require("request");
bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));  //Serve Public folder
app.set("view engine", "ejs");      //allows links to "about" instead of "about.ejs"



// ==============================================
// ROUTES
// ==============================================

//Empty
app.get("/", function(req,res){
    res.redirect("/home");
});

app.get("/home", function(req,res){
    console.log("Incoming / request from " + req.ip)

    tempdata = [
            {   firstname: "Bill",
                lastname: "Smith",
                id: 44,
                isManager: true
            },
            {   firstname: "Sarah",
                lastname: "Perkins",
                id: 456,
                isManager: true
            },
            {   firstname: "Sam",
                lastname: "Moore",
                id: 21,
                isManager: false
            },
            {   firstname: "Sally",
                lastname: "Seashells",
                id: 70,
                isManager: false
            },
            {   firstname: "Roger",
                lastname: "Toughguy",
                id: 70,
                isManager: false
            }
        ]
    res.render("home.ejs",{pagetitle: "Home", Users: tempdata});
});

app.post("/createuser", function(req,res){
    console.log("create user");
    res.redirect("/home")
});

app.post("/accessuser", function(req,res){
    console.log("access user");
    var userid = req.body.userNumber
    console.log(userid)
    res.redirect("/user/" + userid)
});

app.post("/accessmanager", function(req,res){
    console.log("access manager");
    var userid = req.body.userNumber
    console.log(userid)
    res.redirect("/manager/" + userid)
});

//////////////////////////////////////////////////////////
//USER account page

app.get("/user/:usernum", function(req,res){
    //get user data
        console.log(req.params.usernum)    //Use this param to get the rest of the info for this user
        var userObj = { firstname: "firstname",
                        lastname: "lastname",
                        email: "morefill",
                        employeeID: req.params.usernum,
                        monStart: null, monStop: "10:00", tuesStart: null, tuesStop: null, wedStart: null, wedStop: null, 
                        thurStart: null, thurStop: null, friStart: null, friStop: null, satStart: null, satStop: null,
                        sunStart: null, sunStop: null
        }
    //get schedules based on usernum parameter
        var scheObj = [{
            shiftID: 21201,
            startTime: "fill data",
            stopTime: "fill data",
            date: "date data",
            day: "day of the week",
            schedName: "filldata",
            manName: "filldata" },
        {   shiftID: 56422,
            startTime: "fill data",
            stopTime: "fill data",
            date: "date data",
            day: "day of the week",
            schedName: "filldata",
            manName: "filldata" },
        {   shiftID: 56422,
            startTime: "fill data",
            stopTime: "fill data",
            date: "date data",
            day: "day of the week",
            schedName: "filldata",
            manName: "filldata" }
        ]

      
    //get time off requests
        var requestObj = [
            {   date: "filldate",
                approvalStatus: true,
                comment: "comment here"},
            {   date: "filldate",
                approvalStatus: false,
                comment: "comment here"},
            {   date: "filldate",
                approvalStatus: true,
                comment: "comment here"},
        
        ]
    res.render("user.ejs",{pagetitle: "User Account", userInfo: userObj, schInfo: scheObj, requestInfo: requestObj});
});

app.post("/updateAva", function(req,res){
    console.log("update availability");
    console.log(req.body)
    var userid = req.body.userId
    console.log(userid)
    res.redirect("/user/" + userid)
});

app.post("/addTimeOff", function(req,res){
    console.log("add time off request");
    var userid = req.body.userId
    console.log(userid)
    console.log("done")
    res.redirect("/user/" + userid)
});

///////////////////////////////////////////////////////////////////////////////
//Manager Page
app.get("/manager/:usernum", function(req,res){

    console.log(req.params.usernum)    //Use this param to get the rest of the info for this user
    var userObj = { firstname: "firstname",
                    lastname: "lastname",
                    email: "morefill",
                    employeeID: req.params.usernum,
                    monStart: null, monStop: "10:00", tuesStart: null, tuesStop: null, wedStart: null, wedStop: null, 
                    thurStart: null, thurStop: null, friStart: null, friStop: null, satStart: null, satStop: null,
                    sunStart: null, sunStop: null
    };

    var schedObj = [
            {   managerId: req.params.usernum,
                scheName: "Cashiers - week6",
                startdate: "11/12/2010",
                enddate: "12/12/2010",
                scheduleId: 12},
            {   managerId: req.params.usernum,
                scheName: "Stockers - week6",
                startdate: "11/12/2010",
                enddate: "12/12/2010",
                scheduleId: 13},
            {   managerId: req.params.usernum,
                scheName: "Maintenance - week6",
                startdate: "11/12/2010",
                enddate: "12/12/2010",
                scheduleId: 14}
            ]   

    var timeOff = [
            {   requestId: 999,
                employeeID: 16,
                date: "11/17/2010",
                comment: "I'm out of town",
                approvalStatus: false},
            {   requestId: 992,
                employeeID: 17,
                date: "11/17/2010",
                comment: "I'm out of town",
                approvalStatus: false},
            {   requestId: 921,
                employeeID: 18,
                date: "11/17/2010",
                comment: "I'm out of town",
                approvalStatus: false} ]

    var employees = [            
        {   firstname: "Sam",
            lastname: "Moore",
            id: 21,
            isManager: false
        },
        {   firstname: "Sally",
            lastname: "Seashells",
            id: 70,
            isManager: false
        },
        {   firstname: "Roger",
            lastname: "Toughguy",
            id: 87,
            isManager: false
        }];


    res.render("manager.ejs",{pagetitle: "Manager Account", userInfo: userObj, schInfo: schedObj, timeOff: timeOff, employeeInfo: employees});
});

app.get("/timeoff/approve/:request", function(req,res){
    console.log("approve request");
    console.log(req.params.request)
    //get manager id from request off
    res.redirect("/manager/80")
});

app.get("/timeoff/deny/:request", function(req,res){
    console.log("deny request");
    console.log(req.params.request)
    //get manager id from request off
    res.redirect("/manager/90")
});

app.get("/userdelete/:userId", function(req,res){
    console.log("delete user");
    console.log(req.params.request)
    //get manager id from employee
    res.redirect("/manager/110" )
});

app.get("/manager/delete/:userId", function(req,res){
    console.log("delete schedule");
    console.log(req.params.request)
    //get manager id from employee
    res.redirect("/manager/100" )
});

app.post("/manager/create", function(req,res){
    //create new schedule
    console.log("add new schedule");
    console.log(req.body)
    var userid = req.body.employeeId
    console.log(userid)
    res.redirect("/manager/" + userid)
});

//////////////////////////////////////////////////////////////////////////////
//Schedule page
app.get("/schedule/:scheNum", function(req,res){
    var scheduleObj = {schedulename: "Cashiers- week 52",
                       scheduleid: req.params.scheNum,
                       startdate: "2018-02-14",
                       enddate: "2018-02-24" }
    // console.log(scheduleObj, "done")
    var shiftObj = [
        {   shiftID: 16,
            startTime: "12:13pm",
            stopTime: "3:25pm",
            date: "2018-02-20",
            employeeID: null,
            employeeName: null,
            possibleEmploy: [ {id: 21, name: "Bill"},{id: 34, name: "Megan"}, {id: 52, name: "Willis"}]
        },
        {   shiftID: 17,
            startTime: "12:13pm",
            stopTime: "3:25pm",
            date: "2018-02-20",
            employeeID: 21,
            employeeName: "Bill",
            possibleEmploy: null
        },
        {   shiftID: 18,
            startTime: "12:13pm",
            stopTime: "3:25pm",
            date: "2018-02-20",
            employeeID: null,
            employeeName: null,
            possibleEmploy: [ {id: 21, name: "Bill"},{id: 34, name: "Megan"}, {id: 52, name: "Willis"}]
        },
        {   shiftID: 19,
            startTime: "12:13pm",
            stopTime: "3:25pm",
            date: "2018-02-20",
            employeeID: null,
            employeeName: null,
            possibleEmploy: null
        }
]

    res.render("schedule.ejs",{pagetitle: "Schedule Page", schedInfo: scheduleObj, shiftInfo: shiftObj});
});

app.get("/shiftdelete/:shiftnumber", function(req,res){
    //create new schedule
    console.log(req.params.shiftnumber);
    res.redirect("/schedule/123")
});

app.post("/schedule/:scheduleID/createshift", function(req,res){
    //create new schedule
    console.log("add new schedule");
    console.log(req.body)
    var userid = req.body.employeeId
    console.log(userid)
    res.redirect("/schedule/" + req.params.scheduleID)
});
app.post("/shiftassign/:shiftID", function(req,res){
    //create new schedule
    console.log(req.params.shiftID);
    console.log("Selected Employee: ", req.body.userNumber)
    res.redirect("/schedule/456" + req.params.scheduleID)
});
app.post("/shiftupdate", function(req,res){
    //create new schedule

    res.redirect("/schedule/456")
});

// ==============================================
// LISTEN
// ==============================================

const PORT = process.env.PORT || 31115;
app.listen(PORT, function(){
    console.log("Server started on port", PORT)
})
