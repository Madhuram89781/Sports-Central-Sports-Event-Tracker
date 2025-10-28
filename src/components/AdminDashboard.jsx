import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Trophy, Plus, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import AddEventModal from './AddEventModal';
import EventCard from './EventCard';
import EmptyState from './EmptyState';

const TABS = ['upcoming', 'live', 'completed', 'all'];

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [editingScore, setEditingScore] = useState(null);
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

  // Add event to Firestore
  const addEvent = useCallback(async (newEvent) => {
    try {
      await addDoc(collection(db, 'events'), {
        ...newEvent,
        createdAt: new Date().toISOString(),
        createdBy: currentUser.uid
      });
      setShowAddEvent(false);
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event. Please try again.');
    }
  }, [currentUser]);

  // Update score in Firestore
  const updateScore = useCallback(async (id, field, value) => {
    try {
      let finalValue = parseFloat(value) || 0;

      // Handle cricket overs conversion
      if ((field === 'overs1' || field === 'overs2')) {
        const eventToUpdate = events.find(e => e.id === id);
        if (eventToUpdate && eventToUpdate.sport === 'Cricket') {
          const overs = Math.floor(finalValue);
          const balls = Math.round((finalValue - overs) * 10);

          if (balls >= 6) {
            const additionalOvers = Math.floor(balls / 6);
            const remainingBalls = balls % 6;
            finalValue = overs + additionalOvers + (remainingBalls / 10);
          }
        }
      }

      const eventRef = doc(db, 'events', id);
      await updateDoc(eventRef, { [field]: finalValue });
    } catch (error) {
      console.error('Error updating score:', error);
      alert('Failed to update score. Please try again.');
    }
  }, [events]);

  // Update status in Firestore
  const updateStatus = useCallback(async (id, status) => {
    try {
      const eventRef = doc(db, 'events', id);
      await updateDoc(eventRef, { status });
      setEditingScore(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  }, []);

  // Delete event from Firestore
  const deleteEvent = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  }, []);

  const handleOpenAddEvent = useCallback(() => setShowAddEvent(true), []);
  const handleCloseAddEvent = useCallback(() => setShowAddEvent(false), []);

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
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  ADMIN
                </span>
              </div>
              <p className="text-purple-300">Track events, scores & champions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-3">
              <p className="text-white font-semibold">{currentUser?.displayName || currentUser?.email}</p>
              <p className="text-purple-300 text-sm">Administrator</p>
            </div>
            <button
              onClick={handleOpenAddEvent}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              New Event
            </button>
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

      {/* Add Event Modal */}
      {showAddEvent && (
        <AddEventModal
          onClose={handleCloseAddEvent}
          onAddEvent={addEvent}
        />
      )}

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredEvents.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                editingScore={editingScore}
                onUpdateScore={updateScore}
                onUpdateStatus={updateStatus}
                onDeleteEvent={deleteEvent}
                onSetEditingScore={setEditingScore}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

