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


    //route = "https://centurytt.herokuapp.com/ViewBookings"
    route = "http://localhost:1337/ViewBookings"

    var data = {};
    var bookings = await senddata(data, route)



    var table = new Tabulator(table7, {

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
            { title: "Name", field: "Name", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },
            { title: "Week", field: "Week", headerFilter: "input", align: "left", tooltip: true, headerSort: false,},
            { title: "Day", field: "Day", headerFilter: "input", responsive: 0, headerSort: false, tooltip: true },
            { title: "TimeSlot", field:"TimeSlot",  responsive: 0, headerSort: false, tooltip: true, },
            { title: "Table", field: "Table", responsive: 0, tooltip: true, headerSort: false, },
            { title: "PartnerName", field: "PartnerName", headerFilter: "input", responsive: 0, tooltip: true, headerSort: false, },

        ],
    });

    loader.style.display = "";

};

