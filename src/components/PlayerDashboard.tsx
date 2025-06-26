// src/components/PlayerDashboard.tsx

import type { Player, Pawn as PawnType } from '../types'; // Pawn అనే పేరుతో వైరుధ్యం రాకుండా PawnType అని మార్చాం
import { Pawn } from './Pawn';
import { PLAYER_COLORS } from '../constants';
import { ChevronRightCircle, Swords } from 'lucide-react'; // Swords ఐకాన్‌ను ఇంపోర్ట్ చేయండి

interface PlayerDashboardProps {
  player: Player;
  isCurrentPlayer: boolean;
  capturedPawns: { pawn: PawnType; originalPlayerId: number }[]; // చంపిన కాయల కొత్త ప్రాప్
}

export const PlayerDashboard = ({ player, isCurrentPlayer, capturedPawns }: PlayerDashboardProps) => {
  const unDeployedPawns = player.pawns.filter(p => p.status === 'un-deployed');
  const ripePawns = player.pawns.filter(p => p.status === 'ripe');

  const bgColor = PLAYER_COLORS[player.id].replace('bg-', 'bg-opacity-20 ');
  const borderColor = PLAYER_COLORS[player.id].replace('bg-', 'border-');

  return (
    <div className={`p-4 rounded-lg shadow-md ${borderColor} border-2 ${bgColor} relative w-64`}>
      
      {isCurrentPlayer && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2">
            <ChevronRightCircle size={28} className={`fill-white ${PLAYER_COLORS[player.id].replace('bg-', 'text-')}`} />
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 ${PLAYER_COLORS[player.id].replace('bg-','text-')}`}>
        Player {player.id + 1}
      </h3>
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold">Un-deployed: {unDeployedPawns.length}</h4>
          <div className="flex space-x-2 mt-1 h-12 items-center">
            {unDeployedPawns.map(pawn => (
              <Pawn key={pawn.id} color={PLAYER_COLORS[player.id]} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Ripe (Home): {ripePawns.length}</h4>
          <div className="flex space-x-2 mt-1 h-12 items-center">
             {ripePawns.map(pawn => (
              <Pawn key={pawn.id} color={PLAYER_COLORS[player.id]} />
            ))}
          </div>
        </div>
        {/* Captured Pawns Rack */}
        <div className="pt-2 border-t-2 border-gray-400 border-dashed">
            <h4 className="font-semibold flex items-center gap-2">
                <Swords size={16} /> Captured: {capturedPawns.length}
            </h4>
            <div className="flex flex-wrap gap-2 mt-1 h-12 items-center">
                {capturedPawns.map(({ pawn, originalPlayerId }) => (
                    <div key={`${originalPlayerId}-${pawn.id}`} className="opacity-60 scale-75">
                        <Pawn color={PLAYER_COLORS[originalPlayerId]} />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};