import { BoardGame } from '@/app/lib/definitions';
import Link from 'next/link';
import EditForm from '@/app/ui/edit-form';

export default async function EditGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = parseInt(id, 10);

  const res = await fetch('https://szandala.github.io/piwo-api/board-games.json');
  const data = await res.json();
  const games: BoardGame[] = data.board_games;

  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold">Gra nie znaleziona</h1>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-black">Edit item</h1>
          <p className="text-gray-500 font-medium mt-2">{game.title}</p>
        </div>
        <Link href={`/games/${game.id}`} className="text-sm font-bold text-gray-500 hover:text-black transition">
          &larr; Cancel
        </Link>
      </div>

      <EditForm game={game} />
      
    </main>
  );
}