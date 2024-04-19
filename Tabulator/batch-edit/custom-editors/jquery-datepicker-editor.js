/*
Tabulator 테이블 셀에서 사용할 jquery datepicker 에디터
*/

function jqueryDatePickerEditor(cell, onRendered, success, cancel, editorParams) {
    const editorEl = document.createElement("input");
    const editor = $(editorEl);
    onRendered(function () {

        editor.datepicker({
        });

        // 초기값 설정
        editor.datepicker('setDate', new Date(cell.getValue()));
        // 에디터 열기
        editor.datepicker('show');

        // select2 값이 변경되면 success 콜백 호출
        editor.on('change', function (e) {
            console.log(e);
            console.log("change", editor.val());
            success(editor.val());
        });
    });
    return editorEl;
}

export { jqueryDatePickerEditor };