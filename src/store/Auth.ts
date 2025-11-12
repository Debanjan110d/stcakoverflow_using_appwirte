import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";


import {AppwriteException,ID,Models}  from "appwrite";// since this is going to be login based so we not importing it from the node-appwrite but if you want to add more features then you can import it from node-appwrite
//Some client side configurations
import { account } from "@/models/client/config";


//Lets make user reputaton 

export interface UserPrefs {
    reputation: number;// If you need more preference you can add them easily like light mode / dark mode etc 
    name: string;
    email: string
}

interface MyAuthStore { //? This is a interface ,its comin g up because we are using typescript if we are using hs we do't have to work with these things 
    session: Models.Session | null;// This is given by the appwrite itslf
    jwt : string | null;
    user : Models.User<UserPrefs> | null;
    hydrated: boolean;//it will depend on zustand 
    

    sethydrated():void; // basically it will be true when the user is logged in and false when the user is logged out
    verrifySession(): Promise<void>;
    login(email: string, password: string): Promise<
    {
        sucess : boolean // appwirte 1O1
        error? : AppwriteException | null; // Thre is a chance that there is no errors
    }
    >;
    createAccount(
        name:string,
        email: string,
        password: string,
    ): Promise<
    {
        sucess : boolean 
        error? : AppwriteException | null; 
    }
    >;

    logout(): Promise<void>
    
}

export const useAuthStore = create<MyAuthStore>()( //? the 1st () are initilizing the store and then we are immediately passing on a method onto this one and we will provide everything 
    persist( //* We can go into the docs but I have already studied it on my way home form college so letts continue

        immer(),
        {
            name: "auth",
            onRehydrateStorage:()=>{
                return(state,error)=>{// Here this is a call back and //? zustand provides me with the state so I do not have to explicitly declare it here
                    if (!error) state?.sethydrated()
                }
            }
        }

    )

)

