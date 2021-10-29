import axios from "axios";
import cookie from "js-cookie";
import { serialize } from "cookie";

import { useState, useContext, createContext, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	console.log(cookie.get("user"));
	const [user, setUser] = useState(
		(typeof cookie.get("user") !== "undefined" &&
			JSON.parse(cookie.get("user"))) ||
			null,
	);

	const [token, setToken] = useState(
		(typeof cookie.get("user") !== "undefined" &&
			JSON.parse(cookie.get("token"))) ||
			null,
	);

	async function signin(Data) {
		try {
			const req = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/login/`,
				Data,
			);

			cookie.set("user", JSON.stringify(req.data.user), { expires: 365 });
			cookie.set("token", JSON.stringify(req.data.token), { expires: 365 });
			setUser(req.data.user);
			setToken(req.data.token);
		} catch (error) {
			console.err(error);
		}
	}

	async function signup(Data) {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register/`, Data);
		} catch (error) {
			console.err(error);
		}
	}

	function signout() {
		cookie.remove("user"); // Remove user from cookies
		cookie.remove("token"); // Remove token from cookies
		setToken(null); // Remove token
		setUser(null); // Remove user
	}

	const value = {
		signin,
		signup,
		signout,
		user,
		setUser,
		token,
		setToken,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export async function GetNewToken(refreshToken, oldTokens, responseFromServer) {
	const NewToken = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`,
		{ refresh: refreshToken },
	);

	const newTokens = JSON.stringify({
		...oldTokens,
		access: NewToken.data.access,
	});

	responseFromServer.setHeader(
		"Set-Cookie",
		serialize("token", newTokens, {
			maxAge: Math.pow(60, 4), // 12.960.000 Sec / 150 Day
			path: "/",
			secure: process.env.NODE_ENV === "production",
		}),
	);
}
