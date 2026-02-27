const fs = require('fs');
const path = require('path');

const mochawesomeMerge = require('mochawesome-merge');
const merge = mochawesomeMerge.merge || mochawesomeMerge.default || mochawesomeMerge;

(async () => {
  const reportDir = path.join('cypress', 'reports');
  const outFile = path.join(reportDir, 'report.json');

  // Solo JSON de mochawesome, excluye el report.json final
  const files = fs
    .readdirSync(reportDir)
    .filter((f) => f.endsWith('.json') && f.startsWith('mochawesome') && f !== 'report.json')
    .map((f) => path.join(reportDir, f));

  if (files.length === 0) {
    console.error('❌ No mochawesome JSON files found to merge.');
    process.exit(1);
  }

  try {
    const merged = await merge({ files });

    // mochawesome-merge devuelve un objeto; si viene vacío, lo detectamos
    const json = JSON.stringify(merged, null, 2);
    if (json.length < 10) {
      console.error('❌ Merged report is unexpectedly empty.');
      process.exit(1);
    }

    fs.writeFileSync(outFile, json, 'utf-8');
    console.log(`✅ Merged report saved to: ${outFile}`);
  } catch (err) {
    console.error('❌ Merge failed:', err);
    process.exit(1);
  }
})();
