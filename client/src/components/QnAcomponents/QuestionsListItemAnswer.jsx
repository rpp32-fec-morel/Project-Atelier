import React from 'react';

const QuestionsListItemAnswer = (props) => (
  <div className='answer-item'>
    {console.log(props.answer)}
    <div className='answer-item-a-letter'><h2>A:</h2></div>
    <div className='answer-item-body'><h3>{props.answer.body}</h3></div>
    <div className='answer-item-username'>By user {props.answer.answerer_name}</div><div className='answer-item-date'>{props.answer.date}</div>
    <div className='answer-item-photos'></div>
    <div className='answer-item-helpful-keyword'>Helpful?</div>
    <div className='answer-item-yes-button'>Yes({props.answer.helpfulness})</div>
    <div className='answer-item-report-button'>Report</div>
  </div>
)

export default QuestionsListItemAnswer;