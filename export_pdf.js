function getResultPDF() {
    document.querySelector('#export-pdf').addEventListener('click', function () {
        
        const resultTable = document.querySelector('#pdf-content');
        const logo = document.querySelector("#logo");

        const wrapperDiv = document.createElement('div');
        wrapperDiv.appendChild(logo.cloneNode(true));
        wrapperDiv.appendChild(resultTable.cloneNode(true));
        
        let opt = {
            margin:       1,
            pagebreak:    { mode: ['css', 'avoid-all'] },
            filename:     'Tableau-amortissement.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(wrapperDiv).save().then(() => {
            // Clean up the wrapper div after generating the PDF
            wrapperDiv.remove();
        });
    });
}

const pdfExportBtn = document.querySelector("#export-pdf");
pdfExportBtn.addEventListener("click", getResultPDF());