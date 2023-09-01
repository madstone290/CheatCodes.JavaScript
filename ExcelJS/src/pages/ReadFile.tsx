import { Box, Button, Input, InputLabel, Stack, Typography } from '@mui/material';
import Excel from 'exceljs';
import React from 'react';
import {
    CustomExcelConvertService, MasterDetailListExcelConvertService,
    PropertyCell, PropertyHeader, SimpleListExcelConvertService
} from 'services/ExcelConvertService';

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

    const propertyHeaderList: PropertyHeader[] = [
        { property: "Name", header: "이름" },
        { property: "Age", header: "나이" },
        { property: "Birthday", header: "생일" },
        { property: "Sex", header: "성별" },
        { property: "Height", header: "키" },
        { property: "Weight", header: "몸무게" },
        { property: "BMI", header: "BMI" },
    ];

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
            const model = converter.convert(sheet, propertyHeaderList);
            console.log("Simple model", model);
        };
    };

    const detailName = "Cars";
    const masterPropertyHeaderList: PropertyHeader[] = [
        { property: "Name", header: "이름" },
        { property: "Age", header: "나이" },
        { property: "Birthday", header: "생일" },
        { property: "Sex", header: "성별" },
        { property: "Height", header: "키" },
        { property: "Weight", header: "몸무게" },
        { property: "BMI", header: "BMI" },
    ];
    const detailPropertyHeaderList: PropertyHeader[] = [
        { property: "Brand", header: "브랜드" },
        { property: "Model", header: "모델" },
        { property: "Year", header: "연식" },
        { property: "Price", header: "가격" },
        { property: "Color", header: "색상" },
    ];

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
            const model = converter.convert(sheet, detailName, masterPropertyHeaderList, detailPropertyHeaderList);
            console.log("Master detail Model", model);
        };
    };


    const propertyCellList: PropertyCell[] = [
        { property: "Name", cell: "C3" },
        { property: "Age", cell: "C4" },
        { property: "Birthday", cell: "C5" },
        { property: "Sex", cell: "E3" },
        { property: "Height", cell: "E4" },
        { property: "Weight", cell: "E5" },
        { property: "BMI", cell: "F3" },
        { property: "BMR", cell: "F4" },
        { property: "BodyFat", cell: "F5" },
        { property: "Man", cell: "C8" },
        { property: "Woman", cell: "E8" },
    ];

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
            const model = converter.convert(sheet, propertyCellList);
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