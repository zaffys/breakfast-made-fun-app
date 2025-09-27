import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Recipe, Category } from '@shared/types';
import { api } from '@/lib/api-client';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeCardSkeleton } from '@/components/RecipeCardSkeleton';
import { SearchForm } from '@/components/SearchForm';
import HeroIllustration from '@/assets/illustrations/hero-illustration.svg';
import { Skeleton } from '@/components/ui/skeleton';
export function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [recipesRes, categoriesRes] = await Promise.all([
          api<Recipe[]>('/api/recipes/featured'),
          api<Category[]>('/api/categories'),
        ]);
        setFeaturedRecipes(recipesRes);
        setCategories(categoriesRes);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-sunny-yellow/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h1 className="font-fredericka text-5xl md:text-7xl text-gray-800 dark:text-gray-100">
              Breakfast Made <span className="text-coral-red">Fun</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md mx-auto md:mx-0">
              Discover delightful and easy-to-make breakfast recipes that your whole family will love. Let's turn morning meals into happy memories!
            </p>
            <SearchForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={HeroIllustration} alt="Whimsical breakfast illustration" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-52 w-full rounded-lg" />
              ))
            ) : (
              categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/category/${category.name}`} className="block group">
                    <div className="bg-teal-blue/10 rounded-lg p-6 text-center transition-all duration-300 hover:bg-teal-blue/20 hover:shadow-lg hover:-translate-y-2 h-full flex flex-col justify-center items-center">
                      <img src={category.illustration} alt={category.name} className="h-32 w-auto mx-auto mb-4" />
                      <h3 className="text-2xl font-playfair font-semibold group-hover:text-teal-blue transition-colors">{category.name}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      {/* Featured Recipes Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => <RecipeCardSkeleton key={index} />)
            ) : (
              featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}