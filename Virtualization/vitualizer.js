let data = [];
let rowList;

let rowHeight = 50;
const btnPlus = document.querySelector("#plus");
const btnMinus = document.querySelector("#minus");
btnPlus.addEventListener("click", () => {
    rowHeight += 10;
    rowList.forEach((row, index) => {
        row.style.lineHeight = `${rowHeight}px`;
        row.style.height = `${rowHeight}px`;
    });

});
btnMinus.addEventListener("click", () => {
    rowHeight -= 10;
    rowList.forEach((row, index) => {
        row.style.lineHeight = `${rowHeight}px`;
        row.style.height = `${rowHeight}px`;
    });
});


const createList = () => {
    for (let i = 0; i < 1000; i++) {
        data.push({
            id: i,
        });
    }
    const table = document.querySelector(".table");

    data.forEach((item, idx) => {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.border = "1px solid #efefef";
        row.style.textAlign = "center";
        row.style.lineHeight = `${rowHeight}px`;
        row.style.height = `${rowHeight}px`;

        row.data = item;
        table.appendChild(row);
    });

    rowList = document.querySelectorAll(".row");

    rowList.forEach((row, index) => {
        io.observe(row);
    });
};

const callback = (entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            console.log(entry.target.data.id);

            setTimeout(() => {
                const row = entry.target;
                const id = row.data.id;

                const text = document.createElement("div");
                text.innerText = id + " : " + new Date().toLocaleString();

                row.replaceChildren();
                row.appendChild(text);
            }, 100);
        }
    });
}
const options = {
    root: document.querySelector(".table"),
    threshold: 0,
}
const io = new IntersectionObserver(callback, options);
createList();