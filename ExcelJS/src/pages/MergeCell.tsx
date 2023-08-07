import { Button } from '@mui/material';
import Excel from 'exceljs';
import FileSaver from 'file-saver';

const MergeCell = () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    ws.getCell('A1').value = 'old falcon';
    ws.getCell('A1').style.alignment = { horizontal: 'center', vertical: 'middle' };

    ws.mergeCells('A1:C4');

    ws.getCell("D1").value = 345;
    ws.getCell("D1").style.alignment = { horizontal: "left", vertical: "top" };
    ws.mergeCells("D1:F3");

    const rows = ws.getRows(1, ws.actualRowCount)!;
    for (const row of rows) {
        row.eachCell((cell, colNumber) => {
            if (cell.isMerged) {
                if (cell.master.address === cell.address)
                    console.log(row.number, colNumber, cell.value);
            } else {
                console.log(row.number, colNumber, cell.value);
            }
        });
    }

    const onButtonClick = () => {
        wb.xlsx
            .writeBuffer()
            .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${"mergecell"}_${Date.now()}.xlsx`))
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

export default MergeCell;