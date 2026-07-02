import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onUseLocation: () => void;
  disabled: boolean;
}

const SearchBar = ({ onSearch, onUseLocation, disabled }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full gap-2 sm:w-auto'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search a city…'
        aria-label='Search a city'
        className='w-full rounded-lg border border-line bg-panel px-4 py-2 text-sm text-cloud placeholder-mist outline-none transition focus:border-skylight sm:w-64'
      />
      <button
        type='submit'
        disabled={disabled}
        className='rounded-lg bg-skylight px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-50'
      >
        Search
      </button>
      <button
        type='button'
        onClick={onUseLocation}
        disabled={disabled}
        title='Use my location'
        aria-label='Use my location'
        className='rounded-lg border border-line bg-panel px-3 py-2 text-sm text-mist transition hover:border-skylight hover:text-skylight disabled:opacity-50'
      >
        ◎
      </button>
    </form>
  );
};

export default SearchBar;
