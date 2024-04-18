import { TabulatorFull as Tabulator } from '../lib/tabulator/js/tabulator_esm.js';
import { Card, User, Product, Location } from './model.js';
import { CARD_LIST, USER_LIST, PRODUCT_LIST, LOCATION_LIST } from './data.js';
import { select2Editor } from './custom-editors/select2-editor.js';
import { jqueryDatePickerEditor } from './custom-editors/jquery-datepicker-editor.js';

let editable = false;
let newRowId = -1;

const addBtn = document.getElementById("add");
const updateBtn = document.getElementById("update");
const removeBtn = document.getElementById("remove");
const userSelect = $("#user-select");

const tableUserSelect2Options = {
    placeholder: 'Select',
    data: USER_LIST.map((x) => {
        return { id: x.id, text: x.name };
    }),
    width: '100%',
    minimumInputLength: 0,
    allowClear: true,
};

const tableProductSelect2Options = {
    placeholder: 'Select',
    data: PRODUCT_LIST.map((x) => {
        return { id: x.id, text: x.name };
    }),
    width: '100%',
    minimumInputLength: 0,
    allowClear: true,
};

const locationLookup = LOCATION_LIST.map((location) => {
    return { value: location.id, label: location.name };
});
console.log("locationValues", locationLookup);

const table = new Tabulator("#example-table", {
    index: "id",               //set the index field to the id field
    data: CARD_LIST,           //load row data from array
    layout: "fitColumns",      //fit columns to width of table

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
        tooltip: false,         //show tool tips on cells
    },
    columns: [ //Define Table Columns
        {
            field: "state",
            width: 100,
            visible: false,
        },
        {
            field: "checked",
            formatter: "rowSelection",
            // titleFormatter: "rowSelection",
            hozAlign: "center",
            headerSort: false,
            width: 50,
            visible: false
        },
        {
            title: "id",
            field: "id",
            width: 150,
            editor: "input",
            editable: editCheck,
        },
        {
            title: "workDate",
            field: "workDate",
            width: 150,
            editable: true,
            editor: jqueryDatePickerEditor,
        },
        {
            title: "user",
            field: "userId",
            width: 150,
            editable: true,
            editor: select2Editor,
            editorParams: {
                selectOptions: tableUserSelect2Options,
            },
            formatter: "lookup",
            formatterParams: USER_LIST.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {})
        },
        {
            title: "product",
            field: "productId",
            width: 150,
            editable: true,
            editor: select2Editor,
            editorParams: {
                selectOptions: tableProductSelect2Options,
            },
            formatter: "lookup",
            formatterParams: PRODUCT_LIST.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {})
        },
        {
            title: "location",
            field: "locationId",
            width: 150,
            editable: editCheck,
            editor: "list",
            editorParams: {
                values: locationLookup,
                autocomplete: true,
                allowEmpty: true,
                listOnEmpty: true,
                valuesLookup: true
            },
            formatter: "lookup",
            formatterParams: locationLookup.reduce((acc, cur) => {
                acc[cur.value] = cur.label;
                return acc;
            }, {})
        },
        {
            title: "hours",
            field: "hours",
            width: 150,
            editor: "number",
            editable: editCheck,
        },
    ],
    rowContextMenu: [
        {
            label: 'Add row above',
            action: (_e, row) => {
                table.addRow({ id: `${newRowId--}`, state: "added" }, true, row);
            },
        },
        {
            label: 'Add row below',
            action: (e, row) => {
                table.addRow({ id: `${newRowId--}`, state: "added" }, false, row);
            },
        },
    ]
});

// 체크 셀(체크박스 외부) 클릭시 row 선택
table.on("cellClick", function (e, cell) {
    // if cell is row selection cell, then change selection state
    if (cell.getColumn().getDefinition().formatter == "rowSelection") {
        cell.getRow().toggleSelect();
    }
});

function editCheck(cell) {
    return editable;
}



updateBtn.addEventListener("click", () => {
    editable = !editable;
    table.toggleColumn("checked");
    table.toggleColumn("state");
    //resize table to fit new column layout
    table.redraw(true);
});

userSelect.select2({
    data: USER_LIST.map((x) => {
        return { id: x.id, text: x.name };
    }),
    width: "300px",
    placeholder: "Select a user",
    allowClear: true,
});
userSelect.val(3).trigger("change.select2");

$("#datepicker").datepicker({

});