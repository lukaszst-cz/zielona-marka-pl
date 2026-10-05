export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <><nav className="demo-simple-nav" aria-label="Powrót do serwisu"><a href="/">← Wróć do strony głównej</a></nav>{children}</>;
}
