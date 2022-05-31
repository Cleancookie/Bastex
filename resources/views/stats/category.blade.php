<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Stats') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
                <h2>All categories</h2>

                <ul class="grid grid-cols-2 md:grid-cols-6">
                    @foreach ($categories as $category)
                        <li>{{ $category->name }}</li>
                    @endforeach
                </ul>
            </div>
        </div>

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
                <h2>All categories</h2>

                <ul>
                    @foreach ($breakdown as $category)
                        <li>{{ $category->name }}: {{ $category->amount }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</x-app-layout>
