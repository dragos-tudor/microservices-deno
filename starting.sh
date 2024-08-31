trap 'kill 0' SIGINT;
deno run -A ./identity-api/starting.js &
deno run -A ./loans-api/starting.js &
deno run -A ./monitor-api/starting.js &
deno run -A ./notifications-api/starting.js