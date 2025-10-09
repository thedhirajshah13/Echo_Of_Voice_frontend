import  {useContext,createContext, useState} from 'react'

export const blogContentContext =createContext()
export const useBlogContentContex=()=>{
    return useContext(blogContentContext)
}

export const BlogContentProvider=({children})=>{
    const [blogContent, setBlogContent]=useState([])
    const [fullBlog, setfullBlog]=useState();
    return (
        <blogContentContext.Provider value={{blogContent,setBlogContent,fullBlog,setfullBlog}}>{children}</blogContentContext.Provider>
    )

}
