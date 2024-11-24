import React from 'react'

function Progress({numQuestions, index}) {
  return (
    <header className='progress'>
        <p>Question <strong>{index+1}</strong> / {numQuestions}</p>
    </header>
  )
}

export default Progress
