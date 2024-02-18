<?php

namespace App;

class OpenAiImage
{
    protected string $prompt;
    protected string $model = 'dall-e-3';
    protected string $size = '1024x1024';
    protected string $style = 'natural';
    protected bool $highQuality = false;

    public function dalle2(): self
    {
        $this->model = 'dall-e-2';
        return $this;
    }

    public function prompt(string $prompt): self
    {
        $this->prompt = $prompt;
        return $this;
    }

    public function hd(): self
    {
        $this->highQuality = true;
        return $this;
    }

    public function square(): self
    {
        $this->size = '1024x1024';
        return $this;
    }

    public function vertical(): self
    {
        $this->size = '1024x1792';
        return $this;
    }

    public function horizontal(): self
    {
        $this->size = '1792x1024';
        return $this;
    }

    public function vivid(): self
    {
        $this->style = 'vivid';
        return $this;
    }

    public function build(): array
    {
        return [
            'model' => $this->model,
            'prompt' => $this->prompt,
            'size' => $this->size,
            'style' => $this->style,
            'quality' => $this->highQuality ? 'hd' : 'standard'
        ];
    }
}
