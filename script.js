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

// 📄 Generate PDF (Full Page, including scroll area on mobile)
document.getElementById('generate-pdf').addEventListener('click', function() {
    const form = document.getElementById('form-container');

    // Scroll to top before capturing
    window.scrollTo(0, 0);

    // Delay to ensure rendering is complete
    setTimeout(() => {
        html2canvas(form, {
            scale: 2,
            useCORS: true,
            scrollY: -window.scrollY  // To fix mobile cutoff
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = 210;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('registration-form.pdf');
        });
    }, 500); // Half second delay for safety
});
