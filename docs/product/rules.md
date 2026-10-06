### Rules

1. **La IA nunca escribe directo a la DB.** Todo output de la IA se valida contra un schema **Zod** antes de persistirse. No se confía en que el modelo produzca JSON válido sin verificación.
2. **Los modos cambian UX, no el modelo de datos.** Son una capa de presentación y de priorización de campos.
3. **Todo funciona sin IA como fallback.** Si la IA falla o hay rate limit, la app sigue permitiendo crear y editar tareas manualmente sin romper el flujo.
4. **Context Embeddings/pgvector** Los recursos de tarea (snippets, PDFs, resultados web) se utilizan como contexto para que la IA pueda comprender mejor como catalogar, asignar tags, o recursos a la tarea.
