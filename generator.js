const fs = require('fs');
const path = require('path');
let countries = require('./data');

const customCountryExtensions = [
    { name: "Tanzania", slug: "tz", symbol: "TSh", currency: "TZS", extraPayments: ["Airtel Money", "M-Pesa", "Tigo Pesa"] },
    { name: "Vietnam", slug: "vn", symbol: "₫", currency: "VND", extraPayments: ["MoMo", "ZaloPay", "VNPAY"] },
    { name: "Netherlands", slug: "nl", symbol: "€", currency: "EUR", extraPayments: ["iDEAL", "SEPA Transfer"] },
    { name: "Thailand", slug: "th", symbol: "฿", currency: "THB", extraPayments: ["PromptPay", "TrueMoney"] },
    { name: "Oman", slug: "om", symbol: "ر.ع.", currency: "OMR", extraPayments: ["Thawani", "Bank Transfer"] },
    { name: "Yemen", slug: "ye", symbol: "﷼", currency: "YER", extraPayments: ["Kuraimi Pay", "Cash"] },
    { name: "United Arab Emirates", slug: "ae", symbol: "AED", currency: "AED", extraPayments: ["e& money", "Careem Pay"] },
    { name: "Saudi Arabia", slug: "sa", symbol: "SR", currency: "SAR", extraPayments: ["Mada", "STC Pay"] },
    { name: "Kuwait", slug: "kw", symbol: "KD", currency: "KWD", extraPayments: ["KNET"] },
    { name: "Qatar", slug: "qa", symbol: "QR", currency: "QAR", extraPayments: ["Ooredoo Money"] },
    { name: "Egypt", slug: "eg", symbol: "E£", currency: "EGP", extraPayments: ["InstaPay", "Fawry", "Vodafone Cash"] }
];

customCountryExtensions.forEach(ext => {
    const exists = countries.some(c => c.slug === ext.slug);
    if (!exists) {
        countries.push(ext);
    }
});

function generateCountryDropdownOptions() {
    return countries
        .map(c => `            <option value="${c.slug}">${c.name}</option>`)
        .join('\n');
}

const templatePath = path.join(__dirname, 'template.html');
const outDir = path.join(__dirname, 'dist');

if (!fs.existsSync(templatePath)) {
    console.error("Error: template.html file is missing from your project root folder.");
    process.exit(1);
}

if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

const embeddedDataScript = `const countryDatabase = ${JSON.stringify(countries)};`;
const countryOptionsHTML = generateCountryDropdownOptions();

let finalContent = htmlTemplate
    .replace('{{DATABASE}}', embeddedDataScript)
    .replace('{{OPTIONS}}', countryOptionsHTML);

fs.writeFileSync(path.join(outDir, 'index.html'), finalContent);
console.log(`\n🎉 Web App Updated! Compiled single index file inside /dist/index.html`);