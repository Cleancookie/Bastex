<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ImportCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import
    {--f|file : Name of the file from the storage folder}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports from a monzo csv';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $filePath = $this->option('file');
        if (!$filePath) {
            $filePath = $this->ask('File to import', 'transactions.csv');
        }

        $file = File::get(storage_path($filePath));
        $monzos = collect(explode(PHP_EOL, $file))
            ->slice(1)
            ->map(function ($line) {
                return explode(',', $line);
            })
            ->map(function ($line) {
                if (!Str::startsWith($line[0] ?? '', 'tx_')) {
                    return null;
                }

                return new Transaction([
                    'name' => $line[4] ?? '',
                    'type' => $line[3] ?? '',
                    'category' => $line[6] ?? '',
                    'amount' => (float)($line[7] ?? 0) * 100,
                    'currency' => $line[8] ?? 0,
//                    'address' => json_encode(['line_1' => $line[14] ?? '']), // theres commas in the address so the explode is a bad idea
                    'created_at' => Carbon::createFromFormat('H:i:s d/m/Y', ($line[2] ?? '01:01:01') . ' ' . ($line[1] ?? '01/01/1111')),
                    'monzo_id' => $line[0],
                ]);
            })
            ->filter()
            ->each(fn ($transaction) => $transaction->save())
        ;

        return 0;
    }
}
