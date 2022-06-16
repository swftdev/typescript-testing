import { event, handler, response } from '../controlFlow'

describe("handler", () => {
    it('handler success returns expected response', () => {
        // Arrange
        let successEvent: event = { success: true }
        let expected: response = { statusCode: 200, message: "it worked" }

        //Act
        let actual = handler(successEvent)

        // Assert
        expect(actual).toStrictEqual(expected)
    })

    // it('handler failure returns expected response', () => {
    //     // Arrange
    //     let failureEvent: event = { success: false }

    //     //Act
    //     let actual = handler(failureEvent)

    //     // Assert
    //     expect(actual.statusCode).toBe(400)
    //     expect(actual.message).toBe("it failed")
    // })
})