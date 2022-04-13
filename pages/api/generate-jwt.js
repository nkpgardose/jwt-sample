import jsonwebtoken from "jsonwebtoken";

/**
 *	NOTE: This is an example only.
 *	Do not do this in production.
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
	 * NOTE: In a sync mode because 4th param(callback) is not present.
	 */
	try {
		const token = jsonwebtoken.sign(
			payload,
			secretKey,
			options,
		)

		res.status(200).json({ token })
	} catch(err) {
		res.status(500).json({
			name: err.name,
			message: err.message,
		})
	}
}
