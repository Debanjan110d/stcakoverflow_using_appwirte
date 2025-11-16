import { useAuthStore } from '@/store/Auth'
import React,{useState} from 'react'

function LoginPage() {
    const {login} = useAuthStore()
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(" "); 

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //collect data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    //validation
    if (!email || !password) {
        setError("Please fill in all the fields");
        setIsLoading(false);
        return;
    }

    setError("");
    setIsLoading(true);
    
    //login =>store
    const response = await login(email as string, password as string);
    if (response.error) {
        setError(response.error.message);
        setIsLoading(false);
        return;
    }

    console.log(response); //! Not recomended for production
    setIsLoading(false);
}
    
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage