import { useAuthStore } from '@/store/Auth'
import { LogIn } from 'lucide-react';
import React, { FormEvent, useState } from 'react'

function RegisterPage() {
    const {createAccount,login} = useAuthStore();
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(" ");


    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        //collect data
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
;

        //validation
        if(!email || !password || !name){
            setError('Please fill in all the fields');
            setIsLoading(false);
            return;
        }

        //call the store
        setIsLoading(true);
        setError("");


        const response = await createAccount(email as string,password as string,name as string);
        if (response.error) {
            setError(()=> response.error!.message);
            
        } else {
            const loginResponse = await login(email as string,password as string);
            
            if (loginResponse.error) {
                setError(()=> loginResponse.error!.message);
            }
        }
        setIsLoading(()=> false);

    }
    
    return (
        <div>
            {error && (
                <p>{error}</p>)
                }

                <form onSubmit={handleSubmit}>
                </form>
        </div>
    )
}

export default RegisterPage