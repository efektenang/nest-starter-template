import { AuthModule } from '@/auth/auth.module';
import { BookModule } from '@/books/book.module';
import { PublisherModule } from '@/publishers/publisher.module';
import { UsersModule } from '@/users/users.module';
import { Routes } from '@nestjs/core';

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
      {
        path: 'book',
        module: BookModule,
      },
      {
        path: 'publishers',
        module: PublisherModule,
      },
    ],
  },
] as Routes;
