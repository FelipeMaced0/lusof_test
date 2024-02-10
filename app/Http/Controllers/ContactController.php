<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{

    /**
     * Display
     */
    public function edit(Request $request, Contact $contact = null): Response
    {
        return Inertia::render('Dashboard', ['contact' => $contact]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:5',
            'contact' => 'required|string|min:9|max:9|unique:contacts,contact',
            'email' => 'required|email|unique:contacts,email'
        ]);

        try {
            Contact::query()->create($validated);
            return response('Contact has Been created', 209);
        } catch (\Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }


    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request, Contact $contact): HttpResponse
    {
        $validated  = $request->validate([
            'name' => 'nullable|string|min:5',
            'contact' => 'nullable|string|min:9|max:9',
            'email' => 'nullable|email'
        ]);

        $updated = $contact->update($validated);

        if($updated ){
            return response('Contact has been updated', 206);

        }
        return response('Contact could not be updated', 409);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Contact $contact): HttpResponse
    {
        $deleted = $contact->delete();

        if ($deleted) {
            return response('Deletado', 204);
        }

        return response('Deletado', 409);
    }
}
