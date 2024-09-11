const gerUsers = async () => {
   try {
       const response: Response = await fetch('http://localhost:3002/users');
       if (!response.ok) {
           throw new Error(response.statusText);
       }
       return await response.json()
   } catch (error) {
       throw new Error(`Failed to get users: ${error}`);
   }
}

export default gerUsers;