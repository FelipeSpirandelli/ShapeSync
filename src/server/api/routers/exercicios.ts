import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Rota dos exercícios, acessando o banco de dados

export const exerciciosRouter = createTRPCRouter({
  
  // Função para pegar os 6 ultimos exercícios para um dado treino. Para um id_usuario especifico.
  getExercicosMaisRecentesPorTreino: protectedProcedure
    .input(z.object({ treino: z.number(), id_usuario: z.string() }))
    .query(async ({ ctx, input }) => {
      const exercicios = await ctx.db.exercicios.findMany({
        where: {
          treino: input.treino,
          id_usuario: input.id_usuario,
        },
        orderBy: {
          data: "desc",
        },
        take: 6,
      });

      return exercicios;
    }),

  // Função apagar todos os exercicios de um dado treino de uma data especifica. Para um id_usuario especifico.
  apagarExerciciosPorTreino: protectedProcedure
    .input(z.object({ treino: z.number(), data: z.date(), id_usuario: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const exercicios = await ctx.db.exercicios.deleteMany({
        where: {
          treino: input.treino,
          data: input.data,
          id_usuario: input.id_usuario,
        },
      });

      return exercicios;
    }),
  
    // Função para adicionar um exercicio a um dado treino. Para um id_usuario especifico e uma data especifica.
  adicionarExercicio: protectedProcedure
    .input(
      z.object({
        treino: z.number(),
        id_usuario: z.string(),
        id_exercicio: z.number(),
        data: z.date(),
        peso: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exercicio = await ctx.db.exercicios.create({
        data: {
          treino: input.treino,
          id_usuario: input.id_usuario,
          data: input.data,
          id_exercicio: input.id_exercicio,
          peso: input.peso,
        },
      });

      return exercicio;
    }),
  
});
