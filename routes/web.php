<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Models\Contact;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'contacts' => Contact::all()
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('contact')->name('contact.')->controller(ContactController::class)->group(function(){
        Route::get('edit/{contact}', 'edit')->name('edit');
        Route::put('create', 'store')->name('create');
        Route::patch('update/{contact}', 'update')->name('update');
        Route::delete('delete/{contact}', 'destroy')->name('delete');
    });
});

require __DIR__.'/auth.php';
