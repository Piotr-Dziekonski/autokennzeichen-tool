import axios from 'axios'

export default class ImportExportController {

  static addNewLicensePlate = async (ortskuerzel, ursprung, landkreis, bundesland) => {
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

  static upload = async (inputRef, url) => {
    return new Promise((resolve, reject) => {
        if(!inputRef.current?.files) reject("File not found")

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          }
        }
        const formData = new FormData();

        formData.append('uploadedFile', inputRef.current.files[0], {
          type: "application/json"
      });

        axios.post(url, formData, config).then(response => resolve(response), reason => reject(reason))
    })
  }
  static handleExport = async (expectedResponseType) => new Promise((resolve, reject) => {

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

      const blob = new Blob([responseData]);

      resolve(blob)
    }, reason => reject(reason))
  })
}