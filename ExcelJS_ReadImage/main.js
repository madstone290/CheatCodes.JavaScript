/**
 * 
 * @param {*} caption 
 * @param {*} field 
 * @param {*} type 
 * @returns {Base.WriteTableColumn}
 */
const getColumnOption = (caption, field, type = "string", readonly = false) => {
    return {
        caption,
        field,
        type,
        readonly,
    }
};

window.addEventListener('load', () => {
    let data = [];


    const dropdown = document.getElementById("dropdown");
    dropdown.onclick = async (e) => {
        const excelWriter = new ExcelWriter();
        
        const dataAsArray = [
            ["홍길동", 20, "M(남)"],
            ["김철수", 30, "M(남)"],
            ["박영희", 40, "F(여)"],
        ];

        const buffer = await excelWriter.WriteTableAsArray({
            sheetName: "Sheet1",
            columns: [
                getColumnOption("이름", "name", "string", true),
                getColumnOption("나이", "age", "number", true),
                {
                    ...getColumnOption("성별", "sex"),
                    dataValidation: {
                        type: "list",
                        dataSource: ["M(남)", "F(여)"]
                    }
                }
            ],
            rowHeight: 80,
            columnWidth: [20, 20, 20, 20, 20, 20, 20, 20],
            headerRowStartNumber: 1,
            dataRowStartNumber: 2,
            dataRows: dataAsArray,
        });

        // download excel file
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.xlsx";
        a.click();
    };

    const writeButton = document.getElementById("write");
    writeButton.onclick = async () => {
        const excelWriter = new ExcelWriter();

        // const buffer = await excelWriter.writeTable(data, {
        //     sheetName: "Sheet1",
        //     headerRowStartNumber: 1,
        //     dataRowStartNumber: 2,
        //     dataRows: data,
        //     columns: [
        //         getColumnOption("이름", "name", false),
        //         getColumnOption("나이", "age", false),
        //         getColumnOption("성별", "sex", false),
        //         getColumnOption("사진", "photo", true),
        //         getColumnOption("생일", "birthday", false),
        //         getColumnOption("추가계산", "added", false),
        //         getColumnOption("결혼여부", "marry", false),
        //         getColumnOption("사진2", "photo2", true),
        //     ]
        // });

        const dataAsArray = data.map(model => {
            return [
                model.name,
                model.age,
                model.sex,
                model.photo,
                model.birthday,
                model.added,
                model.marry,
                model.photo2,
            ];
        });

        const buffer = await excelWriter.WriteTableAsArray({
            sheetName: "Sheet1",
            columns: [
                getColumnOption("이름", "name", "string", true),
                getColumnOption("나이", "age", "number", true),
                getColumnOption("성별", "sex"),
                getColumnOption("사진", "photo", "image"),
                getColumnOption("생일", "birthday"),
                getColumnOption("추가계산", "added"),
                getColumnOption("결혼여부", "marry"),
                getColumnOption("사진2", "photo2", "image"),
            ],
            rowHeight: 80,
            columnWidth: [20, 20, 20, 20, 20, 20, 20, 20],
            headerRowStartNumber: 1,
            dataRowStartNumber: 2,
            dataRows: dataAsArray,
        });

        // download excel file
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.xlsx";
        a.click();
    };


    const excelReader = new ExcelReader();


    /**
     * @type {Base.ReadTableOptions}
     */
    const readTableOptions = {
        headerRowStartNumber: 1,
        dataRowStartNumber: 2,
        sheetNumber: 1,
        columns: [
            getColumnOption("이름", "name"),
            getColumnOption("나이", "age"),
            getColumnOption("성별", "sex"),
            getColumnOption("사진", "photo", "image"),
            getColumnOption("생일", "birthday"),
            getColumnOption("추가계산", "added"),
            getColumnOption("결혼여부", "marry"),
            getColumnOption("사진2", "photo2", "image"),
        ],
    };

    /**
     * @type {HTMLInputElement}
     */
    // @ts-ignore
    const input = document.getElementById("file");
    input.onchange = async (e) => {
        if (!input.files)
            return;

        const models = await excelReader.readExcel(input.files[0], readTableOptions);
        data = models;
        console.log("models", models);


        // create table for models
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        // Assuming models have consistent keys
        const dataFields = Object.keys(models[0]);
        dataFields.forEach(column => {
            const headerCell = document.createElement("th");
            headerCell.textContent = column;
            headerRow.appendChild(headerCell);
        });

        table.appendChild(headerRow);

        models.forEach(model => {
            const row = document.createElement("tr");
            dataFields.forEach(field => {
                const cell = document.createElement("td");
                if (field === "photo" || field === "photo2") {
                    const buffer = model[field].buffer;
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(new Blob([buffer]));
                    cell.appendChild(img);
                }
                else {
                    cell.textContent = model[field];
                }

                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        document.body.appendChild(table);
    };

});