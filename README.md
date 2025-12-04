# SRT to CSV Converter

This project provides a simple Node.js script to convert SRT (SubRip Text) subtitle files into CSV format.

## Features

- Converts SRT subtitle files to CSV with columns: Index, Time, Content
- Handles multi-line subtitle content
- Properly escapes CSV fields containing quotes
- Includes JSDoc documentation for the main function

## Usage

### Prerequisites

- Node.js installed on your system

### Running the Script

1. Place your SRT file in the project directory (e.g., `sample.srt`)
2. Run the script:

```bash
node srt-to-csv.js
```

The script will:
- Read the SRT data from `sample.srt`
- Convert it to CSV format
- Output the CSV content to the console
- Save the CSV to `output.csv`

### Using the Function

You can also use the `srtToCsv` function in your own code:

```javascript
const fs = require('fs');
const { srtToCsv } = require('./srt-to-csv');

const srtText = fs.readFileSync('your-file.srt', 'utf-8');
const csvContent = srtToCsv(srtText);
console.log(csvContent);
```

### Function Documentation

The `srtToCsv` function takes SRT text and returns a CSV string. See the JSDoc comments in `srt-to-csv.js` for detailed parameter and return information.

## Example

Given an SRT file like:

```
1
00:00:01,000 --> 00:00:04,000
Hello world

2
00:00:05,000 --> 00:00:08,000
Goodbye world
```

The output CSV will be:

```
Index,Time,Content
"1","00:00:01,000 --> 00:00:04,000","Hello world"
"2","00:00:05,000 --> 00:00:08,000","Goodbye world"
```

## Files

- `srt-to-csv.js`: Main script containing the conversion logic
- `sample.srt`: Sample SRT file for testing
- `output.csv`: Generated CSV output
- `README.md`: This documentation

## License

[Add your license here]
