import { setup, AnotherEnvError } from '../errors'
describe("setup", () => {
    beforeEach(() => {
        process.env.uri = "set"
        process.env.environment =  "DEV"
    })

    it("should return true when process.env contains [uri, environment]", () => {
        expect(setup()).toBe(true)
    })

    it("should throw EnvErro when process.env.uri is missing", () => {
        delete process.env.uri
        try{ 
            setup()
        } catch (e){
            if (e instanceof Error) expect(e.name).toBe("EnvError")
        }
        expect.assertions(1)
    })

    it("should throw  when process.env.environment is missing", () => {
        delete process.env.environment
        try{ 
            setup()
        } catch (e){
            expect(e).toBeInstanceOf(AnotherEnvError)
        }
        expect.assertions(1)
    })
})