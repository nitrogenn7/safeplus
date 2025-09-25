import jsPDF from 'jspdf';

export function generateCertificate(name: string) {
    const doc = new jsPDF({
        orientation: 'landscape', unit: 'pt', format:
            'a4'
    });
    doc.setFontSize(32);
    doc.text('Certificate of Completion', doc.internal.pageSize.getWidth() /
        2, 120, { align: 'center' });
    doc.setFontSize(18);
    doc.text(`This certifies that`, doc.internal.pageSize.getWidth() / 2, 200,
        { align: 'center' });
    doc.setFontSize(28);
    doc.text(name, doc.internal.pageSize.getWidth() / 2, 250, {
        align:
            'center'
    });
    doc.setFontSize(16);
    doc.text('has completed the Social Engineering Awareness course on SafePlus', doc.internal.pageSize.getWidth() / 2, 300, { align: 'center' });
    doc.save('safeplus-certificate.pdf');
}
