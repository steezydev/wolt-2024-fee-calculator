import {
    calculateDeliveryFee,
    calculateDistanceFee,
    calculateItemSurcharge,
    calculateSmallOrderSurcharge,
    isFridayRushHour,
} from '@/helpers/deliveryFee';

describe('Delivery fee calculation', () => {
    describe('calculateSmallOrderSurcharge', () => {
        test('no surcharge for cart value >= 10€', () => {
            expect(calculateSmallOrderSurcharge(10)).toBe(0);
            expect(calculateSmallOrderSurcharge(15)).toBe(0);
        });

        test('correct surcharge for cart value < 10€', () => {
            expect(calculateSmallOrderSurcharge(8.9)).toBeCloseTo(1.1);
            expect(calculateSmallOrderSurcharge(5)).toBeCloseTo(5);
        });
    });

    describe('calculateDistanceFee', () => {
        test('base fee for distance <= 1km', () => {
            expect(calculateDistanceFee(1000)).toBe(2);
            expect(calculateDistanceFee(999)).toBe(2);
        });

        test('additional fee for every 500m > 1 km', () => {
            expect(calculateDistanceFee(1500)).toBe(3);
            expect(calculateDistanceFee(1501)).toBe(4);
            expect(calculateDistanceFee(2000)).toBe(4);
        });
    });

    describe('calculateItemSurcharge', () => {
        test('no surcharge for items <= 4', () => {
            expect(calculateItemSurcharge(4)).toBe(0);
        });

        test('50 cents surcharge for each item > 4', () => {
            expect(calculateItemSurcharge(5)).toBe(0.5);
            expect(calculateItemSurcharge(10)).toBe(3);
        });

        test('additional bulk fee for > 12 items', () => {
            expect(calculateItemSurcharge(13)).toBe(5.7);
            expect(calculateItemSurcharge(14)).toBe(6.2);
        });
    });

    describe('isFridayRushHour', () => {
        test('detects Friday rush hour correctly', () => {
            const fridayRush = new Date('2024-01-12T15:00:00'); // Friday, 15:00 Local Time
            const notFridayRush = new Date('2024-01-12T20:00:00'); // Friday, 20:00 Local Time

            expect(isFridayRushHour(fridayRush)).toBeTruthy();
            expect(isFridayRushHour(notFridayRush)).toBeFalsy();
        });
    });

    describe('calculateDeliveryFee', () => {
        test('calculates free delivery for cart value >= 200€', () => {
            expect(
                calculateDeliveryFee(
                    200,
                    1000,
                    3,
                    new Date('2024-02-01T12:00:00')
                )
            ).toBe(0);
        });

        test('minimum delivery fee without surcharges', () => {
            expect(
                calculateDeliveryFee(
                    10,
                    900,
                    3,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(2);
        });

        test('minimum delivery fee with tiny surcharge', () => {
            expect(
                calculateDeliveryFee(
                    9.99,
                    900,
                    3,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(2.01); // 2€ base fee + 0.01€ tiny order surcharge
        });

        test('delivery fee with small order surcharge', () => {
            expect(
                calculateDeliveryFee(8, 900, 3, new Date('2024-01-01T10:00:00'))
            ).toBe(4); // 2€ base fee + 2€ surcharge
        });

        test('delivery fee with distance surcharge', () => {
            expect(
                calculateDeliveryFee(
                    11,
                    1600,
                    3,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(4); // 2€ base fee + 2€ distance surcharge
        });

        test('delivery fee with item surcharge', () => {
            expect(
                calculateDeliveryFee(
                    11,
                    900,
                    5,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(2.5); // 2€ base fee + 0.5€ item surcharge
        });

        test('maximum delivery fee cap', () => {
            expect(
                calculateDeliveryFee(
                    199,
                    10000,
                    15,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(15);
        });

        test('free delivery for high cart value', () => {
            expect(
                calculateDeliveryFee(
                    200,
                    5000,
                    10,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(0);
        });

        test('Friday rush hour fee increase', () => {
            expect(
                calculateDeliveryFee(
                    20,
                    2000,
                    3,
                    new Date('2024-01-05T16:00:00')
                )
            ).toBeCloseTo(4.8); // (2€ base + 2€ distance) * 1.2
        });

        test('edge case for distance surcharge at 1500m', () => {
            expect(
                calculateDeliveryFee(
                    20,
                    1500,
                    3,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(3); // 2€ base + 1€ for 500m
        });

        test('bulk item surcharge', () => {
            expect(
                calculateDeliveryFee(
                    20,
                    900,
                    13,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(7.7); // 2€ base + 5.7€ item surcharge
        });

        test('edge case for small order and item count', () => {
            expect(
                calculateDeliveryFee(
                    9.5,
                    900,
                    4,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(2.5); // 2€ base + 0.5€ small order surcharge
        });

        test('multiple surcharges without exceeding cap', () => {
            expect(
                calculateDeliveryFee(
                    9,
                    2500,
                    6,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(7); // 2€ base + 1€ small order + 3€ distance + 1€ items
        });

        test('minimum fee for slight distance over 1km', () => {
            expect(
                calculateDeliveryFee(
                    20,
                    1001,
                    3,
                    new Date('2024-01-01T10:00:00')
                )
            ).toBe(3); // 2€ base + 1€ for the extra 1m
        });
    });
});
