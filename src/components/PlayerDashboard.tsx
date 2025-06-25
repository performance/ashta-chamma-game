// src/components/PlayerDashboard.tsx

import type { Player } from '../types';
import { Pawn } from './Pawn';
import { PLAYER_COLORS } from '../constants';

interface PlayerDashboardProps {
  player: Player;
}

export const PlayerDashboard = ({ player }: PlayerDashboardProps) => {
  const unDeployedPawns = player.pawns.filter(p => p.status === 'un-deployed');
  const ripePawns = player.pawns.filter(p => p.status === 'ripe');

  const bgColor = PLAYER_COLORS[player.id].replace('bg-', 'bg-opacity-20 ');
  const borderColor = PLAYER_COLORS[player.id].replace('bg-', 'border-');

  return (
    <div className={`p-4 rounded-lg shadow-md ${borderColor} border-2 ${bgColor}`}>
      <h3 className={`text-xl font-bold mb-2 ${PLAYER_COLORS[player.id].replace('bg-','text-')}`}>
        Player {player.id + 1}
      </h3>
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold">Un-deployed Pawns: {unDeployedPawns.length}</h4>
          <div className="flex space-x-2 mt-1 h-12 items-center">
            {unDeployedPawns.map(pawn => (
              <Pawn key={pawn.id} color={PLAYER_COLORS[player.id]} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Ripe (Home) Pawns: {ripePawns.length}</h4>
          <div className="flex space-x-2 mt-1 h-12 items-center">
             {ripePawns.map(pawn => (
              <Pawn key={pawn.id} color={PLAYER_COLORS[player.id]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};