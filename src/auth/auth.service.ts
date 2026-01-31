import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'; 
import { PrismaClientExtends } from "@prisma/client/extension";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";

@Injectable()
export class AuthService{
    constructor(private prisma : PrismaService){ }

    async signup(dto : AuthDto){
        try{
            //generate the password hash
            const hash =  await argon.hash(dto.password);
            //save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email : dto.email,
                    hash,
                },
            })

            const { hash: _, ...result } = user;
            
            //returned the saved user 
            return result;

        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("Credentials taken"); 
                };
            }
            throw error;
        }
    }

    async signin(dto : AuthDto) {
        //find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email : dto.email
            }
        })
        //if user do not exits throw exception
         if (!user) throw new ForbiddenException(
                 'Credentials incorrect'
            );
        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password);
        //if password incorrect throw exception
        if (!pwMatches) throw new  ForbiddenException(
            'Credentials incorrect'
        );
        //send back the user  
        const {hash : _, ...result} = user;
        
        return result; 
    }

    
}