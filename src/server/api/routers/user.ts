import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import hashPassword from '~/utils/user_hash' 


export const userRouter = createTRPCRouter({

  create: publicProcedure
    .input(z.object({email: z.string(), password: z.string(), nome: z.string()}))
    .mutation( async ({ctx, input}) => {
        const hashedPassword = await hashPassword(input.password)

        return await ctx.db.user.create({
            data: {
              email: input.email,
              password: hashedPassword,
              name: input.nome
            },
          });
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
