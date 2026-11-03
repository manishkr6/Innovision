import { FEST_INFO } from '../data/events';

const INK = [28, 25, 23];
const MUTED = [107, 114, 128];
const ACCENT = [194, 65, 12];

// Libraries load on demand so they stay out of the initial page bundle.
export const buildPassPdf = async (pass) => {
  const [{ jsPDF }, QRCode] = await Promise.all([import('jspdf'), import('qrcode')]);
  const qr = await QRCode.toDataURL(pass.id, { errorCorrectionLevel: 'M', margin: 1, width: 400 });

  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const width = doc.internal.pageSize.getWidth();
  const margin = 12;
  const contentWidth = width - margin * 2;

  doc.setFillColor(...INK);
  doc.rect(0, 0, width, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold').setFontSize(20);
  doc.text(FEST_INFO.name, margin, 14);
  doc.setFont('helvetica', 'normal').setFontSize(9);
  doc.text(`${FEST_INFO.faculty}, ${FEST_INFO.university}`, margin, 21);
  doc.text('Registration Pass', margin, 26);

  doc.addImage(qr, 'PNG', width - margin - 34, 36, 34, 34);

  doc.setTextColor(...MUTED).setFontSize(8);
  doc.text('TOKEN', margin, 40);
  doc.setTextColor(...ACCENT);
  doc.setFont('courier', 'bold').setFontSize(15);
  doc.text(pass.id, margin, 47);

  doc.setTextColor(...INK);
  doc.setFont('helvetica', 'bold').setFontSize(12);
  const titleLines = doc.splitTextToSize(pass.eventTitle, contentWidth - 40);
  doc.text(titleLines, margin, 56);

  let y = 76;
  const row = (label, value) => {
    if (!value) return;
    doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor(...MUTED);
    doc.text(label.toUpperCase(), margin, y);
    doc.setFontSize(10).setTextColor(...INK);
    const lines = doc.splitTextToSize(String(value), contentWidth - 38);
    doc.text(lines, margin + 38, y);
    y += Math.max(lines.length * 4.6, 5) + 1.6;
  };

  const hasTeam = pass.teamMembers?.length > 0;
  row('Team', pass.teamName);
  row(hasTeam ? 'Team leader' : 'Participant', pass.fullName);
  row('Enrollment no.', pass.enrollmentNumber);
  row('College', pass.college);
  row('Course', pass.course);
  pass.teamMembers?.forEach((member, idx) => row(`Member ${idx + 2}`, `${member.name} (${member.enrollment})`));
  row('When', FEST_INFO.dateString);
  row('Where', FEST_INFO.venue);

  y += 2;
  doc.setDrawColor(209, 213, 219).line(margin, y, width - margin, y);
  doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...MUTED);
  const note = `Show this pass and a valid college/university ID card at the event. ${hasTeam ? 'This one pass covers the whole team; every member must carry their own ID. ' : ''}Registered ${pass.registeredAt} IST.`;
  doc.text(doc.splitTextToSize(note, contentWidth), margin, y + 5);

  return doc;
};

export const downloadPassPdf = async (pass) => {
  const doc = await buildPassPdf(pass);
  doc.save(`INNOVISION-2026-${pass.id}.pdf`);
};
