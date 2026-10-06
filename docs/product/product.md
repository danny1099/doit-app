### Doit — Contexto del proyecto

## Visión del producto

Doit es un gestor de tareas AI-first. A diferencia de un to-do list clásico, la IA participa en todo el ciclo de vida de la tarea: captura, clasificación, priorización, relación entre tareas y apoyo durante la ejecución.

Propuesta de valor: el usuario escribe en texto libre y la app se encarga de estructurar, priorizar y dar contexto, sin obligarlo a navegar menús ni formularios complejos.

Principio de UX: minimalista y centrado en la captura. Sin sidebar complejo. Las opciones de configuración típicas de un SaaS existen, pero nunca compiten con el flujo principal de captura.

---

## 2. Features definidas

### Quick Capture

- Texto libre → la IA lo parsea a una o varias tareas estructuradas.
- Las tareas se asocian automáticamente al workspace activo.

### Daily Focus

- La IA sugiere las prioridades del día.

### Detección de dependencias

- La IA identifica relaciones entre tareas (qué bloquea a qué).

### Clasificación por tipo (location-aware)

La IA clasifica cada tarea en uno de estos tipos:

| Tipo             | Descripción                      |
| ---------------- | -------------------------------- |
| `digital`        | Se resuelve frente a la pantalla |
| `location_based` | Requiere ir a un lugar físico    |
| `communication`  | Implica contactar a alguien      |
| `scheduled`      | Atada a fecha/hora               |

Para las tareas `location_based`:

- Busca negocios cercanos con **Google Places API** (free tier) o similar.
- Notifica por proximidad usando **service workers**.

### Recursos por tarea (RAG por tarea)

- Se pueden adjuntar recursos como contexto de la tarea.
- Tipos: `snippet`, `documento` (PDF, brief), `web_search`.
- La IA indexa el recurso y responde preguntas sobre él **sin salir de la tarea**.

### Modos de usuario

- `dev`, `student`, `personal`, `freelance`.
- Cambian la UX: qué campos se muestran y priorizan.
- **No** cambian el modelo de datos (no hay tablas separadas por modo).

### Categorías / tags personalizados / Workspaces

- El usuario define sus propias categorías por workspace.
- Las tareas pueden tener varias categorías.
- El usuario puede tener varios workspaces.
- Cada workspace tiene sus propias categorías y vistas.
- Estas alimentan los parámetros de clasificación de la IA.

### Pomodoro configurable

- Ajustes de Pomodoro configurables por tarea.

### Configuración SaaS estándar

- Opciones típicas de un SaaS, siempre secundarias frente a la captura.
- **No** compiten con el flujo principal de captura.

# Stack técnico

| Capa               | Tecnología               |
| ------------------ | ------------------------ |
| Framework          | Next.js 15 (App Router)  |
| Lenguaje           | TypeScript (strict mode) |
| API layer          | tRPC                     |
| Base de datos      | Supabase (PostgreSQL)    |
| ORM                | Prisma                   |
| Modelo AI          | Compatible sdk openai    |
| Búsqueda semántica | pgvector                 |
| Hosting            | Vercel                   |
| I18n               | Next.js I18n             |
| Auth               | Better Auth              |
| Payments           | Stripe                   |
| UI                 | Shadcn UI                |
