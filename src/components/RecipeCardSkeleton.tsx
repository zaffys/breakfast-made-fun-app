import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export function RecipeCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video">
          <Skeleton className="w-full h-full" />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <Skeleton className="h-7 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex items-center mt-auto">
          <Skeleton className="h-5 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}