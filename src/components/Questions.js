import React from 'react'
import Options from './Options';
function Questions({question, dispatch, answer}) {
    console.log(question);
  return (
    <div>
        <h4>{question.question}</h4>
       <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  )
}

export default Questions
