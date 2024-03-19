<?php

namespace App;

use Exception;
use Illuminate\Http\Client\Pool;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use OpenAI;
use OpenAI\Client;
use App\OpenAiChat;

class OpenAiService
{
    protected string $apiKey;
    protected int $timeout = 180;

    public const BASE_URL = 'https://api.openai.com/v1';

    public function batchChat(array $chats): array
    {
        $responses = Http::connectTimeout($this->timeout)
            ->timeout($this->timeout)
            ->pool(function (Pool $pool) use ($chats) {
                return collect($chats)->map(function (OpenAiChat $chat) use ($pool) {
                    try {
                        return $pool->throw()
                            ->withToken($this->apiKey)
                            ->post(self::BASE_URL . '/chat/completions', $chat->build());
                    } catch (Exception $e) {
                        dd('Request exception', $e->getMessage());
                    }
                })->toArray();
            });

        return collect($responses)->map(function ($response) {
            if ($response instanceof Response) {
                $json = json_decode($response->body());
                return json_decode($json->choices[0]->message->content, true);
            }

            return null;
        })->filter()->toArray();
    }

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

    public function apiKey(string $apiKey): self
    {
        $this->apiKey = $apiKey;

        return $this;
    }

    public function client(): Client
    {
        return OpenAI::factory()
            ->withApiKey($this->apiKey)
            ->withHttpClient(new \GuzzleHttp\Client(['timeout' => $this->timeout]))
            ->make();
    }
}
