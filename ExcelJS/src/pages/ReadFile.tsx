import { Box, Button, Input, InputLabel, Stack, Typography } from '@mui/material';
import Excel from 'exceljs';
import React from 'react';
import { CustomExcelConvertService, MasterDetailListExcelConvertService, SimpleListExcelConvertService } from 'services/ExcelConvertService';

const ReadFile = () => {
    const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return;
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader()

        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            const buffer = reader.result as ArrayBuffer;
            wb.xlsx.load(buffer).then(workbook => {
                console.log("workbook", workbook)
                workbook.eachSheet((sheet, _) => {
                    sheet.eachRow((row, rowNumber) => {
                        console.log(rowNumber, row.values)
                        row.eachCell((cell, colNumber) => {
                            if (cell.formula)
                                console.log(colNumber, cell.value, cell.result);
                            else
                                console.log(colNumber, cell.value);
                        });
                    })
                })
            })
        };
    }

    const onClearClick = () => {
        (document.getElementById('FileInput') as HTMLInputElement).value = '';
    };

    const propertyHeaderMap = new Map<string, string>([
        ["Name", "이름"],
        ["Age", "나이"],
        ["Birthday", "생일"],
        ["Sex", "성별"],
        ["Height", "키"],
        ["Weight", "몸무게"],
        ["BMI", "BMI"],
    ]);

    const onSimpleListConvertFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return;
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader()
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            const buffer = reader.result as ArrayBuffer;
            const workbook = await wb.xlsx.load(buffer);
            const sheet = workbook.getWorksheet(1);
            console.log("sheet", sheet);
            const converter = new SimpleListExcelConvertService();
            const model = converter.convert(sheet, propertyHeaderMap);
            console.log("Simple model", model);
        };
    };

    const detailName = "Cars";
    const masterPropertyHeaderMap = new Map<string, string>([
        ["Name", "이름"],
        ["Age", "나이"],
        ["Birthday", "생일"],
        ["Sex", "성별"],
        ["Height", "키"],
        ["Weight", "몸무게"],
        ["BMI", "BMI"],
    ]);
    const detailPropertyHeaderMap = new Map<string, string>([
        ["Brand", "브랜드"],
        ["Model", "모델"],
        ["Year", "연식"],
        ["Price", "가격"],
        ["Color", "색상"],
    ]);

    const onMasterDetailListConvertFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return;
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader()
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            const buffer = reader.result as ArrayBuffer;
            const workbook = await wb.xlsx.load(buffer);
            const sheet = workbook.getWorksheet(1);
            console.log("sheet", sheet);
            const converter = new MasterDetailListExcelConvertService();
            const model = converter.convert(sheet, detailName, masterPropertyHeaderMap, detailPropertyHeaderMap);
            console.log("Master detail Model", model);
        };
    };


    const propertyCellMap = new Map<string, string>([
        ["Name", "C3"],
        ["Age", "C4"],
        ["Birthday", "C5"],
        ["Sex", "E3"],
        ["Height", "E4"],
        ["Weight", "E5"],
        ["BMI", "F3"],
        ["BMR", "F4"],
        ["BodyFat", "F5"],
        ["Man", "C8"],
        ["Woman", "E8"],

    ]);

    const onCustomConvertFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return;
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader()
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {

            const buffer = reader.result as ArrayBuffer;
            const workbook = await wb.xlsx.load(buffer);
            const sheet = workbook.getWorksheet(1);
            console.log("sheet", sheet)
            const converter = new CustomExcelConvertService();
            const model = converter.convert(sheet, propertyCellMap);
            console.log("Custom Model", model);
        };
    };

    return (
        <Box>
            <Box sx={{ padding: 3 }}>
                <Button variant="outlined" component="label">
                    Read excel file
                    <input id='FileInput' onChange={onFileChanged} hidden accept=".xlsx" type="file" />
                </Button>
            </Box >
            <Box sx={{ padding: 3 }}>
                <Button variant="outlined" component="label">
                    Simple list convert
                    <input onChange={onSimpleListConvertFileChanged} hidden accept=".xlsx" type="file" />
                </Button>
            </Box>

            <Box sx={{ padding: 3 }}>
                <Button variant="outlined" component="label">
                    Master detail list convert
                    <input onChange={onMasterDetailListConvertFileChanged} hidden accept=".xlsx" type="file" />
                </Button>
            </Box>


            <Box sx={{ padding: 3 }}>
                <Button variant="outlined" component="label">
                    Custom convert
                    <input onChange={onCustomConvertFileChanged} hidden accept=".xlsx" type="file" />
                </Button>
            </Box>
        </Box>
    )
};
export default ReadFile;