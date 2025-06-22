<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    'http://localhost:5173',
    'https://runvdot.vercel.app',
],
    'allowed_origins_patterns' => [
        '^https:\/\/runvdot-[a-z0-9]+-tttars-projects\.vercel\.app$',
    ],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
];