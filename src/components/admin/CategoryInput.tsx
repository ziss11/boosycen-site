'use client';

import { useState } from 'react';

interface CategoryInputProps {
  value: string[];
  onChange: (categories: string[]) => void;
  label?: string;
}

const PREDEFINED_CATEGORIES = [
  'Mobile App',
  'Web Application',
  'E-Commerce',
  'Dashboard',
  'Branding',
  'UI/UX Design',
];

export default function CategoryInput({
  value,
  onChange,
  label = 'Categories',
}: CategoryInputProps) {
  const [customCategory, setCustomCategory] = useState('');

  const toggleCategory = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((c) => c !== category));
    } else {
      onChange([...value, category]);
    }
  };

  const addCustomCategory = () => {
    const trimmed = customCategory.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setCustomCategory('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomCategory();
    }
  };

  const removeCategory = (category: string) => {
    onChange(value.filter((c) => c !== category));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>

      {/* Predefined categories */}
      <div className="space-y-2">
        <p className="text-xs text-muted">Select from predefined categories:</p>
        <div className="flex flex-wrap gap-2">
          {PREDEFINED_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                value.includes(category)
                  ? 'bg-pastel-mint text-foreground shadow-sm'
                  : 'bg-background border border-foreground/20 text-muted hover:border-foreground/40'
              }`}
            >
              {category}
              {value.includes(category) && (
                <span className="ml-1.5">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom category input */}
      <div className="space-y-2">
        <p className="text-xs text-muted">Or add a custom category:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter custom category"
            className="flex-1 px-4 py-2 rounded-lg border border-foreground/20 bg-background focus:border-foreground/40 focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={addCustomCategory}
            disabled={!customCategory.trim()}
            className="px-4 py-2 rounded-lg bg-pastel-sky hover:bg-pastel-sky/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected categories */}
      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted">Selected categories:</p>
          <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-background/50 border border-foreground/10">
            {value.map((category) => (
              <div
                key={category}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pastel-lavender/50 text-sm"
              >
                <span>{category}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="hover:text-red-600 transition-colors"
                  aria-label={`Remove ${category}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {value.length === 0 && (
        <p className="text-xs text-muted/70 italic">
          No categories selected yet
        </p>
      )}
    </div>
  );
}
