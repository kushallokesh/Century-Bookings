// JavaScript source code
$('#rules').modal('show')

var loader = document.getElementById("loader")
var header = document.getElementsByClassName("lbheader")[0]

var confirm = document.getElementById("Confirm")
var confirmheader = document.getElementById("Confirmheader")
var confirmtext = document.getElementById("Confirmtation")

//console.log(document.getElementById("dayval").value)

var weekvalue = document.getElementById("weekval") 
var dayvalue = document.getElementById("dayval")
var timevalue = document.getElementById("timeval")
var tablevalue = document.getElementById("tableval")

var avlslots



var slots = [
    "7:00 to 8:00 am",
    "8:00 to 9:00 am",
    "9:00 to 10:00 am",
    "10:00 to 11:00 am",
    "11:00 to 12:00 pm",
    "12:00 to 1:00 pm",
    "1:00 to 2:00 pm",
    "2:00 to 3:00 pm",
    "3:00 to 4:00 pm",
    "4:00 to 5:00 pm",
    "5:00 to 6:00 pm",
]

var table = [
    "Table A",
    "Table B",
    "Table C",
]

function weekradio(wvalue) {
    weekvalue = document.getElementById("weekval") 
    weekvalue.value  = wvalue
    $('#SelectWeekModal').modal('hide')
    update1()
}

function dayradio(wvalue) {
    dayvalue = document.getElementById("dayval")
    dayvalue.value = wvalue;
    $('#SelectDay').modal('hide')
    update1()
}

function timeradio(wvalue) {
    timevalue = document.getElementById("timeval")
    timevalue.value = wvalue;
    $('#SelectTime').modal('hide')
    updatetable(wvalue);
}

function tableradio(wvalue) {
    tablevalue = document.getElementById("tableval")
    tablevalue.value = wvalue;
    $('#SelectTable').modal('hide')
   
}

async function update() {

    if (dayvalue.value != "Select a Day" && weekvalue.value != "Select a Week") {

       // console.log("update")
        document.getElementById("Radiotime").innerHTML="";

        data = { "Week": weekvalue.value, "Day": dayvalue.value }
        route = "http://localhost:1337/GetSlots"
        avlslots = await senddata(data, route)

        var getslots = avlslots.map(function (result) {
            return result.TimeSlot
        });

        //console.log(getslots);

        let intersection = slots.filter(x => !getslots.includes(x));
        //console.log(intersection)

        i = 0;
        intersection.forEach(function (timeslots) {
            i++
            div = document.createElement("div")
            div.setAttribute('class',"custom-control custom-radio")
            var radiotime = '<input type="radio" class="custom-control-input" id="t' + i + '"name="Timeradio" onchange="timeradio(' + "'" + timeslots + "'" +')">'
            var label = '<label class="custom-control-label" for="t' + i + '">' + timeslots + '</label> '
            div.innerHTML = radiotime + label;
            document.getElementById("Radiotime").appendChild(div);
        })
    }

}


async function update1() {

    if (dayvalue.value != "" && weekvalue.value != "") {

        //console.log("update")
        loader.style.display = "flex"
        header.textContent = "Fetching Time Slots . . .";

        document.getElementById("Radiotime").innerHTML = "";

        data = { "Week": weekvalue.value, "Day": dayvalue.value }
        //route = "http://localhost:1337/GetSlots"
        route = "https://centurytt.herokuapp.com/GetSlots"
        avlslots = await senddata(data, route)
        console.log(avlslots)
        i = 0;
        slots.forEach(function (timeslots) {
            i++
            div = document.createElement("div")
            div.setAttribute('class', "custom-control custom-radio")
            var radiotime = '<input type="radio" class="custom-control-input" id="t' + i + '"name="Timeradio" onchange="timeradio(' + "'" + timeslots + "'" + ')">'
            var label = '<label class="custom-control-label" for="t' + i + '">' + timeslots + '</label> '
            div.innerHTML = radiotime + label;
            document.getElementById("Radiotime").appendChild(div);
        })

        loader.style.display = "";

    }
  
}

function updatetable(wvalue) {

    document.getElementById("Radiotable").innerHTML = "";

    var gettable = avlslots.map(function (result) {
        if (result.TimeSlot == wvalue) {
            return result.Table
        }
    });

    var intersection = table.filter(x => !gettable.includes(x));
    //console.log(intersection)

    if (intersection.length == 0) {

        div = document.createElement("div")
        div.setAttribute('class', "custom-control custom-radio")
        // var radiotable = '<input type="radio" class="custom-control-input" id="ta' + i + '"name="Timeradio" onchange="tableradio(' + "'" + tableslots + "'" + ')">'
        var label = '<label> No Tables available for this Time Slot Please choose another </label> '
        div.innerHTML = label;
        document.getElementById("Radiotable").appendChild(div);

    }
    else {
        i = 0;
        intersection.forEach(function (tableslots) {
            i++
            div = document.createElement("div")
            div.setAttribute('class', "custom-control custom-radio")
            var radiotable = '<input type="radio" class="custom-control-input" id="ta' + i + '"name="Timeradio" onchange="tableradio(' + "'" + tableslots + "'" + ')">'
            var label = '<label class="custom-control-label" for="ta' + i + '">' + tableslots + '</label> '
            div.innerHTML = radiotable + label;
            document.getElementById("Radiotable").appendChild(div);
        })

    }

}

async function booktable() {

    var Player = document.getElementById("PlayerName");
    var Partner = document.getElementById("PartnerName")
    var Member = document.getElementById("MemNum")

    //console.log(tablevalue.value)
    //console.log(timevalue.value)
    //console.log(dayvalue.value)
    //console.log(weekvalue.value)

    if (dayvalue.value == "" ||
        weekvalue.value == "" ||
        timevalue.value == "" ||
        tablevalue.value == "" ||
        Player.value == "" ||
        Member.value == "") {

        alert("Please enter all Mandatory fields")
    
    }

    else {

        loader.style.display = "flex"
        header.textContent = "Booking Table";

        data = {
            "Week": weekvalue.value,
            "Day": dayvalue.value,
            "Mem_No": Member.value,
            "Name": Player.value,
            "PartnerName": Partner.value,
            "TimeSlot": timevalue.value,
            "Table": tablevalue.value
        },

        //route = "http://localhost:1337/UpdateTable"
        route = "https://centurytt.herokuapp.com/UpdateTable"

        var res = await senddata(data, route)
        console.log(res);
        if (res.Status === "Booked") {

            confirm.style.backgroundColor = "#00d69a";
            confirmheader.textContent = "Booking Confirmed"
            confirmheader.style.color = "white"
            confirmtext.textContent = "Your TT table has been successfully booked"

            $('#confirmmodal').modal('show')
        }
        else {

            confirm.style.backgroundColor = "#c40055";
            confirmheader.textContent = "Booking Failed"
            confirmheader.style.color = "white"
            confirmtext.textContent = "This time slot is already booked, please re-select a time slot"

            $('#confirmmodal').modal('show')
        }

        loader.style.display = ""

    }

}

async function senddata(data, route) {

    const options = {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow -Methods': '*',
            'Access-Control-Allow -Methods': 'Content- Type'
        },

        body: JSON.stringify(data),

    };

    const response = await fetch(route, options);
    return resdata = await response.json();

}
