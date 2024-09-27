class ExcelWriter {
    constructor() {
    }

    /**
     * 배열 데이터를 엑셀 파일로 저장한다.
     * @param {Base.WriteTableAsArrayOptions} options 
     * @returns {Promise<ArrayBuffer>}
     */
    async WriteTableAsArray(options) {
        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet(options.sheetName);
        sheet.views = [
            { state: 'frozen', xSplit: 0, ySplit: 1 }
        ];
        const headerRow = sheet.getRow(options.headerRowStartNumber);
        headerRow.font = { bold: true };
        headerRow.values = options.columns.map(column => column.caption);
        sheet.columns.forEach((column, index) => {
            column.width = options.columnWidth[index];
        });

        for (let columnIndex = 0; columnIndex < options.columns.length; columnIndex++) {
            const tableColumn = options.columns[columnIndex];
            const columnNumber = columnIndex + 1;

            if (tableColumn.dataValidation) {
                sheet.getRows(2, 9999).forEach(row => {
                    const dataSourceString = tableColumn.dataValidation.dataSource.join(',');
                    const formulaeString = `"${dataSourceString}"`;

                    row.getCell(columnNumber).dataValidation = {
                        type: 'list',
                        allowBlank: true,
                        operator: 'equal',
                        formulae: [formulaeString],
                        showErrorMessage: true,
                        errorStyle: 'error',
                        errorTitle: tableColumn.dataValidation.errorTitle ?? 'Invalid value',
                        error: tableColumn.dataValidation.error ?? 'The value is not valid',
                    }
                });
            }
        }

        let rowNumber = options.dataRowStartNumber - 1;
        const dataRows = options.dataRows;
        dataRows.forEach(dataRow => {
            rowNumber++;
            const valueExceptImage = dataRow.map((value, index) => {
                const column = options.columns[index];
                if (column.type === "image") {
                    return null;
                }
                return value;
            });
            const row = sheet.getRow(rowNumber);
            row.height = options.rowHeight;
            row.values = valueExceptImage;

            for (let columnIndex = 0; columnIndex < options.columns.length; columnIndex++) {
                const isImage = options.columns[columnIndex].type === "image";
                if (isImage) {
                    const imageId = workbook.addImage({
                        buffer: dataRow[columnIndex].buffer,
                        extension: 'png',
                    });
                    const range = {
                        tl: {
                            col: columnIndex,
                            row: rowNumber - 1,
                        },
                        ext: { width: 80, height: 80, },
                    };
                    sheet.addImage(imageId, range);
                }
            }
        });


        // 셀 스타일 적용
        sheet.eachRow(row => {
            row.eachCell(cell => {
                const columnIndex = Number(cell.col) - 1;
                const column = options.columns[columnIndex];
                cell.style.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

                if (column.readonly) {
                    cell.style.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFD9D9D9' },
                    }
                }
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
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

                if (column.type) {
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