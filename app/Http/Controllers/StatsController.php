<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function index(Request $request)
    {
        return view('stats.index');
    }

    public function category()
    {
        $categories = DB::query()->select('category as name')->from('transactions')->distinct()->get();

        $categoryBreakdown = DB::query()
            ->selectRaw('sum(amount) as amount')
            ->addSelect(['category as name'])
            ->from('transactions')
            ->groupBy('category')
            ->get()
            ->map(function($category) {
                $category->amount = number_format((float)($category->amount / 100), 2);
                return $category;
            });
        ;

        return view('stats.category', [
            'categories' => $categories,
            'breakdown' => $categoryBreakdown,
        ]);
    }
}
