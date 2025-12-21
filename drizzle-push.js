const { execSync } = require('child_process');

// Disable SSL verification for this command only
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

try {
  execSync('drizzle-kit push', { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}