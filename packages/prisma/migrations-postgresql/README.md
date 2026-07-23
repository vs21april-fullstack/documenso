# Legacy PostgreSQL migrations

This directory preserves the migration history from before the MySQL conversion.
Prisma does not read this directory. New installations use the MySQL baseline in
`../migrations`.

Moving an existing PostgreSQL deployment to MySQL requires a separate data export
and import process; these migrations are retained only as historical reference.
