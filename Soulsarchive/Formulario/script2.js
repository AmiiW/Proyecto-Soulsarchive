document.getElementById('download-btn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    // Crear una nueva instancia de jsPDF
    var pdf = new jsPDF('p', 'mm', 'a4');

    // Cargar la imagen y agregarla al PDF
    var img = new Image();
    img.src = 'Almanatra2.png'; // Especifica la ruta correcta de la imagen

    img.onload = function() {
        // Agregar la imagen al PDF, centrada y más pequeña
        var imgWidth = 132; // Ancho de la imagen
        var imgHeight = 30; // Alto de la imagen (ajusta según lo necesites)
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var imgX = (pageWidth - imgWidth) / 2; // Coordenada X centrada

        pdf.addImage(img, 'PNG', imgX, 10, imgWidth, imgHeight);

        // Configuración del PDF
        pdf.setFont('times', 'bold'); // Fuente gótica en negrita
        pdf.setFontSize(14);

        // Ajustar el texto debajo de la imagen y centrarlo
        var textStartY = 50; // Ajusta según la altura de la imagen
        pdf.text("Formulario de BetaTesting", pageWidth / 2, textStartY, { align: "center" });
        pdf.text("Rellena el formulario de BetaTesting para enviárselo al alma constructora", pageWidth / 2, textStartY + 10, { align: "center" });

        // Cambiar a fuente normal y tamaño adecuado
        pdf.setFont('times', 'normal');
        pdf.setFontSize(12);

        // Subrayar y mostrar los títulos de los campos del formulario
        pdf.setFont('times', 'bold');
        pdf.text("Nombre:", 20, textStartY + 30);
        pdf.setLineWidth(0.5);
        pdf.line(20, textStartY + 32, 45, textStartY + 32); // Subrayado

        pdf.text("Asunto:", 20, textStartY + 60);
        pdf.line(20, textStartY + 62, 45, textStartY + 62); // Subrayado

        pdf.text("Mensaje:", 20, textStartY + 90);
        pdf.line(20, textStartY + 92, 50, textStartY + 92); // Subrayado

        // Obtener los valores de los campos
        var name = document.getElementById('name').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;

        // Espacio para los campos del formulario
        pdf.setFont('times', 'normal'); // Cambiar a fuente normal
        pdf.text(name, 20, textStartY + 40);
        pdf.text(subject, 20, textStartY + 70);
        
        // Ajustar el mensaje para que respete los saltos de línea
        var splitMessage = pdf.splitTextToSize(message, 170);
        pdf.text(splitMessage, 20, textStartY + 100);

        // Añadir texto en el pie de página
        pdf.setFont('times', 'bold'); // Fuente gótica en negrita para el pie de página
        pdf.setFontSize(13);
        var footerText = "Soulsarchive.com - envía este documento a amsoularchive@gmail.com";
        pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" });

        // Guardar el PDF
        pdf.save('formulario-betatesting.pdf');
    };

    img.onerror = function() {
        console.error('No se pudo cargar la imagen.');
    };
});