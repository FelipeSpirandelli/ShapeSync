import { exampleRouter } from "~/server/api/routers/example";
import { exerciciosRouter } from "~/server/api/routers/exercicios";
import { nutricaoRouter } from "./routers/nutricao";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  exercicios: exerciciosRouter,
  nutricao: nutricaoRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
