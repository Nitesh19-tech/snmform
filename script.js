// 🖼️ Photo Preview
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

// 📄 Generate A4 PDF (even on mobile, no crop)
document.getElementById('generate-pdf').addEventListener('click', function () {
    const form = document.getElementById('form-container');

    // ✅ Clone form off-screen to capture full height
    const clonedForm = form.cloneNode(true);
    clonedForm.style.position = 'absolute';
    clonedForm.style.top = '0';
    clonedForm.style.left = '-9999px'; // Hide from screen
    clonedForm.style.width = '794px'; // A4 width
    clonedForm.style.background = '#fff';
    document.body.appendChild(clonedForm);

    html2canvas(clonedForm, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = 210;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('registration_form.pdf');

        // ✅ Remove cloned form after export
        document.body.removeChild(clonedForm);
    });
});
html2canvas(element, {
    scrollY: -window.scrollY
  }).then(canvas => {
    // Canvas ko PDF mein convert karo
  });
  