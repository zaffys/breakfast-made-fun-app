import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Recipe } from '@shared/types';
import { api } from '@/lib/api-client';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeCardSkeleton } from '@/components/RecipeCardSkeleton';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!query) {
      setFilteredRecipes([]);
      setLoading(false);
      return;
    }
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const data = await api<Recipe[]>(`/api/recipes/search?q=${encodeURIComponent(query)}`);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setFilteredRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-center">
        Search Results
      </h1>
      <p className="text-center text-muted-foreground text-lg mb-12">
        {loading ? 'Searching...' : `Found ${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recipe' : 'recipes'} for "${query}"`}
      </p>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => <RecipeCardSkeleton key={index} />)}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No recipes found</h3>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any recipes matching your search. Try another keyword!
          </p>
          <Button asChild className="mt-6 rounded-full bg-coral-red hover:bg-coral-red/90 text-white">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
}