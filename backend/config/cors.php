<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    'http://localhost:5173',
    'https://runvdot-hzgj4w7gp-tttars-projects.vercel.app',
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
];