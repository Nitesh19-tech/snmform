document.getElementById('generate-pdf').addEventListener('click', function () {
    const form = document.getElementById('form-container');

    // Scroll to top before capture
    window.scrollTo(0, 0);

    html2canvas(form, {
        scale: 2,        // High resolution
        useCORS: true,   // In case of images
        windowWidth: 794 // Force width for mobile
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = 210;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('registration_form.pdf');
    });
});
