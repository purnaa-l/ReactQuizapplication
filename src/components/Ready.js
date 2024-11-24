import React from 'react'

function Ready({numQuestions, dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} question to test your React Mastery</h3>
        <button className='btn btn-ui'
        onClick={()=>dispatch({type: "start"})}>Let's Begin</button>
      
    </div>
  )
}

export default Ready
