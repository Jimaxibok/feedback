import { createContext, useState, useEffect } from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState (true)
    const [feedback, setFeedback] = useState ([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false
    
    })

    useEffect (() => {
        // const getFeedbacks = async () => {
        //     const feedbackFromServer = await fetchFeedback()
        //     setFeedback(feedbackFromServer)
        // }
        // getFeedbacks()

        // OR 
        fetchFeedback()
    }, [])

    //  Fetch Feedback data
    const fetchFeedback = async () => {
        const res = await fetch ('/feedback?_sort=id&_order=desc')
        const data = await res.json()

        setFeedback(data)
        setIsLoading(false)
    }

    //  To Add feedback

    const addFeedback = async (newFeedback) => {
    const res = await fetch ('/feedback',
     {  method: 'POST', 
        headers: { 'Content-Type': 'application/json',
    },
        body: JSON.stringify(newFeedback),
    })
        const data = await res.json()
       setFeedback([data, ...feedback])
    }
    
        // Delete feedback
    const deleteFeedback = async (id) => {  
        if(window.confirm('Are you sure you want to delete? ')){
            await fetch (`/feedback/${id}`, {
                method: 'DELETE'
            })
            setFeedback(feedback.filter((item) => item.id !== id)) 
        }
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // update feedback item
    const updateFeedback = async (id, updItem) => {
        const res = await fetch (`/feedback/${id}`,
     {  method: 'PUT', 
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(updItem),
    })
        const data = await res.json()
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item

        ))
    }

    return (
    <FeedbackContext.Provider value = {{
        feedback, 
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
    )
}

export default FeedbackContext