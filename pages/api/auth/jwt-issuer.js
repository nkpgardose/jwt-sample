import jsonwebtoken from "jsonwebtoken";
import fs from 'fs'

/**
 * READ: 
 * https://auth0.com/resources/ebooks/jwt-handbook/
 * https://hackernoon.com/json-web-tokens-jwt-demystified-f7e202249640
 * 
 * NOTE: you should have a dedicated application for this auth service with
 * proper security setup. This is only for the sake of demonstration.
 */
export default function handler(_req, res) {
	const secret = fs.readFileSync('./certs/private.pem');
	const options = {
		expiresIn: '1h',
		algorithm: 'RS256'
	}

	const token = jsonwebtoken.sign(
		{},
		secret,
		options,
	)

	res.status(200).json({ token })
}
