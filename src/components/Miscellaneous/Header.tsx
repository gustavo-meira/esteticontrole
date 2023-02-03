import Image from 'next/image';
import Link from 'next/link';

export const Header = () => (
  <header>
    <div>
      <Link href="/">
        <Image
          src="/assets/lotus-flower.svg"
          alt="Flor de lótus"
          width={98}
          height={98}
          priority
        />
      </Link>
      <h2>EstetiControle</h2>
    </div>
    <nav>
      <ul>
        <li><Link href="/schedule">Agenda</Link></li>
        <li><Link href="/client">Cliente</Link></li>
        <li><Link href="/statistics">Estatísticas</Link></li>
      </ul>
    </nav>
  </header>
);
