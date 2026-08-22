#!/bin/sh
# `vercel dev` doesn't reliably auto-load .env.local into the /api serverless
# functions in this setup, so this sources it into the shell explicitly
# before starting the dev server (the framework dev command picks it up fine
# either way).
set -a
. ./.env.local
set +a
exec npx vercel dev --listen 3557 --yes
