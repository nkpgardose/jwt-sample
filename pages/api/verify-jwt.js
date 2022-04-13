import jsonwebtoken from "jsonwebtoken";

export const parseBearer = (authorisationValue = '') => {
	if(!authorisationValue) return ''

  const [_, token] = authorisationValue.trim().split(" ");
  return token;
};

export default function handler(req, res) {
	if (req.method === 'POST') {
		const secretKey = 'secret-shh'
		const token = parseBearer(req.headers.authorization)
		const options = {
			algorithms: ['HS256'],
		}

		/** 
		 * NOTE: async way because of 4th param
		 * */
		jsonwebtoken.verify(
			token,
			secretKey,
			options,
			(err, payload) => {
				if(err) {
					res.status(500).json({
						name: err.name,
						message: err.message,
					})

					console.warn(err);
				}

				console.log(payload)
				res.status(200).json({ result: 'Verified!' })
			});
	} else {
		res.status(405).send({ message: 'Only POST requests allowed' })
	}
}
