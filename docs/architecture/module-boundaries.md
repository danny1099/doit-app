# Module Boundaries

## Each module owns:

- components
- schemas
- types
- router
- hooks (if applicable)
- services (if applicable)
- helpers (if applicable)

## Rules

- Modules cannot directly manipulate another module internals
- Shared abstractions live in shared/
- Cross-module communication should happen through contracts or services
- Keep entities isolated and scalable
