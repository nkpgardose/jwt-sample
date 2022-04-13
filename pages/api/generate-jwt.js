import jsonwebtoken from "jsonwebtoken";

/**
 *	NOTE: This is an example only.
 *	Do not do this in production.
*/
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {
	const secretKey = 'secret-shh'
	const payload =  {
		foo: 'bar',
		company: 'domain',
		hello: 'world'
	}
	const options = {
		expiresIn: '1h',
		algorithm: 'HS256' // default "HS256"
	}

	/**
	 * @param {*} payload - object literal, buffer or string representing valid JSON
	 * @param {*} secretOrPrivateKey - is a string, buffer, or object containing
	 *  either the secret for HMAC algorithms or the PEM encoded private key for
	 *  RSA and ECDSA.
	 * @param {*} options - expiresIn, algorithm, audience.
	 */
	jsonwebtoken.sign(
		payload,
		secretKey,
		options,
		(_err, token) => {
			console.log(token)
			res.status(200).json({ token })
		}
	)
}
