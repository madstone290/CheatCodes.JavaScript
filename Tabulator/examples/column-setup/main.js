import { TabulatorFull as Tabulator } from "../../lib/tabulator/js/tabulator_esm.js";

//define data
var tabledata = [
    {
        id: 1, name: "Billy Bob", age: 12, gender: "male", height: 95, col: "red", dob: "14/05/2010",
        text: `Lorem ipsum dolor sit amet,\n consectetur adipiscing elit.\n Sed ac nisl nec nunc ultricies`
    },
    {
        id: 2, name: "Jenny Jane", age: 42, gender: "female", height: 142, col: "blue", dob: "30/07/1954",
        text: `1st\n2ndLine \n 3rd line\n 4th line \n 5tyh line`
    },
    { id: 3, name: "Steve McAlistaire", age: 35, gender: "male", height: 176, col: "green", dob: "04/11/1982" },
    { id: 4, name: "Gail Gringle" },
    { id: 5, name: "Joseph Joseph", },
];

const tableControl1 = new Tabulator("#table1", {
    data: tabledata,
    height: '100%',

    resizableColumnFit: true,
    variableHeight: true,
    columnDefaults: {
        width: 150,
        minWidth: 50,
    },
    // 컬럼 직접 설정
    columns: [
        { title: "Name", field: "name", width: 200, headerVertical: false },
    ],
    // 데이터 속성에 따라 컬럼을 자동으로 생성
    autoColumns: false,
    // 자동 생성된 컬럼을 재정의
    autoColumnsDefinitions: function (definitions) {
        definitions.forEach((column) => {
            if (column.field == "name") {
                column.headerVertical = true;
            }

            if (column.field == "text") {
                column.editor = "textarea";
                column.cssClass = "text-column";
            }
        });
        return definitions;
    },


});