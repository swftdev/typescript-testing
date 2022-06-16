import { getConfig, config } from '../hello'

describe("getConfig", () => {
    it("gives default config when no options are passed", () => {
        // Given
        let expected: config = { env: "DEV", version: "1.0.0" }

        // When
        let actual = getConfig()

        // Then
        expect(actual).toStrictEqual(expected)
    })

    it("creates custom config when options are passed in", () => {
        // Given
        let options: config = { env: "PROD", version: "2.0.0" } 
        let expected: config = { env: "PROD", version: "2.0.0" }

        // When
        let actual = getConfig(options)

        // Then
        expect(actual).toStrictEqual(expected)
    })
})