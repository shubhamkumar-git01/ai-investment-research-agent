const fs = require('fs');
const files = [
  'components/dashboard/AIReasoningTimeline.tsx',
  'components/dashboard/InvestmentReport.tsx',
  'lib/agent/nodes.ts'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(file, content);
});
