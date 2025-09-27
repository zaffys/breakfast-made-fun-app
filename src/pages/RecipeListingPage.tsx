import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe } from '@shared/types';
import { api } from '@/lib/api-client';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeCardSkeleton } from '@/components/RecipeCardSkeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};
export default function RecipeListingPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!categoryName) return;
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await api<Recipe[]>(`/api/recipes/category/${categoryName}`);
        setRecipes(data);
      } catch (error) {
        console.error(`Failed to fetch recipes for category ${categoryName}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [categoryName]);
  const capitalizedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : 'Category';
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalizedCategoryName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-center">
        {capitalizedCategoryName} Recipes
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => <RecipeCardSkeleton key={index} />)}
        </div>
      ) : recipes.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={itemVariants}>
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            No recipes found in this category.
          </p>
        </div>
      )}
    </div>
  );
}