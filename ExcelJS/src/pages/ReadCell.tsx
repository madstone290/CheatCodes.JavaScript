import { TextField } from "@mui/material";
import Excel from 'exceljs';

const ReadCell = () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    ws.addRows([
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20]]
    );

    const v0 = ws.getCell('A1').value;
    console.log(v0);

    const v1 = ws.getCell(1, 1).value;
    console.log(v1);

    const v2 = ws.getRow(2).getCell(2).value;
    console.log(v2);
    return (
        <>
            <TextField label="v0" value={v0?.toString()}></TextField>
            <TextField label="v1" value={v1?.toString()}></TextField>
            <TextField label="v2" value={v2?.toString()}></TextField>
        </>
    )
}
export default ReadCell;