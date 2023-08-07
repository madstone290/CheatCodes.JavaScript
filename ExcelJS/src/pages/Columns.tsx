import { Button } from '@mui/material';
import Excel from 'exceljs';
import FileSaver from 'file-saver';

const Columns = () => {
    const wb = new Excel.Workbook();

    const ws = wb.addWorksheet('My Sheet');

    const headers = [
        { header: 'First name', key: 'fn', width: 20 },
        { header: 'Last name', key: 'ln', width: 100 },
        { header: 'Occupation', key: 'occ', width: 50 },
        { header: 'Salary', key: 'sl', width: 50 },
    ]

    ws.columns = headers;

    ws.addRow(['John', 'Doe', 'gardener', 1230]);
    ws.addRow(['Roger', 'Roe', 'driver', 980]);
    ws.addRow(['Lucy', 'Mallory', 'teacher', 780]);
    ws.addRow(['Peter', 'Smith', 'programmer', 2300]);

    ws.getColumn('fn').eachCell((cell, rowNumber) => {

        console.log(rowNumber, cell.value);
    });

    console.log('--------------');

    ws.getColumn('B').eachCell((cell, rowNumber) => {

        console.log(rowNumber, cell.value);
    });

    console.log('--------------');

    ws.getColumn(3).eachCell((cell, rowNumber) => {

        console.log(rowNumber, cell.value);
    });

    console.log('--------------');

    console.log(`There are ${ws.actualColumnCount} columns`);


    const onButtonClick = () => {
        wb.xlsx
            .writeBuffer()
            .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${"columns"}_${Date.now()}.xlsx`))
            .then(() => {
                console.log('file created');
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    return (
        <>
            <Button onClick={onButtonClick}>Save excel file
            </Button>
        </>
    );
};

export default Columns;