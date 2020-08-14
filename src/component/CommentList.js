import React, { useState, useEffect } from 'react';
import { dataBase, auth } from '../firebase/utils';

import '../scss/CommentList.scss';

function CommentList({ id }) {
  const [comments, setComments] = useState(null);

  // console.log(comments);
  
  useEffect(() => {
    const commentsData = dataBase.ref(`comments/${id}`);
    commentsData.on('value', function (snapshot) {
      setComments(snapshot.val());
    });
  }, [id]);

  function deleteComment(e, commentId) {
    const commentsData = dataBase.ref(`comments/${id}/${commentId}`);
    commentsData.remove();
  }

  return (
    <ul className="comment-list">
      {comments === null ? (
        <li>Please add comments.</li>
      ) : (
          Object.entries(comments).map((comment, i) => (
            <li className="comment" key={i}>
              {
                ( auth.currentUser.email === comment[1].email ) && (
                  <button type="button" 
                  className="comment__btn" 
                  onClick={(e) => deleteComment(e, comment[0])}>Delete</button>)
              }
              <div className="comment__header">
                <span className="comment__img">
                  {comment[1].userName.substring(0, 1)}
                </span>
                <div>
                  <span className="comment__name">{comment[1].userName}</span>
                  <span className="comment__date">{comment[1].date}</span>
                </div>
              </div>
              <p className="comment__p">{comment[1].text}</p>
            </li>
          ))
        )}
    </ul>
  );
}

export default CommentList;