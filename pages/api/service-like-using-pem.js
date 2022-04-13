import jsonwebtoken from "jsonwebtoken";
import { parseBearer } from "./verify-jwt"
import fs from 'fs'

/**
 * NOTE: Imagine this is a server application instead of normal api function.
 * READ: https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
 * 
 * This is a convenient way for a human to retrieve a public key for use with
 * the JWT.io token debugger.
 */
 export default function handler(req, res) {
	const cert = fs.readFileSync('./certs/public.pem')
	const options = {
		algorithms: ['RS256']
	}
	const token = parseBearer(req.headers.authorization)

	try {
		const payload = jsonwebtoken.verify(token, cert, options)

		console.log(payload)
		res.status(200).json({ result: 'Verified!'})
	} catch(err) {
		res.status(500).json({
			name: err.name,
			message: err.message,
		})
	}
}
