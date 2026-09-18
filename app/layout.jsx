import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Kit Sabedoria Natural | Saúde Sem Remédio',
  description:
    '2 guias completos: Saúde Sem Remédio e 100 Remédios da Floresta. Sabedoria natural para cuidar do corpo e da mente.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}