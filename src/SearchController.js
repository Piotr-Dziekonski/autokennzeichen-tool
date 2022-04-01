import axios from 'axios'

export default class SearchController {

    static searchOrtskuerzel = async (searchValue) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8081/ortskuerzel/` + searchValue).then(res => resolve(res))
        })
    }

    static searchLandkreis = async (searchValue) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8081/landkreis/` + searchValue).then(res => resolve(res))
        })
    }

    static searchBundesland = async (searchValue) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8081/bundesland/` + searchValue).then(res => resolve(res))
        })
    }

    static searchUrsprung = async (searchValue) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8081/ursprung/` + searchValue).then(res => resolve(res))
        })
    }

}