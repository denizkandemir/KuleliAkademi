<?php

namespace App\Models\Concerns;

use InvalidArgumentException;

/**
 * Weekly / monthly / yearly fee columns shared by language schools, campuses and accommodations.
 */
trait HasPeriodicFees
{
    /**
     * Fee period => column name.
     */
    public const FEE_PERIODS = [
        'weekly' => 'weekly_fee',
        'monthly' => 'monthly_fee',
        'yearly' => 'yearly_fee',
    ];

    public function feeFor(string $period): ?string
    {
        $column = self::FEE_PERIODS[$period]
            ?? throw new InvalidArgumentException("Unknown fee period [{$period}].");

        return $this->getAttribute($column);
    }

    /**
     * @return array<string, string|null>
     */
    public function fees(): array
    {
        return collect(self::FEE_PERIODS)
            ->map(fn (string $column, string $period): ?string => $this->feeFor($period))
            ->all();
    }
}
