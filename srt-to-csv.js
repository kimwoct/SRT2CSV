const fs = require('fs');
const path = require('path');

// Read SRT data from file
const srtFilePath = path.resolve(__dirname, 'sample.srt');
const srtText = fs.readFileSync(srtFilePath, 'utf-8');

/**
 * Converts SRT subtitle text to CSV format.
 * 
 * This function takes SRT (SubRip Text) subtitle content and transforms it into
 * a CSV string with columns: Index, Time, Content. Each subtitle block in the
 * SRT file becomes a row in the CSV.
 * 
 * @param {string} srtText - The full SRT text content as a string.
 * @returns {string} A CSV formatted string with headers and data rows.
 * 
 * @example
 * const srt = `1\n00:00:01,000 --> 00:00:04,000\nHello world\n\n2\n00:00:05,000 --> 00:00:08,000\nGoodbye\n`;
 * const csv = srtToCsv(srt);
 * console.log(csv);
 * // Output:
 * // Index,Time,Content
 * // "1","00:00:01,000 --> 00:00:04,000","Hello world"
 * // "2","00:00:05,000 --> 00:00:08,000","Goodbye"
 */
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
