<?php

namespace App;

use OpenAI;
use OpenAI\Client;
use App\OpenAiChat;

class OpenAiService
{
    public function chat(OpenAiChat $chat): string
    {
        $result = $this->client()->chat()->create($chat->build());
        return $result->choices[0]->message->content;
    }

    public function chatAsJson(OpenAiChat $chat): array
    {
        $result = $this->client()->chat()->create($chat->asJson()->build());
        return json_decode($result->choices[0]->message->content, true);
    }

    public function image(OpenAiImage $image): string
    {
        $result = $this->client()->images()->create($image->build());

        return $result->data[0]->url;
    }

    public function client(): Client
    {
        return OpenAI::factory()
            ->withApiKey(config('openai.api_key'))
            ->withHttpClient(new \GuzzleHttp\Client(['timeout' => config('openai.timeout')]))
            ->make();
    }
}
