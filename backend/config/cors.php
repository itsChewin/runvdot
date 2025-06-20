<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    'http://localhost:5173',
    'https://runvdot.vercel.app',
    'https://runvdot-879oygdt7-tttars-projects.vercel.app',
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
];