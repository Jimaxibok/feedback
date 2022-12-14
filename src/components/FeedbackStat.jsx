// import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStat() {
    //  Calculate ratings avg
    
   const { feedback } = useContext(FeedbackContext)

    let average = feedback.reduce((acc, current) => {
        return acc + current.rating
    }, 0) / feedback.length
    
        average = average.toFixed(1).replace(/[.,]0$/, '')
    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}
// FeedbackStat.propTypes = {
//     feedback: PropTypes.array.isRequired
// }

export default FeedbackStat
