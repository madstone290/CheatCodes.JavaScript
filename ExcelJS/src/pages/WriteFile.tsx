import { Button } from '@mui/material';
import Excel from 'exceljs';
import FileSaver from 'file-saver';

const WriteFile = () => {

    const onButtonClick = () => {

        const workbook = new Excel.Workbook();
        workbook.addWorksheet("Sheet1");

        const ws = workbook.getWorksheet("Sheet1");

        ws.getCell('A1').value = 'John Doe';
        ws.getCell('B1').value = 'gardener';
        ws.getCell('C1').value = new Date().toLocaleString();


        const r3 = ws.getRow(3);
        r3.values = [1, 2, 3, 4, 5, 6];

        const fileName = 'simple.xlsx';

        workbook.xlsx
            .writeBuffer()
            .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${fileName}_${Date.now()}.xlsx`))
            .then(() => {
                console.log('file created');
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    return (
        <>
            <Button onClick={onButtonClick} variant="outlined">Save excel file</Button>
        </>
    )
};

export default WriteFile;