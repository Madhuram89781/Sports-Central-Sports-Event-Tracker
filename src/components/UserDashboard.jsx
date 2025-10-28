import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import EventCardReadOnly from './EventCardReadOnly';
import EmptyState from './EmptyState';

const TABS = ['upcoming', 'live', 'completed', 'all'];

export default function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { currentUser, logout } = useAuth();

  // Real-time listener for events from Firestore
  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = [];
      snapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsData);
    }, (error) => {
      console.error('Error fetching events:', error);
    });

    return () => unsubscribe();
  }, []);

  // Memoize filtered events to avoid recalculation on every render
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (activeTab === 'upcoming') return event.status === 'scheduled';
      if (activeTab === 'live') return event.status === 'live';
      if (activeTab === 'completed') return event.status === 'completed';
      return true;
    });
  }, [events, activeTab]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold text-white">Sports Central</h1>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <UserIcon className="w-3 h-3" />
                  USER
                </span>
              </div>
              <p className="text-purple-300">Track events, scores & champions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-3">
              <p className="text-white font-semibold">{currentUser?.displayName || currentUser?.email}</p>
              <p className="text-purple-300 text-sm">Viewer</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-800/50 backdrop-blur-sm p-2 rounded-2xl border border-purple-500/20">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredEvents.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCardReadOnly
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

