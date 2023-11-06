import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

// Rota dos exercícios, acessando o banco de dados

export const nutricaoRouter = createTRPCRouter({

  // Função para pegar os alimentos por tipo.
  getAlimentosPorID: protectedProcedure
    .input(z.object({ id_usuario: z.string(), tipo : z.number() }))
    .query(async ({ ctx, input }) => {
      const alimentos = await ctx.db.alimentos.findMany({
        where: {
          id_usuario: input.id_usuario,
          tipo: input.tipo,
        },    
      });
      return alimentos;
    }),
  
  /// Função para pegar todos os alimentos de um usuario.
  getAlimentos: protectedProcedure
    .input(z.object({ id_usuario: z.string() }))
    .query(async ({ ctx, input }) => {
      const alimentos = await ctx.db.alimentos.findMany({
        where: {
          id_usuario: input.id_usuario,
        },
      });

      return alimentos;
    }),


  // Função apagar todos os alimentos de um usuario.
  apagarAlimentos: protectedProcedure
    .input(z.object({ id_usuario: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const alimentos = await ctx.db.alimentos.deleteMany({
        where: {
          id_usuario: input.id_usuario,
        },
      });

      return alimentos;
    }),

  // Função para adicionar um alimento a um dado usuario.
  adicionarAlimento: protectedProcedure
    .input(
      z.object({
        id_usuario: z.string(),
        id_alimento: z.number(),
        peso: z.number(),
        tipo: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const alimento = await ctx.db.alimentos.create({
        data: {
          id_usuario: input.id_usuario,
          peso: input.peso,
          tipo: input.tipo,
          id_alimento: input.id_alimento,
        },
      });

      return alimento;
    }),

});
