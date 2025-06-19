<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VdotHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'distance',
        'time',
        'vdot',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
