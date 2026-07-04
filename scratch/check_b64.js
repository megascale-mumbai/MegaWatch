// Run from project root: node scratch/check_b64.js
const { Pool } = require('./node_modules/pg');
const pool = new Pool({ connectionString: 'postgresql://postgres:root@localhost:5432/Watch-db' });

pool.query(`
  SELECT name,
    pg_size_pretty(pg_column_size(config)::bigint) as config_size,
    CASE WHEN config::text LIKE '%data:image%' THEN 'HAS_BASE64' ELSE 'clean' END as status
  FROM "Watch"
  ORDER BY pg_column_size(config) DESC
`)
.then(r => { console.log(JSON.stringify(r.rows, null, 2)); pool.end(); })
.catch(e => { console.error(e.message); pool.end(); });
