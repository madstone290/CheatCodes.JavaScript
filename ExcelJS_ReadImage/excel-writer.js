class ExcelWriter {
    constructor() {
    }

    /**
     * 
     * @param {object} dataRows 
     * @param {Base.WriteTableOptions} options 
     * @returns {Promise<ArrayBuffer>}
     */
    async writeTable(dataRows, options) {
        const workBook = new ExcelJS.Workbook();
        const sheet = workBook.addWorksheet(options.sheetName);
        const headerRow = sheet.addRow(options.columns.map(column => column.caption));
        headerRow.font = { bold: true };

        sheet.columns.forEach(column => {
            column.width = 10;
            if (column.number == 4) {
                column.width = 20;
            }
        });

        dataRows.forEach(dataRow => {
            const row = sheet.addRow();
            row.height = 100;
            console.log("row", row.number);
            let columnNumber = 0;
            for (const column of options.columns) {
                columnNumber++;
                const value = dataRow[column.field];
                if (value == null) {
                    continue;
                }

                if (column.isImage) {
                    const imageId = workBook.addImage({
                        buffer: value.buffer,
                        extension: 'png',
                    });
                    const range = {
                        tl: {
                            col: columnNumber - 1 + 0.1,
                            row: row.number - 1 + 0.1,
                        },
                        ext: { width: 80, height: 80, },
                    };
                    sheet.addImage(imageId, range);
                }
                else {
                    const cell = row.getCell(columnNumber);
                    cell.value = value;
                }
            }
        });

        const buffer = await workBook.xlsx.writeBuffer();
        return buffer;
    }
}