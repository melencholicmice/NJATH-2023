import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (userData) => {

        const config = {
            withCredentials: true,
        };

        try {

            const response = await axios.post(
                loginApiUrl,
                userData,
                config
            );

            if (response.status === 400) {
                toast.error("Login Failed! wrong credentials")
            }
            else if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success("Login Successful!");
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Login Failed! please enter correct password and email");
        }

    };

    const logout = () => {
        // Your logout logic
        setUser(null);
        setIsLoggedIn(false);
    };

    const authValues = {
        user,
        isLoggedIn, // Indicate the login status
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};
