import axios from 'axios'

export default abstract class SearchController {

    static searchOrtskuerzel = async (searchValue: string) => {
        return await sendRequest(`http://localhost:8081/ortskuerzel/` + searchValue)
    }

    static searchLandkreis = async (searchValue: string) => {
        return await sendRequest(`http://localhost:8081/landkreis/` + searchValue)
    }

    static searchBundesland = async (searchValue: string) => {
        return await sendRequest(`http://localhost:8081/bundesland/` + searchValue)
    }

    static searchUrsprung = async (searchValue: string) => {
        return await sendRequest(`http://localhost:8081/ursprung/` + searchValue)
    }

}

function sendRequest(URL: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get(URL).then(res => resolve(res))
    })
}
