import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Recipe } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
interface RecipeCardProps {
  recipe: Recipe;
}
export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/recipe/${recipe.id}`} className="block group">
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 border-2 border-transparent group-hover:border-sunny-yellow group-hover:shadow-lg">
          <CardHeader className="p-0">
            <div className="aspect-video overflow-hidden">
              <img
                src={recipe.illustration}
                alt={recipe.title}
                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow flex flex-col">
            <CardTitle className="font-playfair text-2xl mb-2 group-hover:text-coral-red transition-colors">
              {recipe.title}
            </CardTitle>
            <p className="text-muted-foreground flex-grow mb-4">{recipe.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-auto">
              <Clock className="w-4 h-4 mr-2" />
              <span>{recipe.prepTime + recipe.cookTime} min total</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}