/**
 * @type {typeof import('exceljs')}
 */
// @ts-ignore
const Excel = window.ExcelJS;

/**
 * data/users.xlsx 파일을 읽어서 데이터를 가져온다.
 */
class Main {


    /**
     * 
     * @param {File} file 
     * @returns {Promise<any[]>}
     */
    readFile(file) {

        return new Promise((resolve, reject) => { 
            const wb = new Excel.Workbook();
            const reader = new FileReader()

            reader.readAsArrayBuffer(file);

            reader.onload = () => {
                const buffer =  /** @type {ArrayBuffer} */ (reader.result);
                wb.xlsx.load(buffer).then(workbook => {
                    console.log("loaded workbook", workbook);
                    const sheet = workbook.getWorksheet(1);
                    const modelList = [];

                    const headerNumberTextMap = new Map();
                    sheet.getRow(1).eachCell(cell => {
                        headerNumberTextMap.set(cell.col, cell.text);
                    });
                    console.log("headerMap", headerNumberTextMap);

                    const images = sheet.getImages();
                    console.log("images", images);
                    for(const image of images){
                        // @ts-ignore
                        const imageObj = workbook.getImage(image.imageId);
                        console.log("imageObj", imageObj);
                    }

                    sheet.eachRow((row, rowNumber) => {
                        if (rowNumber === 1) {
                            return;
                        }
                        const model = {};
                        modelList.push(model);
                        row.eachCell((cell, colNumber) => {
                            const headerName = headerNumberTextMap.get(colNumber);
                            console.log("headerName", headerName);
                            if (headerName === undefined)
                                return;
                            if (headerName !== "Photo") {
                                model[headerName] = cell.text;
                            }
                        });

                        const photoCellColNum = Array.from(headerNumberTextMap.entries())
                            .find(([key, value]) => value === "Photo")[0];
                        console.log("photoCellCol", photoCellColNum);

                        const colIndex = photoCellColNum - 1;
                        const rowIndex = rowNumber - 1;

                        model.Photo = [];
                        const cellImages = images.filter(image =>
                            image.range.tl.nativeRow === rowIndex && image.range.tl.nativeCol === colIndex);
                        if (cellImages.length > 0) {

                            for (const cellImage of cellImages) {
                                const imageId = /** @type {any} */ (cellImage.imageId);
                                const imgObject = workbook.getImage(imageId);
                                model.Photo.push(imgObject);
                            }
                        }
                    });
                    resolve(modelList);
                })
            };


        });
    }

}

window.addEventListener('load', () => {
    const main = new Main();
    /**
     * @type {HTMLInputElement}
     */
    // @ts-ignore
    const input = document.getElementById("file");
    input.onchange = async (e) => {
        if (!input.files)
            return;
        const models = await main.readFile(input.files[0]);
        console.log("models", models);

        for (const model of models) {
            console.log("model", model);
            for (const img of model.Photo) {
                console.log("img", img);
                const imgElement = document.createElement("img");
                const imgUrl = URL.createObjectURL(new Blob([img.buffer]));
                imgElement.src = imgUrl;
                document.body.appendChild(imgElement);
            }
        }
    };

});