import Papa from "papaparse";


export function exportToCSV(data, fileName) {
    const csv = Papa.unparse(data);

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);

    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
}
