namespace Base {
    type ColumnType = "string" | "number" | "date" | "boolean" | "image";

    interface TableColumn {
        caption: string;
        field: string;
        isImage: boolean;
    }

    interface TableOptions {
        /**
         * 테이블이 위치한 시트 번호. 1부터 시작
         */
        sheetNumber: number;
        /**
         * 헤더 행 번호. 1부터 시작
         */
        headerRowNumber: number;

        /**
         * 데이터가 시작되는 행 번호. 1부터 시작
         */
        dataRowNumber: number;

        /**
         * 컬럼 정보
         */
        columns: TableColumn[];
    }

    /**
     * ExcelJS getImages 함수의 반환값
     */
    interface ImageInfo {
        type: 'image',
        imageId: string;
        range: import('exceljs').ImageRange;
    }
}
