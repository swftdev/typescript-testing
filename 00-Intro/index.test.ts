import { add } from './index'

describe("Add function:", () => {
    test("should return 3 when called with (1, 2)", () => {
        expect(add(1, 2)).toBe(3)
    })
})