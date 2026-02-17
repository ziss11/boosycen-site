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

const categoryColors: Record<string, string> = {
  'Mobile App':      'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800/30',
  'Web Application': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30',
  'E-Commerce':      'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800/30',
  Dashboard:         'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/30',
  Branding:          'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30',
  'UI/UX Design':    'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800/30',
};

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
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-foreground'>
        {label}
      </label>

      {/* Predefined categories */}
      <div className='space-y-2'>
        <p className='text-xs text-muted'>Select from predefined categories:</p>
        <div className='flex flex-wrap gap-2'>
          {PREDEFINED_CATEGORIES.map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => toggleCategory(category)}
              className={`chip text-sm transition-all ${
                value.includes(category)
                  ? (categoryColors[category] ?? 'chip-accent')
                  : 'hover:border-accent/30'
              }`}
            >
              {category}
              {value.includes(category) && <span className='ml-1.5'>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Custom category input */}
      <div className='space-y-2'>
        <p className='text-xs text-muted'>Or add a custom category:</p>
        <div className='flex gap-2'>
          <input
            type='text'
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Enter custom category'
            className='site-input flex-1'
          />
          <button
            type='button'
            onClick={addCustomCategory}
            disabled={!customCategory.trim()}
            className='btn btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected categories */}
      {value.length > 0 && (
        <div className='space-y-2'>
          <p className='text-xs text-muted'>Selected categories:</p>
          <div className='flex flex-wrap gap-2 p-3 rounded-lg border border-(--border-light) bg-bg-subtle'>
            {value.map((category) => (
              <div
                key={category}
                className={`chip flex items-center gap-1.5 text-sm ${categoryColors[category] ?? 'chip-accent'}`}
              >
                <span>{category}</span>
                <button
                  type='button'
                  onClick={() => removeCategory(category)}
                  className='hover:text-red-600 transition-colors'
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
        <p className='text-xs text-muted/70 italic'>
          No categories selected yet
        </p>
      )}
    </div>
  );
}
