"use client"
import { useAuthStore } from '@/store/Auth'
import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

function RegisterPage() {
    const {createAccount,login} = useAuthStore();
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState("");

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        //collect data
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

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
            setIsLoading(false);
        } else {
            const loginResponse = await login(email as string,password as string);
            
            if (loginResponse.error) {
                setError(()=> loginResponse.error!.message);
                setIsLoading(false);
            } else {
                router.push('/')
            }
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-black">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <h1 className="text-4xl font-bold mb-2">
                  <span className="text-primary">Dev</span>
                  <span className="text-white">QnA</span>
                </h1>
              </Link>
              <p className="text-gray-400">Join our developer community</p>
            </div>

            <Card className="p-8 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-white/10">
                <h1 className="text-2xl font-semibold mb-1 text-white">Create an account</h1>
                <p className="text-sm mb-6 text-gray-400">Start your journey with a free account</p>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <InputWithIcon 
                          id="name" 
                          name="name" 
                          type="text" 
                          required 
                          placeholder="John Doe"
                          icon={
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          } 
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <InputWithIcon 
                          id="email" 
                          name="email" 
                          type="email" 
                          required 
                          placeholder="you@example.com"
                          icon={
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 8.5l9 6 9-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          } 
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <InputWithIcon 
                          id="password" 
                          name="password" 
                          type="password" 
                          required 
                          placeholder="••••••••"
                          icon={
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M7 11V8a5 5 0 0 1 10 0v3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          } 
                        />
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Spinner size="sm" />
                              Creating account...
                            </span>
                          ) : (
                            'Create Account'
                          )}
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-sm text-center text-gray-400">
                  <span>Already have an account? </span>
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
            </Card>
          </div>
        </div>
    )
}

export default RegisterPage