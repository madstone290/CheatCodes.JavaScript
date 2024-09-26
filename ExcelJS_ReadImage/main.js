const getColumnOption = (caption, field, isImage = false) => {
    return {
        caption,
        field,
        isImage,
    }
};

window.addEventListener('load', () => {
    let data = [];
    const writeButton = document.getElementById("write");
    writeButton.onclick = async () => {
        const excelWriter = new ExcelWriter();

        const buffer = await excelWriter.writeTable(data, {
            sheetName: "Sheet1",
            headerRowStartNumber: 1,
            dataRowStartNumber: 2,
            dataRows: data,
            columns: [
                getColumnOption("이름", "name", false),
                getColumnOption("나이", "age", false),
                getColumnOption("성별", "sex", false),
                getColumnOption("사진", "photo", true),
                getColumnOption("생일", "birthday", false),
                getColumnOption("추가계산", "added", false),
                getColumnOption("결혼여부", "marry", false),
                getColumnOption("사진2", "photo2", true),
            ]
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
            getColumnOption("이름", "name", false),
            getColumnOption("나이", "age", false),
            getColumnOption("성별", "sex", false),
            getColumnOption("사진", "photo", true),
            getColumnOption("생일", "birthday", false),
            getColumnOption("추가계산", "added", false),
            getColumnOption("결혼여부", "marry", false),
            getColumnOption("사진2", "photo2", true),
        ]
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