import Excel from 'exceljs';

/**
 * Read the actual value of a cell.
 * @param sheet a sheet to read
 * @param cellName a cell name to read
 * @returns actual value of the cell
 */
export function readCellValueByName(sheet: Excel.Worksheet, cellName: string) {
    return readCellValue(sheet.getCell(cellName));
}

/**
 * Read the actual value of a cell. 
 * If the cell has a formula, the result of the formula is returned.
 * @param cell a cell to read
 * @returns actual value of the cell
 */
export function readCellValue(cell: Excel.Cell) {
    if (cell.formula)
        return cell.result
    else
        return cell.value;
}