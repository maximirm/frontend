export function exportToCSV(data, fileName) {
    const header = Object.keys(data[0]);
    const rows = data.map((item) => header.map((key) => item[key]));

    const csvContent =
        "data:text/csv;charset=utf-8," +
        header.join(",") +
        "\n" +
        rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
}
