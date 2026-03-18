import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";

export const authOptions : NextAuthOptions ={
    providers: [CredentialProvider({
        name: "Credentials",
        credentials:{
            email: {label: "Email", type: "text", placeholder: "your email"},
            password: {label: "Password", type: "password", placeholder: "your password"},
            
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error("kya kar rhe ho bhai email aur password dono do");
            } 

 
            try {
                await connectToDatabase();

                const user = await User.findOne({email: credentials.email});

                if(!user){
                    throw new Error("mere bhai email galat hai aise hi try mat krte raho");
                }

                const isValid = await bcrypt.compare(credentials.password,user.password);

                if(!isValid){
                    throw new Error("Kyu request bhda rhe ho password galat hai dimg kharab krne ki koshish mat kro");
                }


                return {id: user._id.toString(),
                    email: user.email,
                } ;
                
            } catch (error) {
                console.error("Authorize error:", error);
                throw new Error("oh no kya kar rhe ho bhai, kuch to gadbad hai");
                
            }
        }
    }),
],

callbacks:{    // next js automatically call kr ta h 
    async jwt({token,user}){
        if(user){
            token.id = user.id;
        }
        return token;
    },


    //session callback tab chalta hai:
     //jab frontend pe useSession() call hota hai
    async session({session, token}){

        if(session.user){
            session.user.id = token.id as string;
        }
        return session
    }
}, 
pages: {
  signIn:"/login",
  error : "/login",

},
session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
},
secret: process.env.NEXTAUTH_SECRET,


} ;