import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = ({ allPosts, setClickedUserPosts, currentUser }) => {

    let navigate = useNavigate();
    let path = "/userPosts";


    const handleClick = (e) => {

        if (+e.target.id === currentUser.user_id) {
            return navigate('/myPosts')
        }

        fetchClickedUserPosts(e.target.id)
    }

    const fetchClickedUserPosts = async (id) => {
        try {
            let res = await fetch(`/api/posts/${id}`)
            let data = await res.json()
            navigate(path)
            return setClickedUserPosts(() => {
                return data
            })
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>

            {
                allPosts.map((post) => (
                    <div className='indivPostDiv' key={post.post_id} id={post.user_id} onClick={handleClick}>
                        <p className='postUsername' id={post.user_id}>@{post.user_name}</p>
                        <p className="post" id={post.user_id}> * {post.post_content}</p>
                    </div>
                ))
            }

        </>
    )
}

export default Home