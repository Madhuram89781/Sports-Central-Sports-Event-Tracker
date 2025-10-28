import React, { useCallback } from 'react';
import { Medal } from 'lucide-react';

const ScoreCard = React.memo(({ event, teamNum, editingScore, onUpdateScore, winner }) => {
  const isCricket = event.sport === 'Cricket';
  const team = teamNum === 1 ? event.team1 : event.team2;
  const score = teamNum === 1 ? event.score1 : event.score2;
  const wickets = teamNum === 1 ? event.wickets1 : event.wickets2;
  const overs = teamNum === 1 ? event.overs1 : event.overs2;

  const handleScoreChange = useCallback((field, value) => {
    onUpdateScore(event.id, field, value);
  }, [event.id, onUpdateScore]);

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl ${
      winner === team
        ? 'bg-green-500/20 border-2 border-green-500'
        : 'bg-slate-700/30'
    }`}>
      <div className="flex items-center gap-2 flex-1">
        {winner === team && <Medal className="w-5 h-5 text-yellow-400" />}
        <span className="font-semibold text-white text-lg">{team}</span>
      </div>

      {editingScore === event.id ? (
        isCricket ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={score}
                onChange={(e) => handleScoreChange(`score${teamNum}`, e.target.value)}
                className="w-16 px-2 py-1 bg-slate-600 text-white text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-1"
                placeholder="Runs"
              />
              <span className="text-xs text-gray-400">Runs</span>
            </div>
            <span className="text-white text-xl font-bold">/</span>
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={wickets}
                onChange={(e) => handleScoreChange(`wickets${teamNum}`, e.target.value)}
                className="w-16 px-2 py-1 bg-slate-600 text-white text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-1"
                placeholder="Wickets"
                max="10"
              />
              <span className="text-xs text-gray-400">Wickets</span>
            </div>
            <div className="flex flex-col items-center ml-2">
              <input
                type="number"
                step="0.1"
                value={overs}
                onChange={(e) => handleScoreChange(`overs${teamNum}`, e.target.value)}
                className="w-16 px-2 py-1 bg-slate-600 text-white text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-1"
                placeholder="Overs"
              />
              <span className="text-xs text-gray-400">Overs</span>
            </div>
          </div>
        ) : (
          <input
            type="number"
            value={score}
            onChange={(e) => handleScoreChange(`score${teamNum}`, e.target.value)}
            className="w-20 px-3 py-2 bg-slate-600 text-white text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xl font-bold"
          />
        )
      ) : (
        isCricket ? (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{score}/{wickets}</span>
            <span className="text-sm text-purple-300 bg-slate-600/50 px-2 py-1 rounded-lg">
              ({overs} ov)
            </span>
          </div>
        ) : (
          <span className="text-3xl font-bold text-white">{score}</span>
        )
      )}
    </div>
  );
});

ScoreCard.displayName = 'ScoreCard';

export default ScoreCard;

