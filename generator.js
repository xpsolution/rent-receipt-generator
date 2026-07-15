const fs = require('fs');
const path = require('path');
const express = require('express'); // Import Express
const countries = require('./data'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Helper to build dropdown options for countries
function generateCountryDropdownOptions() {
    return countries
        .map(c => `            <option value="${c.slug}">${c.name}</option>`)
        .join('\n');
}

const templatePath = path.join(__dirname, 'template.html');
const outDir = path.join(__dirname, 'dist');

if (!fs.existsSync(templatePath)) {
    console.error("Error: Please create template.html first.");
    process.exit(1);
}

// Reset /dist folder
if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

const embeddedDataScript = `
    const countryDatabase = ${JSON.stringify(countries)};
`;
const countryOptionsHTML = generateCountryDropdownOptions();

let homepageContent = htmlTemplate
    .replace('', embeddedDataScript)
    .replace('', countryOptionsHTML);

fs.writeFileSync(path.join(outDir, 'index.html'), homepageContent);
console.log(`\n🎉 Generated dynamic interactive selector version inside /dist/index.html!`);

// --- NEW EXPRESS SERVER CODE ---
// Serve the static files from the 'dist' directory
app.use(express.static(outDir));

// Start the server and keep it open
app.listen(PORT, () => {
    console.log(`Server is running and keeping the app alive on port ${PORT}`);
});
// Force trigger update

// Force trigger update
