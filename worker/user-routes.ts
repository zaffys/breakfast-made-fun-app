import { Hono } from "hono";
import type { Env } from './core-utils';
import { RecipeEntity, CategoryEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure seed data is present
  app.use('/api/*', async (c, next) => {
    await Promise.all([
      RecipeEntity.ensureSeed(c.env),
      CategoryEntity.ensureSeed(c.env)
    ]);
    await next();
  });
  // Get all recipes
  app.get('/api/recipes', async (c) => {
    const page = await RecipeEntity.list(c.env);
    return ok(c, page.items);
  });
  // Get featured recipes (first 3)
  app.get('/api/recipes/featured', async (c) => {
    const page = await RecipeEntity.list(c.env, null, 3);
    return ok(c, page.items);
  });
  // Get a single recipe by ID
  app.get('/api/recipes/:id', async (c) => {
    const id = c.req.param('id');
    const recipe = new RecipeEntity(c.env, id);
    if (!await recipe.exists()) {
      return notFound(c, 'Recipe not found');
    }
    return ok(c, await recipe.getState());
  });
  // Get recipes by category
  app.get('/api/recipes/category/:categoryName', async (c) => {
    const categoryName = c.req.param('categoryName');
    const page = await RecipeEntity.list(c.env);
    const recipes = page.items.filter((recipe: any) => recipe.category.toLowerCase() === categoryName.toLowerCase());
    return ok(c, recipes);
  });
  // Search recipes
  app.get('/api/recipes/search', async (c) => {
    const query = c.req.query('q')?.toLowerCase();
    if (!query) {
      return ok(c, []);
    }
    const page = await RecipeEntity.list(c.env);
    const recipes = page.items.filter((recipe: any) =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient: string) => ingredient.toLowerCase().includes(query))
    );
    return ok(c, recipes);
  });
  // Get all categories
  app.get('/api/categories', async (c) => {
    const page = await CategoryEntity.list(c.env);
    return ok(c, page.items);
  });
}