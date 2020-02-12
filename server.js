'use strict'

const express = require('express')
const cors = require('cors')

// require and use "multer"...
const multer = require('multer')
const upload = multer({ limits: { fileSize: 500000 } })

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html')
})

// api endpoint for handling the file upload and sending metadata response
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	const file = req.file
	let { originalname: name, mimetype: type, size } = file

	res.json({ name, type, size })
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Node.js listening ...')
})
