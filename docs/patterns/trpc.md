# tRPC Patterns

## Rules

- Validate every input with Zod
- Use APIResult<T>
- Wrap risky operations with tryCatch
- Never expose raw errors
- Use i18n keys for messages

## Procedures

- `procedure` — public, no session required
- `authedProcedure` — requires a user session (`ctx.userId`, `ctx.brandId`)

## Example Flow

Input → Validation → Business Logic → Safe Response
