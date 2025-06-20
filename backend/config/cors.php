<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    'http://localhost:5173',
    'https://runvdot-5ia8c72ky-tttars-projects.vercel.app',
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
];