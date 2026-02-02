
// This is a browser-side test simulation script
// We can't easily run React in Node without JSDOM setup, 
// so we will verify the code logic by reading the files and checking for specific strings.
// A poor man's static analysis.

import fs from 'fs';
import path from 'path';

const checkFile = (file, checks) => {
    const content = fs.readFileSync(file, 'utf-8');
    console.log(`Checking ${path.basename(file)}...`);
    let pass = true;
    checks.forEach(check => {
        if (!content.includes(check)) {
            console.error(`❌ Missing: ${check}`);
            pass = false;
        } else {
            console.log(`✅ Found: ${check.substring(0, 50)}...`);
        }
    });
    return pass;
};

const run = () => {
    let allPass = true;

    // 1. Check Services.jsx for Booking Link
    if (!checkFile('src/pages/Services.jsx', [
        'to="/client-area"',
        'state={{ activeTab: \'upload\' }}'
    ])) allPass = false;

    // 2. Check ClientDashboard.jsx for State Handling
    if (!checkFile('src/pages/ClientDashboard.jsx', [
        'useLocation',
        'location.state?.activeTab',
        'setActiveTab(location.state.activeTab)'
    ])) allPass = false;

    // 3. Check App.jsx for HelmetProvider
    if (!checkFile('src/App.jsx', [
        'HelmetProvider',
        '<HelmetProvider>'
    ])) allPass = false;

    // 4. Check Home.jsx for Helmet
    if (!checkFile('src/pages/Home.jsx', [
        '<Helmet>',
        '<title>MixStudio',
        '<meta name="description"'
    ])) allPass = false;

    // 5. Check Services.jsx for Helmet
    if (!checkFile('src/pages/Services.jsx', [
        '<Helmet>',
        '<title>บริการของเรา',
        '<meta name="description"'
    ])) allPass = false;

    // 6. Check Portfolio.jsx for Helmet
    if (!checkFile('src/pages/Portfolio.jsx', [
        '<Helmet>',
        '<title>ผลงานของเรา',
        '<meta name="description"'
    ])) allPass = false;

    if (allPass) {
        console.log("\n🎉 All Static Checks Passed!");
    } else {
        console.error("\n❌ Some Checks Failed.");
        process.exit(1);
    }
};

run();
