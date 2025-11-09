const env = {
    appwriteEndpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URI),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.NEXT_API_KEY),
}
export default env