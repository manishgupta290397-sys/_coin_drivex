#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ADMOB_APP_ID = 'ca-app-pub-2765601211878225~6409661215';
const manifestPath = path.join(__dirname, '../../platforms/android/app/src/main/AndroidManifest.xml');

if (!fs.existsSync(manifestPath)) {
    console.log('AndroidManifest.xml not found, skipping AdMob injection');
    process.exit(0);
}

let manifest = fs.readFileSync(manifestPath, 'utf8');

const metaTag = `<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${ADMOB_APP_ID}"/>`;

if (manifest.includes('APPLICATION_ID')) {
    console.log('AdMob App ID already in manifest');
} else {
    manifest = manifest.replace('</application>', `    ${metaTag}\n    </application>`);
    fs.writeFileSync(manifestPath, manifest);
    console.log('AdMob App ID injected into AndroidManifest.xml!');
}
