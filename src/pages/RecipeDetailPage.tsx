import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Recipe } from '@shared/types';
import { api } from '@/lib/api-client';
import { useFavoritesStore } from '@/store/favoritesStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heart, ChefHat, Clock, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
export default function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isRecipeFavorite = recipe ? isFavorite(recipe.id) : false;
  useEffect(() => {
    if (!recipeId) return;
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await api<Recipe>(`/api/recipes/${recipeId}`);
        setRecipe(data);
      } catch (err) {
        console.error(`Failed to fetch recipe ${recipeId}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Skeleton className="h-6 w-1/3 mb-12" />
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-32 w-full" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error || !recipe) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/category/${recipe.category}`}>{recipe.category}</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
          <BreadcrumbItem><BreadcrumbPage>{recipe.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <img src={recipe.illustration} alt={recipe.title} className="w-full h-auto rounded-lg bg-sunny-yellow/10 p-4" />
        </motion.div>
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold">{recipe.title}</h1>
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-coral-red/10" onClick={() => toggleFavorite(recipe.id)}>
              <Heart className={`w-6 h-6 transition-all ${isRecipeFavorite ? 'text-coral-red fill-current' : 'text-muted-foreground'}`} />
            </Button>
          </div>
          <p className="text-lg text-muted-foreground mb-8">{recipe.description}</p>
          <Card className="bg-teal-blue/5 mb-8">
            <CardContent className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2"><Clock className="w-6 h-6 text-teal-blue" /><span className="font-semibold">Prep Time</span><span className="text-muted-foreground">{recipe.prepTime} min</span></div>
              <div className="flex flex-col items-center gap-2"><ChefHat className="w-6 h-6 text-teal-blue" /><span className="font-semibold">Cook Time</span><span className="text-muted-foreground">{recipe.cookTime} min</span></div>
              <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1 mt-4 md:mt-0"><Users className="w-6 h-6 text-teal-blue" /><span className="font-semibold">Servings</span><span className="text-muted-foreground">{recipe.servings}</span></div>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-playfair font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {recipe.ingredients.map((ing, index) => (<li key={index}><span className="font-medium text-foreground">{ing.amount}</span> {ing.item}</li>))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-playfair font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4 list-decimal list-inside">
                {recipe.instructions.map((step, index) => (<li key={index} className="text-muted-foreground leading-relaxed"><span className="text-foreground">{step}</span></li>))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}