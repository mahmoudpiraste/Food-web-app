import { NextResponse } from "next/server"

export default async function middleware(req, res) {

    const login_token = req.cookies.get('login_token');

    if (!login_token && !req.nextUrl.pathname == '/auth/login') {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`);
    }
    if (login_token && req.nextUrl.pathname == '/auth/login') {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
    }
    return NextResponse.next();
}