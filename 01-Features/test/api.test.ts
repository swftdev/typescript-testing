import axios, { AxiosError } from "axios";

import apiData from './getFilm.json'
import { getFilm } from "../api";
import { FilmApiError, FilmValidationError } from "../errors";

// Mock axios
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock("axios")

describe("getFilm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should should throw FilmValidationError if api response is malformed", async() => {
        let badData = { ...apiData, title: undefined } as const
        mockedAxios.get.mockResolvedValueOnce({ data: badData })
        try{ 
            await getFilm()
        } catch(e){
            expect(e).toBeInstanceOf(FilmValidationError)
        }
        expect.assertions(1)
    })

    it("should should throw FilmApiError if axios throws AxiosError", async() => {
        mockedAxios.get.mockImplementationOnce(() => {throw new AxiosError})
        try{ 
            await getFilm()
        } catch(e){
            expect(e).toBeInstanceOf(FilmApiError)
        }
        expect.assertions(1)
    })

    it("should should throw generic error if not of know type", async() => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Demo"))
        try {
            await getFilm()
        } catch(e){
            if(e instanceof Error)
                expect(e.message).toBe("Unexpected Error has occured")
        }
        expect.assertions(1)
    })

    it("should should throw FilmValidationError if api response is malformed", async() => {
        mockedAxios.get.mockResolvedValueOnce({ data: apiData })
        let expectedTitle = "Test Data"
        let response = await getFilm()
        expect(response.title).toBe(expectedTitle)
    })

    it("axios.get should be called with formatted url with param data", async() => {
        mockedAxios.get.mockResolvedValueOnce({ data: apiData })
        await getFilm("1234")
        // get the arguments passed to the function call
        let axiosGetUrl = jest.spyOn(mockedAxios, "get").mock.calls[0][0]
        expect(axiosGetUrl.includes("1234"))
    })
})

