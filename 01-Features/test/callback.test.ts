import { callNTimes } from "../callback";

describe("callNTimes", () => {
    it("calls the 'callback' the correct number of times", () => {
        let callback = jest.fn()
        callNTimes(callback, 3)
        expect(callback.mock.calls.length).toBe(3)
    })

    it("doesn't call callback when second argument is 0", () => {
        let callback = jest.fn()
        callNTimes(callback, 0)
        expect(callback.mock.calls.length).toBe(0)
    })
})