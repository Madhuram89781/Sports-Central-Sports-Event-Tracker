import React, { useState, useCallback } from 'react';
import { Calendar, X } from 'lucide-react';

const SPORTS = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Baseball', 'Volleyball'];

const INITIAL_EVENT_STATE = {
  name: '',
  sport: '',
  date: '',
  time: '',
  venue: '',
  team1: '',
  team2: '',
  score1: 0,
  score2: 0,
  wickets1: 0,
  wickets2: 0,
  overs1: 0,
  overs2: 0,
  status: 'scheduled'
};

const AddEventModal = React.memo(({ onClose, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState(INITIAL_EVENT_STATE);

  const handleInputChange = useCallback((field, value) => {
    setNewEvent(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (newEvent.name && newEvent.sport && newEvent.date && newEvent.team1 && newEvent.team2) {
      onAddEvent(newEvent);
    }
  }, [newEvent, onAddEvent]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-purple-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-8 h-8 text-purple-400" />
            Schedule New Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="col-span-2 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />

          <select
            value={newEvent.sport}
            onChange={(e) => handleInputChange('sport', e.target.value)}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">Select Sport</option>
            {SPORTS.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>

          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          />

          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
          />

          <input
            type="text"
            placeholder="Venue"
            value={newEvent.venue}
            onChange={(e) => handleInputChange('venue', e.target.value)}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />

          <input
            type="text"
            placeholder="Team 1"
            value={newEvent.team1}
            onChange={(e) => handleInputChange('team1', e.target.value)}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />

          <input
            type="text"
            placeholder="Team 2"
            value={newEvent.team2}
            onChange={(e) => handleInputChange('team2', e.target.value)}
            className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Create Event
        </button>
      </div>
    </div>
  );
});

AddEventModal.displayName = 'AddEventModal';

export default AddEventModal;

