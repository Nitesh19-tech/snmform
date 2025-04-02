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

document.getElementById('generate-pdf').addEventListener('click', function() {
    const form = document.getElementById('form-container');
    html2canvas(form).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
        pdf.save('registration-form.pdf');
    });
});
