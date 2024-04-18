function customDateFormatter(cell, formatterParams, onRendered) {
    var content = document.createElement("div");
    var values = cell.getValue();

    if (formatterParams.format === "dd/MM/yyyy") {
        values = values.split("-").reverse().join("/");
    }

    onRendered(function () {
        content.innerHTML = values;
    });

    return content;
};
