import React, { useState, useEffect } from "react";
import IndividualPost from "./IndividualPost.js"
import UpdatePostModal from './UpdatePostModal'

const MyPosts = ({ currentUser, allPosts, setAllPosts }) => {

    useEffect(() => {
        fetchCurrentUserPosts()
    }, [allPosts.length])

    const [myPosts, setMyPosts] = useState([])
    const [postToUpdate, setPostToUpdate] = useState(null)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

    useEffect(() => {
        checkIfPostToUpdateIsAvail()
    }, [postToUpdate])

    const checkIfPostToUpdateIsAvail = () => {
        if (postToUpdate) { return setShowUpdatePostModal(true) }
    }

    const fetchCurrentUserPosts = async () => {
        try {
            let res = await fetch(`http://localhost:8000/api/posts/${currentUser.user_id}`)
            let data = await res.json()
            return setMyPosts(() => {
                return data
            })
        } catch (error) {

        }
    }
    return (

        <div className="myPostsContainer">
            {showUpdatePostModal ? <UpdatePostModal postToUpdate={postToUpdate} setAllPosts={setAllPosts} setShowUpdatePostModal={setShowUpdatePostModal} /> : null}

            <IndividualPost myPosts={myPosts} setAllPosts={setAllPosts} setShowUpdatePostModal={setShowUpdatePostModal} setPostToUpdate={setPostToUpdate} />
        </div>
    )
}

export default MyPosts