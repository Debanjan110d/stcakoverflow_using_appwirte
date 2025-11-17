"use client"
import { useAuthStore } from '@/store/Auth'

import React, { FormEvent, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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
        <div className="max-w-md mx-auto p-4">
            {error && <p className="text-sm text-destructive mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" type="text" required />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                        {isLoading ? 'Registering…' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage