const fs = require('fs')
const rsaPemToJwk = require('rsa-pem-to-jwk')

const convert = () => {
	const secret = fs.readFileSync('./certs/private.pem');
	const jwk = rsaPemToJwk(secret, { use: 'sig'}, 'public')
	console.log(jwk)
}

convert()