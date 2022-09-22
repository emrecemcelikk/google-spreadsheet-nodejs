const { GoogleSpreadsheet } = require('google-spreadsheet')
// const service_account = require('../../service-account.json')
require('dotenv').config()
const doc = new GoogleSpreadsheet(process.env.DOC_ID)

authDoc = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.PRIVATE_KEY
    })
    await doc.loadInfo()
  } catch (error) {
    console.log('error', error)
  }
}

addRowBySheetID = (sheetID, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sheet = doc.sheetsById[sheetID]
      if (sheet) {
        const resp = await sheet.addRow(data.tags)
        resolve(true)
      }
    } catch (error) {
      console.log('error: ', error);
      reject(false)
    }
  })
}

getRowsBySheetID = (sheetID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sheet = doc.sheetsById[sheetID]
      if (sheet) {
        const rows = await sheet.getRows()
        const headerRow = await rows[0]._sheet.headerValues
        let temp = [];
        rows.map((r) => {
          let _temp = {}
          headerRow.map((e, i) => {
            const obj = {
              [e]: r._rawData[i]
            }
            Object.assign(_temp, obj)
          })
          temp.push(_temp)
        })
        resolve(temp)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
      console.log(error)
    }
  })
}

module.exports = {
  authDoc,
  getRowsBySheetID,
  addRowBySheetID,
}