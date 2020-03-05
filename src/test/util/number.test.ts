import { randomInteger } from '../../util/number';

const realRandom = Math.random;

afterEach(() => {
    Math.random = realRandom;
});

describe('randomInteger', () => {
    describe('no arguments', () => {
        test.each([0, 0.1, 0.2, 0.3, 0.4, 0.49, 0.4999])('input %s outputs 0', (input) => {
            Math.random = () => input;
            expect(randomInteger()).toEqual(0);
        });

        test.each([0.5, 0.51, 0.6, 0.7, 0.8, 0.9, 0.9999])('input %s outputs 1', (input) => {
            Math.random = () => input;
            expect(randomInteger()).toEqual(1);
        });
    });

    describe('with arguments', () => {
        //fails these tests currently
        test.each([
            [0, -100, -300, -100],
            [0.1, -9, -10, -9],
            [0.25, -0, -1000, -250],
            [0.4, -240, -480, -336],
            [0.5, -1700, -2200, -1950],
            [0.51, -40, -1000000, -510020],
            [0.6, -10, -20, -16],
            [0.7, -10, -15, -14],
            [0.8, -0, -19, -16],
            [0.9, -40, -1000000, -900004],
            [0.9999, -40, -47, -47]
        ])('input %s min %s max %s outputs %s', (input, max, min, expected) => {
            Math.random = () => input;
            expect(randomInteger(min, max)).toEqual(expected);
        });

        test.each([
            [0, 100, 300, 100],
            [0.1, 9, 10, 9],
            [0.25, 0, 1000, 250],
            [0.4, 240, 480, 336],
            [0.5, 1700, 2200, 1950],
            [0.51, 40, 1000000, 510020],
            [0.6, 10, 20, 16],
            [0.7, 10, 15, 14],
            [0.8, 0, 19, 16],
            [0.9, 40, 1000000, 900004],
            [0.9999, 40, 47, 47]
        ])('input %s min %s max %s outputs %s', (input, min, max, expected) => {
            Math.random = () => input;
            expect(randomInteger(min, max)).toEqual(expected);
        });
    });
});