// check node version script
import { execSync } from 'child_process';

const requiredVersion = '20.12.2';

const version = execSync('node -v', { encoding: 'utf-8' }).trim();
if (version !== `v${requiredVersion}`) {
  console.error(
    `Required node version ${requiredVersion}, but found ${version}`
  );
  process.exit(1);
}
