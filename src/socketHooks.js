import { useEffect } from "react";
import { useSocketContext } from "./Context/socketContext"; // Ensure the correct import path
import ringSound from "../src/asset/sound/mixkit-correct-answer-tone-2870.wav";
const useListenCommentAndLike = (setFullBlog) => {
  const { socket } = useSocketContext(); 
  useEffect(() => {
    if (socket) {
     
      socket.on("newComment", (newComment) => {
        
        const sound = new Audio(ringSound);
        sound.play();
        setFullBlog((prevState) => ({
          ...prevState,
          comments: [...prevState.comments, newComment], 
        }));
      });

      
      socket.on("newLike", (newLike) => {
        console.log("New like received:", newLike);

        
        setFullBlog((prevState) => ({
          ...prevState,
          like: Array.isArray(prevState.like)
            ? [...prevState.like, newLike]
            : [newLike], 
        }));

        
        new Audio(ringSound).play();
      });
      // Cleanup function
      return () => {
        socket.off("newComment");
        socket.off("newLike");
      };
    }
  }, [socket, setFullBlog]);
};

export default useListenCommentAndLike;
