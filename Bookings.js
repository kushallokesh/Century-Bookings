var bookings;
var table
window.onload = async function () {

    async function senddata(data, route) {



        const response = await fetch(route);
        console.log(response);
        return resdata = await response.json();

    }

    var loader = document.getElementById("loader")
    var header = document.getElementsByClassName("lbheader")[0]

    loader.style.display = "flex"
    header.textContent = "Fetching Confirmed Bookings";


    route = "https://centurytt.herokuapp.com/ViewBookings"
    //route = "http://localhost:1337/ViewBookings"

    var data = {};
     bookings = await senddata(data, route)

    var bookingrow = function (row) {


        var button = document.createElement("button");
        button.innerHTML = "Cancel Booking";
        button.classList.add("wavebutton");
        button.addEventListener("click", async function () {

            loader.style.display = "flex"
            header.textContent = "Cancelling the Booking";

            route = "http://localhost:1337/Cancel"

            var data = row.getData();

            console.log(data)

            var Cancel = await removedata(data, route)

            route = "https://centurytt.herokuapp.com/ViewBookings"
            bookings = await senddata(data, route)
            console.log(bookings);

            table = new Tabulator(table7, {

                pagination: "local",
                paginationSize: 500,
                // paginationSizeSelector: [20, 50, 150],
                movableColumns: false,
                //  layout: "fitColumns",
                layout: "fitData",
                //layout: "fitColumns",
                //data: tabledata.Files,
                data: bookings,
                selectable: 0,



                columns: [

                    { title: "Membership.No", field: "Mem_No", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },
                    { title: "Name", field: "Name", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, formatter: bookingrow },
                    { title: "Status", field: "PartnerName", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },
                    { title: "Week", field: "Week", headerFilter: "input", align: "left", tooltip: true, headerSort: false, },
                    { title: "Day", field: "Day", headerFilter: "input", responsive: 0, headerSort: false, tooltip: true },
                    { title: "TimeSlot", field: "TimeSlot", responsive: 0, headerSort: false, tooltip: true, },
                    { title: "Table", field: "Table7", responsive: 0, tooltip: true, headerSort: false, },
                    { title: "PartnerName", field: "PartnerName", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },

                ],

            });

            loader.style.display = "";

            //table.redraw(true)
        })

        return button

    }

     table = new Tabulator(table7, {

        pagination: "local",
        paginationSize: 500,
       // paginationSizeSelector: [20, 50, 150],
        movableColumns:false,
        //  layout: "fitColumns",
        layout: "fitData",
        //layout: "fitColumns",
        //data: tabledata.Files,
        data: bookings,
        selectable: 0,


        
        columns: [

            { title: "Membership.No", field: "Mem_No", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },
            { title: "Name", field: "Name", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, formatter: bookingrow },
            { title: "Status", field: "PartnerName", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },
            { title: "Week", field: "Week", headerFilter: "input", align: "left", tooltip: true, headerSort: false, },
            { title: "Day", field: "Day", headerFilter: "input", responsive: 0, headerSort: false, tooltip: true },
            { title: "TimeSlot",field:"TimeSlot",responsive: 0, headerSort: false, tooltip: true,},
            { title: "Table", field: "Table7", responsive: 0, tooltip: true, headerSort: false, },
            { title: "PartnerName", field: "PartnerName", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },

        ],

    });

    loader.style.display = "";

    async function removedata(data, route) {

        const options = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),

        };

        const response = await fetch(route, options);
        return resdata = await response.json();

    }

};

