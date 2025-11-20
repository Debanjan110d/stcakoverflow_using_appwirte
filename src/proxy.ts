import { NextResponse, NextRequest } from 'next/server'
// Now lets import database 
import createDB from './models/server/dbSetup'
import createQuestionAttachmentBucket from './models/server/storageSetup'



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {// This fucntion run everywhere you want 

    // DISABLED: Database setup should only run once, not on every page load
    // This was causing massive console logs and slow page loads
    // Run npm run setup-db manually if you need to setup the database
    
    // await Promise.all(
    //     [
    //         createDB(),
    //         createQuestionAttachmentBucket()
    //     ]
    // )
    
return NextResponse.next()// It passes it to the next proxy or keep on doing its own stuff


}

export const config = {

 // Whatever path we are matching iur proxy code will not run there
  // So my code should not run on these cases : api , _next/static, next/image , favicon.com
   matcher: [ // Now we will use a litte bit of ai cause I am lazy and not good with these paths in regex

    '/((?!api/|_next/static/|_next/image/|favicon.ico).*)' // Got from chatGpt
   ],
}

