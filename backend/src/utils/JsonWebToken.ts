import jwt, { Secret, JwtPayload } from "jsonwebtoken";

export async function verifyJwt(token: string) {
	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY as Secret,
			(error, decoded) => {
				if (error) return "error";
				return decoded;
			}
		);
		return payload;
	} catch (error) {
		console.log("token verify failed");
		return "error";
	}
}

export function issueJwt(payload: any, duration: string) {
	const signed_jwt = jwt.sign(payload, process.env.JWT_SECRET_KEY as Secret, {
		expiresIn: duration,
	});
	return signed_jwt;
}
