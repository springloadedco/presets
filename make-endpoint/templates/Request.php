<?php

namespace @@namespace;

use Illuminate\Foundation\Http\FormRequest;

class @@fileNameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}

