import Excel from 'exceljs';
import { readCellValue, readCellValueByName } from 'utils/CellReader';

export class SimpleListExcelConvertService {
    convert(sheet: Excel.Worksheet, propertyHeaderMap: Map<string, string>): any {
        const headerPropertyMap = new Map<string, string>();
        for (const [property, header] of propertyHeaderMap.entries()) {
            headerPropertyMap.set(header, property);
        }

        const numberPropertyMap = new Map<number, string>();
        const headerRow = sheet.getRow(1);
        headerRow.eachCell((cell, colNumber) => {
            const header = readCellValue(cell)?.toString();
            if (header) {
                const property = headerPropertyMap.get(header);
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
        for (const [colNumber, property] of masterNumberPropertyMap.entries()) {
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
        for (const [colNumber, property] of masterNumberPropertyMap.entries()) {
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
        masterPropertyHeaderMap: Map<string, string>, detailPropertyHeaderMap: Map<string, string>): any {

        // create header <-> property map
        const masterHeaderPropertyMap = new Map<string, string>();
        for (const [property, header] of masterPropertyHeaderMap.entries()) {
            masterHeaderPropertyMap.set(header, property);
        }
        const detailHeaderPropertyMap = new Map<string, string>();
        for (const [property, header] of detailPropertyHeaderMap.entries()) {
            detailHeaderPropertyMap.set(header, property);
        }

        // create column number <-> property map
        const masterNumberPropertyMap = new Map<number, string>();
        const detailNumberPropertyMap = new Map<number, string>();
        const headerRow = sheet.getRow(1);
        headerRow.eachCell((cell, colNumber) => {
            const header = readCellValue(cell)?.toString();
            if (header) {
                const masterPproperty = masterHeaderPropertyMap.get(header);
                if (masterPproperty) {
                    masterNumberPropertyMap.set(colNumber, masterPproperty);
                }
                const detailProperty = detailHeaderPropertyMap.get(header);
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
    convert = (sheet: Excel.Worksheet, propertyCellMap: Map<string, string>): any => {
        const model: any = {};

        for (const [propertyName, cellName] of propertyCellMap.entries()) {
            model[propertyName] = readCellValueByName(sheet, cellName);
        }

        return model;
    }

}