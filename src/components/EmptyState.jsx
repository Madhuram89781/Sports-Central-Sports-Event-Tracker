import React from 'react';
import { Trophy } from 'lucide-react';

const EmptyState = React.memo(({ activeTab }) => (
  <div className="text-center py-20">
    <Trophy className="w-20 h-20 text-purple-500/50 mx-auto mb-4" />
    <p className="text-2xl text-purple-300">No {activeTab} events</p>
    <p className="text-gray-400 mt-2">Start by creating a new event</p>
  </div>
));

EmptyState.displayName = 'EmptyState';

export default EmptyState;

