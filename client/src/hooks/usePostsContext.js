import { useContext } from "react";
import { PostsContext } from "../context/postsContext";

const usePostsContext = () => {
    const context = useContext(PostsContext);

    if (!context) {
        throw Error("useWorkoutContext must be used inside a WorkoutContext Provider");
    }

    return context;
}

export default usePostsContext;