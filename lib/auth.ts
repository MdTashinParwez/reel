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
                throw new Error("Email and password are required.");
            }


            try {
                await connectToDatabase();

                const user = await User.findOne({equals: credentials.email});

                if(!user){
                    throw new Error("No user found with the provided email.");
                }

                const isValid = await bcrypt.compare(credentials.password,user.password);

                if(!isValid){
                    throw new Error("Invalid password.");
                }


                return {id: user._id.toString(),
                    email: user.email,
                } ;
                
            } catch (error) {
                console.error("Authorize error:", error);
                throw new Error("Failed to authorize user.");
                
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