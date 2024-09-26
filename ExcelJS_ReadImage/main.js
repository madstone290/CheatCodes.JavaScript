window.addEventListener('load', () => {
    const excelReader = new ExcelReader();

    const getColumnOption = (caption, field, isImage = false) => {
        return {
            caption,
            field,
            isImage,
        }
    };

    /**
     * @type {Base.TableOptions}
     */
    const options = {
        headerRowNumber: 1,
        dataRowNumber: 2,
        sheetNumber: 1,
        columns: [
            getColumnOption("Name", "Name", false),
            getColumnOption("Age", "Age", false),
            getColumnOption("Sex", "Sex", false),
            getColumnOption("Photo", "Photo", true),
            getColumnOption("Birthday", "Birthday", false),
            getColumnOption("Added", "Added", false),
            getColumnOption("Marry", "isMarried", false),
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

        const models = await excelReader.readExcel(input.files[0], options);
        console.log("models", models);


        // create table for models
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");

        // Assuming models have consistent keys
        const columns = Object.keys(models[0]);
        columns.forEach(column => {
            const headerCell = document.createElement("th");
            headerCell.textContent = column;
            headerRow.appendChild(headerCell);
        });

        table.appendChild(headerRow);

        models.forEach(model => {
            const row = document.createElement("tr");
            columns.forEach(column => {
                const cell = document.createElement("td");
                if (column === "Photo") {
                    for (const imgObj of model[column]) {
                        const img = document.createElement("img");
                        img.src = URL.createObjectURL(new Blob([imgObj.buffer]));
                        cell.appendChild(img);
                    }
                }
                else {
                    cell.textContent = model[column];
                }

                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        document.body.appendChild(table);
    };

});