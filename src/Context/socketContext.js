import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { auth } = useAuthContext();

    useEffect(() => {
        if (auth) {
            console.log("Auth Found", auth);

            // Close previous socket if it exists
            if (socket) {
                console.log("Disconnecting previous socket:", socket.id);
                socket.disconnect();
            }

            // Create new socket connection
            const newSocket = io("http://localhost:8000", {
                query: {
                    userId: auth.id,
                },
                transports: ["websocket"], // Ensuring websocket transport
            });

            // Set the new socket instance
            setSocket(newSocket);

            // Cleanup function to disconnect socket when auth changes or component unmounts
            return () => {
                if (newSocket) {
                    console.log("Disconnecting Socket", newSocket.id);
                    newSocket.disconnect();
                }
            };
        }
    }, [auth]); // Runs only when `auth` changes

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
