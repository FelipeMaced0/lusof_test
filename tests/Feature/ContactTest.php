<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use SebastianBergmann\Type\VoidType;
use Tests\TestCase;
use App\Models\Contact;
use Illuminate\Support\Str;

class ContactTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_guest_can_see_contacts(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_authenticade_user_can_acess_dashboard(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertSuccessful();
    }

    public function test_authenticade_user_can_create_contact(): void
    {
        $user = User::factory()->create();

        $name = fake()->name();
        $email = fake()->unique()->safeEmail();
        $contact = Str::substr(fake()->unique()->e164PhoneNumber(), 3);

        $response = $this
        ->actingAs($user)
        ->put('/contact/create', [
            "name" => $name,
            "contact" => $contact,
            "email" => $email,
        ]);

        #$response->assertSuccessful();
        
        $this->assertDatabaseHas(Contact::class, [
            'name' => $name,
            'email' => $email,
        ]);
    }

    public function test_authenticade_user_can_update_contact(): void
    {
        $user = User::factory()->create();

        $contact = Contact::factory()->create();

        $newName = fake()->name();
        $newContact = Str::substr(fake()->unique()->e164PhoneNumber(), 3);
        $newEmail = fake()->unique()->safeEmail();

        $response = $this
        ->actingAs($user)
        ->patch(route('contact.update', ['contact' => $contact->id]), [
            'name' => $newName,
            'contact' => $newContact,
            'email' => $newEmail,
        ]);

        #$response->assertSuccessful();
        
        $this->assertDatabaseHas(Contact::class, [
            'name' => $newName,
            'email' => $newEmail
        ]);
    }

    public function test_authenticade_user_can_delete_contact(): void
    {
        $user = User::factory()->create();

        $contact = Contact::factory()->create();

        $response = $this
        ->actingAs($user)
        ->delete('/contact/delete/'.$contact->id);

        $response->assertSuccessful();


        $this->assertSoftDeleted(Contact::class, [
            'email' => $contact->email,
            'contact' => $contact->contact
        ]);
    }
}
