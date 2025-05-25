import React from 'react';
import { Brain } from 'lucide-react';

const InitialPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
      <Brain className="w-12 h-12 mb-4 text-blue-500" />
      <h2 className="text-2xl font-semibold mb-2">Start Exploring the Web Smarter</h2>
      <p className="max-w-md">
        Type a topic, question, or phrase in the search box above and let AI WebSearcher find the most relevant results across multiple sources for you.
      </p>
    </div>
  );
};

export default InitialPlaceholder;
