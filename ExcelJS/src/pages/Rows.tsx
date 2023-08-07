import { Button } from '@mui/material';
import Excel from 'exceljs';
import FileSaver from 'file-saver';


const Rows = () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    const headers = [
        { header: 'First name', key: 'fn', width: 15 },
        { header: 'Last name', key: 'ln', width: 15 },
        { header: 'Occupation', key: 'occ', width: 15 },
        { header: 'Salary', key: 'sl', width: 15 },
    ]

    ws.columns = headers;

    ws.addRow({
        fn: "Bruce",
        ln: "Wayne",
        occ: "Batman",
        sl: 1000000
    });
    ws.addRow(['John', 'Doe', 'gardener', 1230]);
    ws.addRow({ 'fn': 'Roger', 'ln': 'Roe', 'occ': 'driver', 'sl': 980 });
    ws.addRows([
        ['Lucy', 'Mallory', 'teacher', 780],
        ['Peter', 'Smith', 'programmer', 2300]
    ]);
    ws.addRow({ 'fn': 'Roger', 'ln': 'Roe', 'occ': 'driver', 'sl': 980 });

    console.log(`There are ${ws.actualRowCount} actual rows`);
    console.log(`There are ${ws.rowCount} rows`);

    let rows = ws.getRows(1, 4)!.values();

    for (let row of rows) {
        const fnCell = row.getCell("fn");
        fnCell.value = fnCell.value?.toString().toUpperCase() + "!!!";
        row.eachCell((cell, colNumber) => {
            console.log(colNumber, cell.value);
        });
    }

    const onButtonClick = () => {
        wb.xlsx
            .writeBuffer()
            .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${"rows"}_${Date.now()}.xlsx`))
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
    )
};
export default Rows;