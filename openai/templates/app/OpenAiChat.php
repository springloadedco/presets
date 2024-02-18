<?php

namespace App;

class OpenAiChat
{
    protected array $messages = [];
    protected string $model = 'gpt-4-0125-preview';
    protected float $temperature = 0.1;
    protected bool $json = false;

    public function model(string $model): self
    {
        $this->model = $model;
        return $this;
    }

    public function asJson(): self
    {
        $this->json = true;
        return $this;
    }

    public function temperature(float $temperature): self
    {
        $this->temperature = $temperature;
        return $this;
    }

    public function addMessage(string $role, string $message): self
    {
        $this->messages[] = [
            'role' => $role,
            'content' => $message
        ];
        return $this;
    }

    public function build(): array
    {
        return [
            'model' => $this->model,
            'response_format' => ['type' => $this->json ? 'json_object' : 'text'],
            'temperature' => $this->temperature,
            'messages' => $this->messages
        ];
    }
}
