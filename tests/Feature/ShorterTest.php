<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShorterTest extends TestCase
{
    use WithFaker;

    public function test_base()
    {
        $response = $this->postJson(route('shorter'), [
            'url' => $url = $this->faker->url,
        ]);

        $response->assertSuccessful();
        $response->assertJson([
            'message' => 'shorter.success',
            'data' => [
                'original_url' => $url,
            ],
        ]);
    }

    public function test_invalid_url()
    {
        $response = $this->postJson(route('shorter'), [
            'url' => $url = 'this-is-invalid-url',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'url' => ['The url format is invalid.'],
            ],
        ]);
    }

    public function test_invalid_parameter()
    {
        $response = $this->postJson(route('shorter'), [
            'uri' => 'this-is-invalid-parameter-name',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => [
                'url' => ['The url field is required.'],
            ],
        ]);
    }
}
