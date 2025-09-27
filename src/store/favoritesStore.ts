import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface FavoritesState {
  favoriteRecipeIds: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteRecipeIds: [],
      toggleFavorite: (recipeId: string) =>
        set((state) => {
          const isFavorite = state.favoriteRecipeIds.includes(recipeId);
          if (isFavorite) {
            return {
              favoriteRecipeIds: state.favoriteRecipeIds.filter(
                (id) => id !== recipeId
              ),
            };
          } else {
            return {
              favoriteRecipeIds: [...state.favoriteRecipeIds, recipeId],
            };
          }
        }),
      isFavorite: (recipeId: string) => {
        return get().favoriteRecipeIds.includes(recipeId);
      },
    }),
    {
      name: 'sunrise-feasts-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);