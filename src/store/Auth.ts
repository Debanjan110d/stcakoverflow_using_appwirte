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

interface MyAuthStore {
    session: Models.Session | null;// This is given by the appwrite itslf
    jwt : string | null;
    user : Models.User<UserPrefs> | null;
    hydrated: boolean;//it will depend on zustand 
    
}

