import { DynamicModule, ForwardReference, Type } from "@nestjs/common";
import { Routes } from "@nestjs/core";
import { UsersModule } from "src/main/users/users.module";

export default [
    {
      path: 'api/v1',
      children: [
        {
          path: 'users',
          module: UsersModule,
        },
      ],
    },
  ] as Routes;
  
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