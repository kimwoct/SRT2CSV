const fs = require('fs');
const path = require('path');

// Read SRT data from file
const srtFilePath = path.resolve(__dirname, 'sample.srt');
const srtText = fs.readFileSync(srtFilePath, 'utf-8');

function srtToCsv(srtText) {
  // Split srt blocks by empty lines
  const blocks = srtText.trim().split(/\n\s*\n/);
  const rows = blocks.map(block => {
    const lines = block.split('\n').map(line => line.trim());
    if (lines.length >= 3) {
      const [index, time, ...content] = lines;
      return [index, time, content.join(' ')];
    }
    return null;
  }).filter(Boolean);

  // CSV header + content
  const csv = [
    'Index,Time,Content',
    ...rows.map(row =>
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  return csv;
}

const csvContent = srtToCsv(srtText);

console.log(csvContent);

// (Optional) Write CSV to file
fs.writeFileSync('output.csv', csvContent);
