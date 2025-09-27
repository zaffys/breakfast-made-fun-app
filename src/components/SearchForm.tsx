import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
export function SearchForm() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md mx-auto md:mx-0">
      <div className="relative flex-grow">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for pancakes, eggs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-full rounded-r-none h-14 pl-12 pr-4 text-lg border-2 border-r-0 focus:ring-0 focus:border-teal-blue"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="rounded-full rounded-l-none h-14 bg-coral-red hover:bg-coral-red/90 text-white px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      >
        Search
      </Button>
    </form>
  );
}