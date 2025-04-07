// 📸 Photo Upload Preview
document.getElementById('photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photo-preview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Photo">`;
        };
        reader.readAsDataURL(file);
    }
});

// 📄 Generate PDF (Full Page on Mobile too)
document.getElementById('generate-pdf').addEventListener('click', function () {
    const form = document.getElementById('form-container');
    window.scrollTo(0, 0); // Scroll to top (important for mobile)

    // Give time for scroll + layout to adjust
    setTimeout(() => {
        html2canvas(form, {
            scale: 2,
            useCORS: true,
            scrollY: 0 // fix mobile issues
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('registration-form.pdf');
        });
    }, 500);
});
