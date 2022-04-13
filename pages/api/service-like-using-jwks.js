import jsonwebtoken from "jsonwebtoken"
import jwksClient from 'jwks-rsa'
import { parseBearer } from "./verify-jwt"

/**
 * NOTE: Imagine this is a server application instead of normal api function.
 * READ: https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
 * https://datatracker.ietf.org/doc/html/rfc7515#section-4.1
 * 
 * The JWK contains the certificate in addition to other claims about the key.
 * This information is useful for applications and servers.
 */
export default async function handler(req, res) {
	const token = parseBearer(req.headers.authorization)
  const options = {
		algorithms: ['RS256']
	}
  const client = jwksClient({
    jwksUri: 'http://localhost:3000/.well-known/jwks.json'
  });

  try {
    const key = await client.getSigningKey();
    const signingKey = key.getPublicKey();
    const payload = jsonwebtoken.verify(token, signingKey, options);

		console.log(payload)
		res.status(200).json({ result: 'Verified!'})
  } catch(err) {
		res.status(500).json({
			name: err.name,
			message: err.message,
		})
  }
}
