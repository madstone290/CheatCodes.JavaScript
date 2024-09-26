/**
  * @type {typeof import('exceljs')}
  */
// @ts-ignore
const Excel = window.ExcelJS;

class ExcelReader {
    constructor() {

    }

    /**
     * @param {File} file 
     * @param {Base.ReadTableOptions} options
     * @returns 
     */
    async readExcel(file, options) {
        const emptyWorkBook = new Excel.Workbook();
        const buffer = await this.readFileAsArrayBuffer(file);
        const workbook = await emptyWorkBook.xlsx.load(buffer);
        const sheet = workbook.getWorksheet(options.sheetNumber);
        const columnMap = this.getColumnMap(sheet, options);
        const dataRows = this.getDataRows(sheet, options, columnMap);
        return dataRows;
    }

    /**
     * 테이블에서 데이터를 가져온다.
     * @param {import('exceljs').Worksheet} sheet
     * @param {Base.ReadTableOptions} options
     * @param {Map<number, Base.TableColumn>} columnMap 
     */
    getDataRows(sheet, options, columnMap) {
        const dataRows = [];
        const imageInfos = sheet.getImages();
        console.log("imageInfos", imageInfos);
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber < options.dataRowStartNumber) {
                return;
            }
            const dataRow = this.getDataRow(row, columnMap, imageInfos);
            dataRows.push(dataRow);
        });
        return dataRows;
    }


    /**
     * 행에서 데이터를 가져온다.
     * @param {import('exceljs').Row} row 
     * @param {Map<number, Base.TableColumn>} columnMap
     * @param {Base.ImageInfo[]} imageInfos
     */
    getDataRow(row, columnMap, imageInfos) {
        const dataRow = {};
        // 행의 각 셀을 순회하면서 데이터를 가져온다.
        row.eachCell(cell => {
            const column = columnMap.get(Number(cell.col));
            if (column == null) {
                return;
            }
            const cellValue = cell.formula ? cell.result : cell.value;
            dataRow[column.field] = cellValue;
        });
        console.log(columnMap);

        // 이미지는 셀에 값으로 존재하지 않고 별도의 이미지로 존재한다.
        // 이미지의 top-left를 통해 이미지가 있는 셀을 찾아서 이미지를 가져온다.
        const imageColumnNumbers = Array.from(columnMap.entries()).filter(entry => entry[1].type == "image").map(entry => entry[0]);
        for (const columnNumber of imageColumnNumbers) {
            const cellImageInfo = imageInfos.find(imageInfo => {
                const cellRowIndex = row.number - 1;
                const cellColIndex = columnNumber - 1;
                return imageInfo.range.tl.nativeCol === cellColIndex && imageInfo.range.tl.nativeRow === cellRowIndex;
            });

            const cellImage = row.worksheet.workbook.getImage(Number(cellImageInfo.imageId));
            const column = columnMap.get(columnNumber);
            dataRow[column.field] = cellImage;
        }
        return dataRow;
    }


    /**
     * Read a file as ArrayBuffer using async/await
     * @param {File} file
     * @returns {Promise<ArrayBuffer>}
     */
    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const buffer = /** @type {ArrayBuffer} */ (reader.result);
                resolve(buffer);
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * 테이블 컬럼맵을 생성한다.
     * @param {import('exceljs').Worksheet} sheet
     * @param {Base.ReadTableOptions} options
     * @returns 
     */
    getColumnMap(sheet, options) {
        /**
         * @type {Map<number, Base.TableColumn>}
         */
        const columnMap = new Map();
        sheet.getRow(options.headerRowStartNumber).eachCell(cell => {
            const column = options.columns.find(column => column.caption === cell.text.trim());
            columnMap.set(Number(cell.col), column);
        });
        return columnMap;
    }
}
