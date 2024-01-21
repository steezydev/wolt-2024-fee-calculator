// Helper function to check if it's Friday rush hour
function isFridayRushHour(date: Date): boolean {
    const day = date.getUTCDay(); // UTC day of the week
    const hour = date.getUTCHours(); // UTC hour
    return day === 5 && hour >= 15 && hour < 19; // Friday 3-7 PM UTC
}

// Calculate small order surcharge
function calculateSmallOrderSurcharge(cartValue: number): number {
    return cartValue < 10 ? 10 - cartValue : 0;
}

// Calculate delivery fee based on distance
function calculateDistanceFee(distance: number): number {
    const baseFee = 2;
    if (distance <= 1000) return baseFee;
    return baseFee + Math.ceil((distance - 1000) / 500);
}

// Calculate surcharge for bulk items
function calculateItemSurcharge(itemCount: number): number {
    const extraItemSurcharge = 0.5;
    const bulkSurcharge = 1.2;
    if (itemCount < 5) return 0;
    if (itemCount <= 12) return (itemCount - 4) * extraItemSurcharge;
    return 8 * extraItemSurcharge + bulkSurcharge;
}

// Main function to calculate delivery fee
export function calculateDeliveryFee(
    cartValue: number,
    itemCount: number,
    distance: number,
    orderTime: Date
): number {
    if (cartValue >= 200) return 0; // Free delivery for cart value >= 200€

    let fee =
        calculateSmallOrderSurcharge(cartValue) +
        calculateDistanceFee(distance) +
        calculateItemSurcharge(itemCount);

    // Apply Friday rush hour multiplier
    if (isFridayRushHour(orderTime)) {
        fee *= 1.2;
    }

    // Ensure the fee does not exceed the maximum limit
    return Math.min(fee, 15);
}
