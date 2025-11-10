'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getSummaryByIndustry, getBulletsByIndustry, getSkillsByIndustry } from '@/lib/contentSuggestions';
import { Sparkles, X } from 'lucide-react';

interface Props {
  type: 'summary' | 'bullets' | 'skills';
  industry: string;
  onSelect: (text: string) => void;
}

export function ContentSuggestions({ type, industry, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const loadSuggestions = () => {
    if (type === 'summary') {
      setSuggestions(getSummaryByIndustry(industry));
    } else if (type === 'bullets') {
      setSuggestions(getBulletsByIndustry(industry));
    } else if (type === 'skills') {
      const skillsByCategory = getSkillsByIndustry(industry);
      // Flatten all skills into suggestions
      const allSuggestions = Object.entries(skillsByCategory).map(
        ([category, items]) => `${category}: ${Array.isArray(items) ? items.join(', ') : items}`
      );
      setSuggestions(allSuggestions);
    }
    setIsOpen(true);
  };

  const handleSelect = (text: string) => {
    onSelect(text);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={loadSuggestions}
        className="border-purple-300 text-purple-700 hover:bg-purple-50"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        AI Suggest
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-lg">
                  {type === 'summary' && 'Professional Summary Suggestions'}
                  {type === 'bullets' && 'Experience Bullet Point Suggestions'}
                  {type === 'skills' && 'Skills Suggestions'}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <p className="text-sm text-gray-600 mb-4">
                Click on any suggestion to use it. You can edit it after adding.
              </p>
              
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <p className="text-gray-800">{suggestion}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-500">
                💡 Tip: Customize these suggestions with your specific achievements and numbers for best results.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
