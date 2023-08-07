import { Button } from '@mui/material';
import Excel from 'exceljs';

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
                                console.log(colNumber, cell.formulaType, cell.value, cell.result);
                            else
                                console.log(colNumber, cell.value, cell.text);

                        });
                    })
                })
            })
        };
    }

    return (
        <>
            <Button variant="outlined" component="label">
                Read excel file
                <input onChange={onFileChanged} hidden accept=".xlsx" type="file" />
            </Button>
        </>

    )
};

export default ReadFile;