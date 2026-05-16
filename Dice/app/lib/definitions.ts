export interface BoardGame {
  id: string;
  userId?: string;
  title: string;
  type: string;
  publisher: string;
  description: string | string[];
  imageUrl?: string;
  minPlayers: number;
  maxPlayers: number;
  time: number;
  price: number;
  isExpansion: boolean;
  isAvailable: boolean;
}