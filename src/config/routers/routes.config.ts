import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { DynamicModule, ForwardReference, Type } from "@nestjs/common";
import { Routes } from "@nestjs/core";

export default [
    {
      path: 'api/v1',
      children: [
        {
          path: 'users',
          module: UsersModule,
        },
        {
          path: 'auth',
          module: AuthModule,
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