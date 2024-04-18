import { TabulatorFull as Tabulator } from './lib/tabulator/js/tabulator_esm.js';

var tabledata = [
    { id: 1, name: "Oli Bob", progress: 12, gender: "male", rating: 1, col: "red", dob: "19/02/1984", car: 1 },
    { id: 2, name: "Mary May", progress: 1, gender: "female", rating: 2, col: "blue", dob: "14/05/1982", car: true },
    { id: 3, name: "Christine Lobowski", progress: 42, gender: "female", rating: 0, col: "green", dob: "22/05/1982", car: "true" },
    { id: 4, name: "Brendon Philips", progress: 100, gender: "male", rating: 1, col: "orange", dob: "01/08/1980" },
    { id: 5, name: "Margret Marmajuke", progress: 16, gender: "female", rating: 5, col: "yellow", dob: "31/01/1999" },
    { id: 6, name: "Frank Harbours", progress: 38, gender: "male", rating: 4, col: "red", dob: "12/05/1966", car: 1 },
];

function generateTableData(count) {
    var tabledata = [];
    for (var i = 0; i < count; i++) {
        tabledata.push({
            id: i + 1,
            name: "Oli Bob",
            progress: Math.floor(Math.random() * 100),
            rating: Math.floor(Math.random() * 5),
            col: "red",
            dob: "19/02/1984",
        });
    }
    return tabledata;
}




window.addEventListener("load", () => {
    let _editable = false;
    const table = new Tabulator("#example-table", {
        index: "id",               //set the index field to the id field
        data: generateTableData(1000),           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that don't fit on the table


        // addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table


        // pagination
        pagination: true,
        paginationMode: "local",       //paginate the data
        paginationSize: 20,         //allow 7 rows per page of data
        paginationCounter: "rows", //display count of paginated rows in footer
        paginationSizeSelector: [10, 20, 50, 100], //allow users to select rows per page
        paginationButtonCount: 5,  //show 5 page buttons
        //paginationAddRow: "page",  //when adding a new row, add it to the current page

        movableColumns: true,      //allow column order to be changed
        initialSort: [             //set the initial sort order of the data
            // { column: "name", dir: "asc" },
        ],
        columnDefaults: {
            tooltip: true,         //show tool tips on cells
        },
        columns: [ //Define Table Columns
            {
                field: "checked",
                formatter: "rowSelection",
                // titleFormatter: "rowSelection",
                hozAlign: "center",
                headerSort: false,
                width: 50,
                visible: false
            },
            { title: "Name", field: "name", width: 150, editor: "input", editable: editCheck },
            { title: "Age", field: "rating", editor: "number", editable: editCheck },
            { title: "Favourite Color", field: "col", editor: true },
            {
                title: "Date Of Birth", field: "dob",
                sorter: "date",
                hozAlign: "center"
            },
        ],
        rowContextMenu: [
            {
                label: 'Add row above',
                action: (e, row) => {
                    table.addRow({ id: `${newRowId--}` }, true, row);
                },
            },
            {
                label: 'Add row below',
                action: (e, row) => {
                    table.addRow({ id: `${newRowId--}` }, false, row);
                },
            },
        ]
    });
    table.on("cellClick", function (e, cell) {
        console.log("cellClick", cell);
        // if cell is row selection cell, then change selection state
        if (cell.getColumn().getDefinition().formatter == "rowSelection") {
            cell.getRow().toggleSelect();
        }
    });

    function editCheck(cell) {
        return _editable;
    }

    function setEditable(editable) {
        _editable = editable;
        console.log("editable", _editable);
    }
    function getEditable() {
        if (_editable)
            return "input";
        else
            return false;
    }

    let newRowId = -1;
    const addBtn = document.getElementById("add");
    addBtn.addEventListener("click", () => {
        const selectedRow = table.getSelectedData();
        console.log("selectedRow", selectedRow[0].id);
        const id = selectedRow[0].id;
        const data = { id: newRowId-- };
        console.log("data", data);
        table.addRow(data, false, selectedRow[0]);
    });
    const updateBtn = document.getElementById("update");

    updateBtn.addEventListener("click", () => {
        setEditable(!_editable);
        // set row selection column visible
        table.toggleColumn("checked");
        //resize table to fit new column layout
        table.redraw(true);
    });

    const removeBtn = document.getElementById("remove");
    removeBtn.addEventListener("click", () => {
        // delete all checked rows
        const selectedData = table.getSelectedData();
        console.log("selectedData", selectedData);
        table.deleteRow(selectedData.map((data) => data.id));
    });

});
