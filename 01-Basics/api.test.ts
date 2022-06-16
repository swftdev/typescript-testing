import { Film, FilmValidationError, getFilm} from "./api";
import axios from "axios";
import apiData from './test/getFilm.json'

// Mock axios
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock("axios")

describe("getFilm", () => {
    it("should should throw if axios returns malformed api request", async() => {
        let badData: Partial<Film> = { ...apiData, title: undefined }
        mockedAxios.get.mockResolvedValue({ data: badData })
        try{ 
            await getFilm()
        } catch(e){
            expect(e).toBeInstanceOf(FilmValidationError)
        }
        expect.assertions(1)
    })
})

