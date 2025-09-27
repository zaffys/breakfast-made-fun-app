import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '@shared/types';
import { api } from '@/lib/api-client';
import { useFavoritesStore } from '@/store/favoritesStore';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeCardSkeleton } from '@/components/RecipeCardSkeleton';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
export default function FavoritesPage() {
  const { favoriteRecipeIds } = useFavoritesStore();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (favoriteRecipeIds.length === 0) {
        setAllRecipes([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const recipePromises = favoriteRecipeIds.map(id =>
          api<Recipe>(`/api/recipes/${id}`)
        );
        const favoriteRecipesData = await Promise.all(recipePromises);
        setAllRecipes(favoriteRecipesData.filter(Boolean)); // Filter out any nulls if an ID was not found
      } catch (error) {
        console.error("Failed to fetch favorite recipes:", error);
        setAllRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteRecipes();
  }, [favoriteRecipeIds]);
  const favoriteRecipes = allRecipes;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-center">
        My Favorite Recipes
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: favoriteRecipeIds.length || 3 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No favorites yet!</h3>
          <p className="mt-2 text-muted-foreground">
            Click the heart on any recipe to save it here.
          </p>
          <Button asChild className="mt-6 rounded-full bg-coral-red hover:bg-coral-red/90 text-white">
            <Link to="/">Find Recipes</Link>
          </Button>
        </div>
      )}
    </div>
  );
}