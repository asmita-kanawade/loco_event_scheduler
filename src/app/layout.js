import { EventProvider } from '@/context/EventContext';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <EventProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </EventProvider>
  );
}
