import type { ScanResult } from '@/types';

function getSeverityColor(severity: string): [number, number, number] {
  switch (severity) {
    case 'critical': return [239, 68, 68];
    case 'high': return [249, 115, 22];
    case 'medium': return [234, 179, 8];
    default: return [34, 197, 94];
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export async function generatePDFReport(data: ScanResult, score: number, rating: string) {
  const { default: jsPDF } = await import('jspdf');

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const margin = 16;
  const contentW = pageW - margin * 2;
  let y = margin;

  function addPage() {
    doc.addPage();
    y = margin;
  }

  function checkPage(needed: number) {
    if (y + needed > 290) addPage();
  }

  // colors
  const darkBg: [number, number, number] = [6, 6, 24];
  const cardBg: [number, number, number] = [15, 15, 40];
  const textPrimary: [number, number, number] = [240, 240, 245];
  const textSecondary: [number, number, number] = [140, 140, 160];
  const accent: [number, number, number] = [59, 130, 246];
  const accent2: [number, number, number] = [139, 92, 246];

  // ---- page background ----
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageW, 297, 'F');

  // ---- header ----
  doc.setFontSize(24);
  doc.setTextColor(...accent);
  doc.text('SECURESCORE', margin, y + 8);
  doc.setFontSize(10);
  doc.setTextColor(...textSecondary);
  doc.text('Breach Report', margin + 60, y + 8);

  doc.setFontSize(9);
  doc.setTextColor(...textSecondary);
  doc.text(`Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageW - margin, y + 4, { align: 'right' });
  doc.text(`Email: ${data.email}`, pageW - margin, y + 12, { align: 'right' });

  y += 22;

  // ---- separator ----
  doc.setDrawColor(...accent);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  // ---- score section ----
  checkPage(50);
  doc.setFillColor(...cardBg);
  doc.roundedRect(margin, y, contentW, 44, 4, 4, 'F');

  doc.setFontSize(36);
  doc.setTextColor(...textPrimary);
  doc.text(`${score}`, margin + 14, y + 30);

  doc.setFontSize(11);
  doc.setTextColor(...accent);
  doc.text(`/100 ${rating}`, margin + 34, y + 30);

  doc.setFontSize(10);
  doc.setTextColor(...textSecondary);
  const brechCount = data.breaches.length + data.usernameExposures.length;
  doc.text(`${brechCount} breach${brechCount !== 1 ? 'es' : ''} found`, pageW - margin - 10, y + 18, { align: 'right' });

  const riskColors: Record<string, [number, number, number]> = {
    'Low Risk': [34, 197, 94],
    'Moderate Risk': [234, 179, 8],
    'High Risk': [239, 68, 68],
  };
  doc.setFontSize(9);
  doc.setTextColor(...(riskColors[data.riskLevel] || textSecondary));
  doc.text(data.riskLevel, pageW - margin - 10, y + 28, { align: 'right' });

  y += 56;

  // ---- summary cards ----
  checkPage(44);
  doc.setFillColor(...cardBg);
  const cardW = (contentW - 8) / 4;
  const stats = [
    ['Breaches', String(data.breaches.length)],
    ['Username Exp.', String(data.usernameExposures.length)],
    ['Data Types', String(data.uniqueDataTypes.length)],
    ['Rating', rating],
  ];
  stats.forEach(([label, value], i) => {
    const cx = margin + i * (cardW + 2);
    doc.roundedRect(cx, y, cardW, 34, 3, 3, 'F');
    doc.setFontSize(16);
    doc.setTextColor(...textPrimary);
    doc.text(value, cx + cardW / 2, y + 18, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(...textSecondary);
    doc.text(label, cx + cardW / 2, y + 28, { align: 'center' });
  });

  y += 44;

  // ---- breach timeline ----
  if (data.breaches.length > 0) {
    checkPage(14);
    doc.setFontSize(13);
    doc.setTextColor(...textPrimary);
    doc.text('Breach Timeline', margin, y + 4);
    y += 12;

    data.breaches.forEach((b) => {
      const h = 18;
      checkPage(h + 6);
      const [r, g, bl] = getSeverityColor(b.severity);
      doc.setFillColor(r, g, bl);
      doc.circle(margin + 3, y + h / 2, 2.5, 'F');

      doc.setFontSize(9);
      doc.setTextColor(...textPrimary);
      doc.text(b.name, margin + 10, y + 5);

      doc.setFontSize(7);
      doc.setTextColor(...textSecondary);
      doc.text(`${formatDate(b.date)}  |  ${b.severity.toUpperCase()}`, margin + 10, y + 13);

      y += h + 2;
    });
    y += 4;
  }

  // ---- recommendations ----
  if (data.recommendations.length > 0) {
    checkPage(14);
    doc.setFontSize(13);
    doc.setTextColor(...textPrimary);
    doc.text('Security Recommendations', margin, y + 4);
    y += 12;

    data.recommendations.slice(0, 5).forEach((r) => {
      const lines = doc.splitTextToSize(r.description, contentW - 24);
      const h = 8 + lines.length * 4;
      checkPage(h + 4);

      doc.setFillColor(...cardBg);
      doc.roundedRect(margin, y, contentW, h, 3, 3, 'F');

      const pColors: Record<string, [number, number, number]> = {
        critical: [239, 68, 68],
        high: [249, 115, 22],
        medium: [234, 179, 8],
        low: [34, 197, 94],
      };
      doc.setFillColor(...(pColors[r.priority] || textSecondary));
      doc.circle(margin + 8, y + h / 2, 2, 'F');

      doc.setFontSize(9);
      doc.setTextColor(...textPrimary);
      doc.text(r.title, margin + 16, y + 5);

      doc.setFontSize(7);
      doc.setTextColor(...textSecondary);
      doc.text(lines, margin + 16, y + 11);

      y += h + 3;
    });
    y += 4;
  }

  // ---- data types exposed ----
  if (data.uniqueDataTypes.length > 0) {
    checkPage(14);
    doc.setFontSize(13);
    doc.setTextColor(...textPrimary);
    doc.text('Data Types Exposed', margin, y + 4);
    y += 12;

    const cols = 3;
    const dtCardW = (contentW - (cols - 1) * 3) / cols;
    data.uniqueDataTypes.forEach((dt, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = margin + col * (dtCardW + 3);
      const cy = y + row * 16;

      checkPage(cy - y + 20);

      doc.setFillColor(...cardBg);
      doc.roundedRect(cx, cy, dtCardW, 12, 2, 2, 'F');

      doc.setFillColor(34, 197, 94);
      doc.circle(cx + 6, cy + 6, 1.5, 'F');

      doc.setFontSize(7);
      doc.setTextColor(...textPrimary);
      doc.text(dt, cx + 11, cy + 7);
    });

    const dtRows = Math.ceil(data.uniqueDataTypes.length / cols);
    y += dtRows * 16 + 4;
  }

  // ---- username exposures ----
  if (data.usernameExposures.length > 0) {
    checkPage(14);
    doc.setFontSize(13);
    doc.setTextColor(...textPrimary);
    doc.text('Username Exposures', margin, y + 4);
    y += 12;

    data.usernameExposures.slice(0, 10).forEach((u) => {
      const h = 10;
      checkPage(h + 2);
      doc.setFontSize(9);
      doc.setTextColor(...accent2);
      doc.text(u.platform, margin + 4, y + 6);
      doc.setFontSize(7);
      doc.setTextColor(...textSecondary);
      doc.text(formatDate(u.date), margin + 80, y + 6);
      y += h;
    });
    y += 4;
  }

  // ---- footer ----
  doc.setFontSize(7);
  doc.setTextColor(...textSecondary);
  doc.text('Generated by SecureScore', margin, 286);
  doc.text(new Date().toISOString().split('T')[0], pageW - margin, 286, { align: 'right' });

  doc.save('SecureScore-Report.pdf');
}
