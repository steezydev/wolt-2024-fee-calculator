const baseFee = 2;
const extraItemSurcharge = 0.5;
const bulkSurcharge = 1.2;
const rushHourMultiplier = 1.2;
const freeDeliveryThreshold = 200;
const maxDeliveryFee = 15;

export function isFridayRushHour(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();

    return day === 5 && hour >= 15 && hour < 19;
}

export function calculateSmallOrderSurcharge(cartValue: number): number {
    // Convert to cents to avoid floating point errors
    const valueInCents = cartValue * 100;
    const surcharge = valueInCents < 1000 ? 1000 - valueInCents : 0;
    return surcharge / 100;
}

export function calculateDistanceFee(distance: number): number {
    if (distance <= 1000) return baseFee;
    return baseFee + Math.ceil((distance - 1000) / 500);
}

export function calculateItemSurcharge(itemCount: number): number {
    if (itemCount < 5) return 0;

    const surcharge = (itemCount - 4) * extraItemSurcharge;

    if (itemCount <= 12) return surcharge;

    return surcharge + bulkSurcharge;
}

export function calculateDeliveryFee(
    cartValue: number,
    distance: number,
    itemCount: number,
    orderTime: Date
): number {
    if (cartValue >= freeDeliveryThreshold) return 0; // Free delivery for cart value >= 200€

    let fee =
        calculateSmallOrderSurcharge(cartValue) +
        calculateDistanceFee(distance) +
        calculateItemSurcharge(itemCount);

    // Apply Friday rush hour multiplier
    if (isFridayRushHour(orderTime)) {
        fee *= rushHourMultiplier;
    }

    // Ensure the fee does not exceed the maximum limit
    return Math.min(fee, maxDeliveryFee);
}
