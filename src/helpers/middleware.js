const { getRowsBySheetID, addRowBySheetID } = require("./spreadSheet")

const auth = (req, res, next) => {
  const { headers } = req
  if (headers.authorization !== "monkeysteam") {
    res.status(401).send({
      done: false,
      error: 'wrong credentials'
    })
  } else {
    next()
  }
}

const getRows = async (req, res, next) => {
  const { sheet_id } = req.params
  const rows = await getRowsBySheetID(sheet_id)
  if (rows) {
    req['rows'] = rows
    next()
  } else {
    res.status(400).send({ done: false, error: 'something went wrong' })
  }
}

const addRow = async (req, res, next) => {
  const { sheet_id } = req.params
  const { body } = req
  const resp = await addRowBySheetID(sheet_id, body)
  if (resp) {
    req['done'] = resp
    next()
  } else {
    res.status(400).send({ done: false, error: 'something went wrong' })
  }
}

module.exports = {
  auth,
  getRows,
  addRow,
}