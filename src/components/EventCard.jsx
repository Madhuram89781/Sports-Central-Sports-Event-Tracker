import React, { useCallback, useMemo } from 'react';
import { X, Edit2, Save, Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import ScoreCard from './ScoreCard';

const SPORT_COLORS = {
  Football: 'from-green-500 to-emerald-600',
  Basketball: 'from-orange-500 to-red-600',
  Tennis: 'from-yellow-500 to-amber-600',
  Cricket: 'from-blue-500 to-indigo-600',
  Baseball: 'from-purple-500 to-pink-600',
  Volleyball: 'from-cyan-500 to-blue-600'
};

const EventCard = React.memo(({ 
  event, 
  editingScore, 
  onUpdateScore, 
  onUpdateStatus, 
  onDeleteEvent,
  onSetEditingScore 
}) => {
  const isCricket = event.sport === 'Cricket';

  const winner = useMemo(() => {
    if (event.status !== 'completed') return null;
    if (event.score1 > event.score2) return event.team1;
    if (event.score2 > event.score1) return event.team2;
    return 'Draw';
  }, [event.status, event.score1, event.score2, event.team1, event.team2]);

  const handleDelete = useCallback(() => {
    onDeleteEvent(event.id);
  }, [event.id, onDeleteEvent]);

  const handleStartLive = useCallback(() => {
    onUpdateStatus(event.id, 'live');
    onSetEditingScore(event.id);
  }, [event.id, onUpdateStatus, onSetEditingScore]);

  const handleEdit = useCallback(() => {
    onSetEditingScore(event.id);
  }, [event.id, onSetEditingScore]);

  const handleUpdate = useCallback(() => {
    onSetEditingScore(null);
  }, [onSetEditingScore]);

  const handleSaveComplete = useCallback(() => {
    onUpdateStatus(event.id, 'completed');
    onSetEditingScore(null);
  }, [event.id, onUpdateStatus, onSetEditingScore]);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
      {/* Sport Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-4 py-2 bg-gradient-to-r ${SPORT_COLORS[event.sport]} text-white text-sm font-bold rounded-full`}>
          {event.sport}
        </span>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
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
        <ScoreCard
          event={event}
          teamNum={1}
          editingScore={editingScore}
          onUpdateScore={onUpdateScore}
          winner={winner}
        />
        <ScoreCard
          event={event}
          teamNum={2}
          editingScore={editingScore}
          onUpdateScore={onUpdateScore}
          winner={winner}
        />
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

      {/* Action Buttons */}
      <div className="flex gap-2">
        {editingScore === event.id ? (
          <>
            <button
              onClick={handleUpdate}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Update
            </button>
            <button
              onClick={handleSaveComplete}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Complete
            </button>
          </>
        ) : (
          <>
            {event.status === 'scheduled' && (
              <button
                onClick={handleStartLive}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Start Live
              </button>
            )}
            {event.status === 'live' && (
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Update Score
              </button>
            )}
            {event.status === 'completed' && (
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </>
        )}
      </div>

      {/* Status Badge */}
      <div className="mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          event.status === 'live'
            ? 'bg-red-500 text-white animate-pulse'
            : event.status === 'completed'
            ? 'bg-green-500/20 text-green-300'
            : 'bg-blue-500/20 text-blue-300'
        }`}>
          {event.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;

