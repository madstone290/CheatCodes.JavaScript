import { TabulatorFull as Tabulator } from "../lib/tabulator/js/tabulator_esm.js";
import { Card, User, Product, Location } from "./model.js";
import {
    CARD_LIST,
    USER_LIST,
    PRODUCT_LIST,
    LOCATION_LIST,
    getCardList,
} from "./data.js";
import { select2Editor } from "./custom-editors/select2-editor.js";
import { jqueryDatePickerEditor } from "./custom-editors/jquery-datepicker-editor.js";
import { selectizeEditor } from "./custom-editors/selectize-editor.js";

let editable = false;
let newRowId = -1;

const addBtn = document.getElementById("add");
const updateBtn = document.getElementById("update");
const removeBtn = document.getElementById("remove");
const userSelect = $("#user-select");

const tableUserSelect2Options = {
    placeholder: "Select",
    data: USER_LIST.map((x) => {
        return { id: x.id, text: x.name };
    }),
    width: "100%",
    minimumInputLength: 0,
    allowClear: true,
};

const tableProductSelect2Options = {
    placeholder: "Select",
    data: PRODUCT_LIST.map((x) => {
        return { id: x.id, text: x.name };
    }),
    width: "100%",
    minimumInputLength: 0,
    allowClear: true,
};

const locationLookup = LOCATION_LIST.map((location) => {
    return { value: location.id, label: location.name };
});
console.log("locationValues", locationLookup);

const tableData = getCardList(50);
tableData.forEach((row) => {
    row.userName = USER_LIST.find((x) => x.id == row.userId).name;
    row.productName = PRODUCT_LIST.find((x) => x.id == row.productId).name;
    row.locationName = LOCATION_LIST.find((x) => x.id == row.locationId).name;
});

const table = new Tabulator("#example-table", {
    index: "id", //set the index field to the id field
    data: tableData, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    height: "500px",
    // pagination
    pagination: false,
    paginationMode: "local", //paginate the data
    paginationSize: 20, //allow 7 rows per page of data
    paginationCounter: "rows", //display count of paginated rows in footer
    paginationSizeSelector: [10, 20, 50, 100], //allow users to select rows per page
    paginationButtonCount: 5, //show 5 page buttons
    //paginationAddRow: "page",  //when adding a new row, add it to the current page

    movableColumns: true, //allow column order to be changed
    initialSort: [
        //set the initial sort order of the data
        // { column: "name", dir: "asc" },
    ],
    columnDefaults: {
        tooltip: false, //show tool tips on cells
        headerFilter: "input",
    },
    columns: [
        //Define Table Columns
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
            visible: false,
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
            headerFilter: "date",
            editor: jqueryDatePickerEditor,
            formatter: (cell) => {
                const date = new Date(cell.getValue());
                return date.toISOString();
            },
            //editor: "date",
            // editorParams: {
            //     min: "01/01/2020", // the minimum allowed value for the date picker
            //     max: "02/12/2022", // the maximum allowed value for the date picker
            //     format: "dd/MM/yyyy", // the format of the date value stored in the cell
            //     verticalNavigation: "table", //navigate cursor around table without changing the value
            //     elementAttributes: {
            //         title: "slide bar to choose option" // custom tooltip
            //     }
            // }
        },
        {
            title: "user",
            field: "userId",
            width: 150,
            headerFilter: "input",
            editable: true,
            editor: "list",
            editorParams: (cell) => {
                const rowData = cell.getRow().getData();
                const rowId = rowData.id;
                let values = [];
                values = USER_LIST.map((x) => {
                    return { value: x.id, label: x.name };
                });
                return {
                    values: values,
                    allowEmpty: true,
                    autocomplete: true,
                    listOnEmpty: true,
                };
            },
            headerFilterFunc: (headerValue, rowValue, rowData, filterParams) => {
                const userName = headerValue;
                const rowUserName = USER_LIST.find((x) => x.id == rowValue).name;
                return rowUserName.toLowerCase().includes(userName.toLowerCase());
            },
            formatter: function (cell, formatterParams, onRendered) {
                return USER_LIST.find((x) => x.id == cell.getValue()).name;
                //return cell.getRow().getData().userName;
            },
            formatterParams: USER_LIST.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {}),
        },
        {
            title: "product",
            field: "productId",
            width: 150,
            editable: true,
            editor: "list",
            editorParams: {
                values: PRODUCT_LIST.map((x) => {
                    return { value: x.id, label: x.name };
                }),
                allowEmpty: true,
                autocomplete: true,
                listOnEmpty: true,
            },
            // editor: select2Editor,
            // editorParams: {
            //     selectOptions: tableProductSelect2Options,
            // },
            formatter: "lookup",
            formatterParams: PRODUCT_LIST.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {}),
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
                valuesLookup: true,
            },
            formatter: "lookup",
            formatterParams: locationLookup.reduce((acc, cur) => {
                acc[cur.value] = cur.label;
                return acc;
            }, {}),
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
            label: "Add row above",
            action: (_e, row) => {
                table.addRow(
                    { id: `${newRowId--}`, state: "added" },
                    true,
                    row
                );
            },
        },
        {
            label: "Add row below",
            action: (e, row) => {
                table.addRow(
                    { id: `${newRowId--}`, state: "added" },
                    false,
                    row
                );
            },
        },
    ],
});

// 체크 셀(체크박스 외부) 클릭시 row 선택
table.on("cellClick", function (e, cell) {
    // if cell is row selection cell, then change selection state
    if (cell.getColumn().getDefinition().formatter == "rowSelection") {
        cell.getRow().toggleSelect();
    }
});

table.on("cellEditing", function (cell) {
    console.log(cell);
    const editor = cell.getElement();
    console.log(editor);
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

$("#datepicker").datepicker({});

$("#selectize").selectize({
    valueField: "id",
    labelField: "title",
    searchField: "title",
    options: USER_LIST.map((x) => {
        return { id: x.id, title: x.name };
    }),
    create: false,
});
