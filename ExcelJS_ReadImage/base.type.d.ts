namespace Base {
    type ColumnType = "string" | "number" | "date" | "boolean" | "image";

    interface TableColumn {
        caption: string;
        field: string;
        type: ColumnType;
    }

    interface ReadTableOptions {
        /**
         * 테이블이 위치한 시트 번호. 1부터 시작
         */
        sheetNumber: number;
        /**
         * 헤더 행 번호. 1부터 시작
         */
        headerRowStartNumber: number;

        /**
         * 데이터가 시작되는 행 번호. 1부터 시작
         */
        dataRowStartNumber: number;

        /**
         * 컬럼 정보
         */
        columns: TableColumn[];
    }

    interface WriteTableOptions {
        sheetName: string;
        columns: TableColumn[];
        headerRowStartNumber: number;
        dataRowStartNumber: number;
        dataRows: object[];
    }

    interface WriteTableColumn extends TableColumn {
        readonly: boolean;
        dataValidation?: {
            type: "list";
            dataSource: string[];
            errorTitle?: string;
            error?: string;
        };
    }

    interface WriteTableAsArrayOptions {
        sheetName: string;
        headerRowStartNumber: number;
        dataRowStartNumber: number;
        rowHeight: number;
        columnWidth: number[];
        columns: WriteTableColumn[];
        dataRows: any[][];
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
