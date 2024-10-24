import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a la IA Chat</h1>
      <p>Interactúa con nuestra inteligencia artificial y hazle preguntas.</p>
      <Link href="/chat">
        <a>Ir al Chat</a>
      </Link>
    </div>
  );
}
