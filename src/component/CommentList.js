import React, { useState, useEffect } from 'react';
import { dataBase } from '../firebase/utils';

import '../scss/CommentList.scss';

function CommentList({ id }) {

  const [comments, setComments] = useState(null);
  const commentsData = dataBase.ref(`comments/id${id}`);


  useEffect(() => {
    commentsData.on('value', function (snapshot) {
      setComments(snapshot.val());
    });
  }, []);

  return (
    <ul className="comment-list">
      {comments === null ? (
        <li>로딩중</li>
      ) : (
        Object.values(comments).map((comment, i) => (
          <li className="comment" key={i}>
            <div className="comment__box">
              <div className="comment__header">
                <span className="comment__img">
                  { comment.userName.substring(0, 1) }
                </span>
                <div>
                  <span className="comment__name">{ comment.userName }</span>
                  <span className="comment__date">{ comment.date }</span>
                </div>
              </div>
              <p className="comment__p">{ comment.text }</p>
              <div className="comment__utils">
                <span>추천: { comment.like === undefined ?
                  0 : (comment.like) }</span>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default CommentList;
