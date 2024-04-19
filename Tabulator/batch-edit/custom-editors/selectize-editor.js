/*
Tabulator 테이블 셀에서 사용할 select2 에디터
*/

function selectizeEditor(cell, onRendered, success, cancel, editorParams) {
    const editor = document.createElement("div");
    // editor.style.width = "100px";

    onRendered(function () {
        var select_2 = $(editor);
        select_2.selectize(editorParams);

        select_2.focus();

        const control = editor.selectize;
        control.setValue(cell.getValue());
        control.open();
        // 초기값 설정
        // select_2.val(cell.getValue()).trigger('change.select2');
        // 드랍다운 열기
        // select_2.select2('open');

        // select2 값이 변경되면 success 콜백 호출
        select_2.on('change', function (e) {
            console.log("change");
            success(select_2.val());
        });

        // select2 드랍다운이 닫히면 cancel 콜백 호출
        select_2.on('select2:close', function (e) {
            cancel();
        });
    });

    return editor;
}

export { selectizeEditor };