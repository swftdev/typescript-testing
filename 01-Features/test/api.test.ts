import axios, { AxiosError } from "axios";

import apiData from './getFilm.json'
import { getFilm} from "../api";
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
})

