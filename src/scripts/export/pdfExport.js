import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportDataToPDF = (data, columns, fileName, header) => {
    const doc = new jsPDF();

    doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: data.map((row) => columns.map((col) => row[col.dataKey])),
        columnStyles: {0: {cellWidth: "auto"}},
    });
    doc.text(header, 10, 10);
    doc.save(fileName);
};
