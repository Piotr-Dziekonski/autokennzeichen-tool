import axios from 'axios'
import { RefObject } from 'react'

export default class ImportExportController {

  static addNewLicensePlate = async (ortskuerzel: string, ursprung: string, landkreis: string, bundesland: string) => {
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:8081/addLicensePlate/${ortskuerzel}/${ursprung}/${landkreis}/${bundesland}/`)
      .then(res => resolve(res))
    })
  }

  static getDbContent = async () => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:8081/`)
      .then(res => resolve(res))
    })
  }

  static upload = async (inputRef: RefObject<HTMLInputElement>, url: string) => {
    return new Promise((resolve, reject) => {
      if (!inputRef.current?.files) return reject("File not found")
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
      const formData = new FormData();
      
      formData.append('uploadedFile', inputRef.current?.files[0])

      axios.post(url, formData, config).then(response => resolve(response), reason => reject(reason))
    })
  }
  static handleExport = async (expectedResponseType: string) => new Promise((resolve, reject) => {

    const config = {
      headers: {
        "Requested-Type": expectedResponseType,
      }
    }

    axios.get('http://localhost:8081/export', config).then(response => {
      
      const responseType = response.headers['content-type']
      let responseData = response.data;   

      if (responseType === 'application/json') {
        responseData = JSON.stringify(response.data, null, 2)
      }

      const blob = new Blob([responseData], {
        type: responseType
      });

      resolve(blob)
    }, reason => reject(reason))
  })
}