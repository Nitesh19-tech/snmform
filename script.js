document.getElementById('generate-pdf').addEventListener('click', function () {
    const form = document.getElementById('form-container');

    // Increase scale for better quality, especially on mobile
    html2canvas(form, {
        scale: 2,
        scrollY: -window.scrollY,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

        // A4 page size in mm
        const pageWidth = 210;
        const pageHeight = 297;

        // Get image dimensions
        const imgWidth = pageWidth;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('registration-form.pdf');
    });
});
