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
  
  document.getElementById('generate-pdf').addEventListener('click', function () {
    const form = document.getElementById('form-container');
    const { jsPDF } = window.jspdf;
  
    window.scrollTo(0, 0); // Top pe scroll kar do pehle
  
    html2canvas(form, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      // Pehla page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Baaki pages
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('registration-form.pdf');
    });
  });
  