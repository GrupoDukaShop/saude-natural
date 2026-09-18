import fs from 'node:fs';
import path from 'node:path';
import LandingPage from '../components/LandingPage';

function getLandingMarkup() {
  const source = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  const body = source.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? '';

  return body
    .replace(/<script[^>]*src="\.\/app\.js"[^>]*><\/script>/i, '')
    .replaceAll('./assets/', '/assets/');
}

export default function Home() {
  return <LandingPage markup={getLandingMarkup()} />;
}