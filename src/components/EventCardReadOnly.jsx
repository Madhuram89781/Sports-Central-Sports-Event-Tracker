import React, { useMemo } from 'react';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';

const SPORT_COLORS = {
  Football: 'from-green-500 to-emerald-600',
  Basketball: 'from-orange-500 to-red-600',
  Tennis: 'from-yellow-500 to-amber-600',
  Cricket: 'from-blue-500 to-indigo-600',
  Baseball: 'from-purple-500 to-pink-600',
  Volleyball: 'from-cyan-500 to-blue-600'
};

export default function EventCardReadOnly({ event }) {
  const isCricket = event.sport === 'Cricket';

  const winner = useMemo(() => {
    if (event.status !== 'completed') return null;
    if (event.score1 > event.score2) return event.team1;
    if (event.score2 > event.score1) return event.team2;
    return 'Draw';
  }, [event.status, event.score1, event.score2, event.team1, event.team2]);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
      {/* Sport Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-4 py-2 bg-gradient-to-r ${SPORT_COLORS[event.sport]} text-white text-sm font-bold rounded-full`}>
          {event.sport}
        </span>
      </div>

      {/* Event Name */}
      <h3 className="text-2xl font-bold text-white mb-4">{event.name}</h3>

      {/* Date, Time, Venue */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-purple-300">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{event.date}</span>
          {event.time && (
            <>
              <Clock className="w-4 h-4 ml-2" />
              <span className="text-sm">{event.time}</span>
            </>
          )}
        </div>
        {event.venue && (
          <div className="flex items-center gap-2 text-purple-300">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.venue}</span>
          </div>
        )}
      </div>

      {/* Teams & Scores */}
      <div className="space-y-3 mb-4">
        {/* Team 1 */}
        <div className={`p-4 rounded-xl border ${
          winner === event.team1 
            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
            : 'bg-slate-700/30 border-purple-500/20'
        }`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-white">{event.team1}</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{event.score1 || 0}</span>
              {isCricket && (
                <div className="text-sm text-purple-300">
                  <div>{event.wickets1 || 0}/10</div>
                  <div>({event.overs1 || 0} ov)</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div className={`p-4 rounded-xl border ${
          winner === event.team2 
            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
            : 'bg-slate-700/30 border-purple-500/20'
        }`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-white">{event.team2}</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{event.score2 || 0}</span>
              {isCricket && (
                <div className="text-sm text-purple-300">
                  <div>{event.wickets2 || 0}/10</div>
                  <div>({event.overs2 || 0} ov)</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Winner Badge */}
      {winner && winner !== 'Draw' && (
        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl">
          <p className="text-center text-yellow-300 font-bold flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            Winner: {winner}
            {isCricket && event.status === 'completed' && (
              <span className="text-sm">
                by {Math.abs(event.score1 - event.score2)} runs
              </span>
            )}
          </p>
        </div>
      )}

      {winner === 'Draw' && (
        <div className="mb-4 p-3 bg-slate-700/50 border border-purple-500/30 rounded-xl">
          <p className="text-center text-purple-300 font-bold">Match Drawn</p>
        </div>
      )}

      {/* Status Badge */}
      <div className="mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          event.status === 'live'
            ? 'bg-red-500 text-white animate-pulse'
            : event.status === 'completed'
            ? 'bg-green-500/20 text-green-300'
            : event.status === 'delayed'
            ? 'bg-yellow-500/20 text-yellow-300'
            : 'bg-blue-500/20 text-blue-300'
        }`}>
          {event.status.toUpperCase()}
        </span>
        {event.status === 'delayed' && event.delayReason && (
          <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-300">
              <span className="font-semibold">Reason: </span>
              {event.delayReason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

