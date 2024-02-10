<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Name of the table
     *
     * @var string
     */
    protected $table = 'contacts';

    /**
     * Primary key of the table
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "name",
        "contact",
        "email",
    ];

    /**
     * Timestamps for the model.
     *
     * @var bool
     */
    public $timestamps = true;
}
