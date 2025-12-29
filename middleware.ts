import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";


export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized:({token,req}) => {
                const {pathname}= req.nextUrl;

                //allow the requests if the following is true
                if(
                    pathname.startsWith("/api/auth") ||
                    pathname==="/login" ||
                    pathname==="/register"  
                ){
                    return true;
                }
                
                //public

                if(pathname === "/" || pathname.startsWith("/api/videos ")){
                    return true;
            }
            return !!token;


        }
        }    }
)
export const config = {
    matcher: ["/((?!api/auth|login|register|static|favicon.ico).*)"],
}

