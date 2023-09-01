import Excel from 'exceljs';
import { readCellValue, readCellValueByName } from 'utils/CellReader';


export interface PropertyHeader {
    /**
     * property name like name, age, etc.
     */
    property: string;

    /**
     * header name like 이름, 나이, etc.
     */
    header: string;
}

export interface PropertyCell {

    /**
     * property name like name, age, etc.
     */
    property: string;
    /**
     * cell name like A1, B2, C3, etc.
     */
    cell: string;
}

export class SimpleListExcelConvertService {

    convert(sheet: Excel.Worksheet, propertyHeaderList: PropertyHeader[]): any {
        const numberPropertyMap = new Map<number, string>();

        const headerRow = sheet.getRow(1);
        headerRow.eachCell((cell, colNumber) => {
            const header = readCellValue(cell)?.toString();
            if (header) {
                const property = propertyHeaderList.find(x => x.header === header)?.property;
                if (property) {
                    numberPropertyMap.set(colNumber, property);
                }
            }
        });

        const list: any = [];
        sheet.eachRow((row, _) => {
            if (row.number === 1) // skip header row
                return;

            const model = {} as any;
            row.eachCell((cell, colNumber) => {
                const property = numberPropertyMap.get(colNumber);
                if (property) {
                    model[property] = readCellValue(cell);
                }
            });
            list.push(model);
        });
        return list;

    }

    convert2(sheet: Excel.Worksheet, propertyHeaderList: PropertyHeader[]): any {
        const numberPropertyMap = new Map<number, string>();
        const headerRow = sheet.getRow(1);
        headerRow.eachCell((cell, colNumber) => {
            const header = readCellValue(cell)?.toString();
            if (header) {
                const property = propertyHeaderList.find(x => x.header === header)?.property;
                if (property) {
                    numberPropertyMap.set(colNumber, property);
                }
            }
        });

        const list: any = [];
        sheet.eachRow((row, _) => {
            if (row.number === 1) // skip header row
                return;

            const model = {} as any;
            row.eachCell((cell, colNumber) => {
                const property = numberPropertyMap.get(colNumber);
                if (property) {
                    model[property] = readCellValue(cell);
                }
            });
            list.push(model);
        });
        return list;
    }
}

export class MasterDetailListExcelConvertService {

    /**
     * Check if the row is a new row or a merged row or empty row.
     * @param row a row to check
     * @returns true if the row is a new row, false if the row is a merged row or empty row.
     */
    private isMasterNewRow = (row: Excel.Row, masterNumberPropertyMap: Map<number, string>): boolean => {
        if (row.number === 1) // header row
            return false;
        if (row.number === 2) // first row
            return true;

        // case 1. row is empty
        let isRowEmpty = true;
        for (const [colNumber, _] of masterNumberPropertyMap.entries()) {
            const cell = row.getCell(colNumber);
            if (cell.value) {
                isRowEmpty = false;
                break;
            }
        }
        if (isRowEmpty)
            return false;

        // case 2. row is merged. all cells are same as previous row.
        let isRowMerged = true;
        const prevRow = row.worksheet.getRow(row.number - 1);
        for (const [colNumber, _] of masterNumberPropertyMap.entries()) {
            const cell = row.getCell(colNumber);
            const prevCell = prevRow.getCell(colNumber);
            if (cell == null && prevCell == null) {
                continue;
            }
            if (cell && prevCell && cell.value === prevCell.value) {
                continue;
            }
            isRowMerged = false;
        }

        return !isRowMerged;

    }


    convert(sheet: Excel.Worksheet, detailName: string,
        masterPropertyHeaderList: PropertyHeader[],
        detailPropertyHeaderList: PropertyHeader[]): any {

        // create column number <-> property map
        const masterNumberPropertyMap = new Map<number, string>();
        const detailNumberPropertyMap = new Map<number, string>();
        const headerRow = sheet.getRow(1);
        headerRow.eachCell((cell, colNumber) => {
            const header = readCellValue(cell)?.toString();
            if (header) {
                const masterPproperty = masterPropertyHeaderList.find(x => x.header === header)?.property;
                if (masterPproperty) {
                    masterNumberPropertyMap.set(colNumber, masterPproperty);
                }
                const detailProperty = detailPropertyHeaderList.find(x => x.header === header)?.property;
                if (detailProperty) {
                    detailNumberPropertyMap.set(colNumber, detailProperty);
                }
            }
        });

        const list: any = [];
        sheet.eachRow((row, _) => {
            if (row.number === 1) // skip header row
                return;

            const isMasterNewRow = this.isMasterNewRow(row, masterNumberPropertyMap);
            // add new master row
            let model: any;
            if (isMasterNewRow) {
                model = {};
                model[detailName] = [];
                list.push(model);
            } else {
                model = list[list.length - 1];
            }
            model[detailName].push({});

            row.eachCell((cell, colNumber) => {
                // if property is master property, then set value to model
                if (isMasterNewRow && masterNumberPropertyMap.has(colNumber)) {
                    const property = masterNumberPropertyMap.get(colNumber);
                    if (property) {
                        model[property] = readCellValue(cell);
                    }
                }
                // if property is detail property, then set value to detail
                else if (detailNumberPropertyMap.has(colNumber)) {
                    const property = detailNumberPropertyMap.get(colNumber);
                    if (property) {
                        const detailItemIndex = model[detailName].length - 1;
                        const detail = model[detailName][detailItemIndex];
                        detail[property] = readCellValue(cell);
                    }
                }
            });
        });
        return list;
    };
}

export class CustomExcelConvertService {
    convert = (sheet: Excel.Worksheet, propertyCellList: PropertyCell[]): any => {
        const model: any = {};

        for (const { property, cell } of propertyCellList) {
            model[property] = readCellValueByName(sheet, cell);
        }

        return model;
    }

}