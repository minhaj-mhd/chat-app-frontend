// Function to get the token from cookies
const getTokenFromCookies = () => {
    const tokenCookie = document.cookie.split("; ").find(row => row.startsWith('token='));
    if (tokenCookie) {
        return tokenCookie.split("=")[1]; // Return the token value

    }
    console.log("tokenCookie",tokenCookie)

    return null; // Return null if the token does not exist
};
export default getTokenFromCookies