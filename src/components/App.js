import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Main from './Main';
import Error from './Error';
import Ready from "./Ready";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null, // Default value is null
  };
  

function reducer(state, action) {
    switch (action.type) {
      case 'datarecieved':
        return {
          ...state,
          questions: action.payload,
          status: "ready",
          answer: null, // Ensure `answer` stays initialized
        };
      case 'dataFailed':
        return {
          ...state,
          status: "error",
          answer: null, // Ensure `answer` is reset
        };
      case 'start':
        return { ...state, status: "active", answer: null };
      case 'newAnswer':
        const question=state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption ? state.points+question.points:state.points, // Update `answer` when a new answer is provided

        };
        case 'nextQuestion':
            return {...state, index:state.index+1, answer:null};
        case 'end':
            return{...state, status: "end"}
      default:
        throw new Error("Action unknown");
    }
  }
  
export default function App(){
    const [{questions, status, index, answer}, dispatch]=useReducer(reducer, initialState);
    useEffect(function(){
    fetch('http://localhost:8000/questions')
  .then((res) => res.json())
  .then((data) => dispatch({ type: 'datarecieved', payload: data }))
  .catch((err) => dispatch({ type: 'dataFailed' }));
    }, [])

    const numQuestions=questions.length;
    return (
        <div className="app">
          <Header />
          <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <Ready numQuestions={numQuestions} dispatch={dispatch} />}
            {status === 'active' && <>
            <Progress index={index} numQuestions={numQuestions} />
             <Questions question={questions[index]} dispatch={dispatch} answer={answer} />  <NextButton dispatch={dispatch} numQuestions={numQuestions} index={index} /></>}
           {status === 'end' && <finished />}
            </Main>
        </div>
      );
    }