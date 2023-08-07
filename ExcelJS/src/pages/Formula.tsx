import { Button } from '@mui/material';
import Excel from 'exceljs';
import FileSaver from 'file-saver';

const Formula = () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    ws.getCell('A1').value = 1;
    ws.getCell('A2').value = 2;
    ws.getCell('A3').value = 3;
    ws.getCell('A4').value = 4;
    ws.getCell('A5').value = 5;
    ws.getCell('A6').value = 6;
    
    const a7 = ws.getCell('A7');
    a7.value = { formula: "SUM(A1:A6)", result: 21 } as Excel.CellFormulaValue;
    a7.style.font = { bold: true };
    
    console.log("a7 result",  a7.result)

    const onButtonClick = () => {
        wb.xlsx
            .writeBuffer()
            .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${"formula"}_${Date.now()}.xlsx`))
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

export default Formula;