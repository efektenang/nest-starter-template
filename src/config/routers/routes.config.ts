import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { Routes } from '@nestjs/core';

export function destructModuleFromRoutes(
  routes: Routes = [],
): (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] {
  return routes.reduce((a, b) => {
    if (Array.isArray(b.children) && b.children.length > 0)
      return [...a, ...destructModuleFromRoutes(b.children as Routes)];
    else if (!b.module) return a;

    return [...a, b.module];
  }, []);
}
