import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import './MovieComments.css';

const useSaveComment = () => {
  const [commentCreationError, setCommentCreationError] = useState(null);

  const saveComment = (
    event,
    formValues,
    setFormValues,
    DEFAULT_FORM_VALUES,
    cookies
  ) => {
    event.preventDefault();

    if (formValues.mark === '') {
      setCommentCreationError('mark cannot be empty');

      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/movies/addComment`,
        formValues,
        { headers: { authorization: cookies.userId + ' ' + cookies.token } }
      )
      .then(() => {
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setCommentCreationError('Could not add comment');
        console.log(error);
      });
  };

  return { saveComment, commentCreationError };
};

const getComments = function (movie_id, setComments) {
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/movies/getComments?movie_id=${movie_id}`
    )
    .then((response) => {
      setComments(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

function MovieComments(props) {
  const [cookies, setCookie, removeCookie] = useCookies();

  const DEFAULT_FORM_VALUES = {
    comment: '',
    mark: '0',
    user_id: cookies.userId,
    movie_id: props.movie.id,
  };

  const [comments, setComments] = useState([]);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveComment, commentCreationError } = useSaveComment();

  useEffect(() => {
    getComments(props.movie.id, setComments);
  }, [props.movie.id]);

  return (
    <div className="comment-section">
      <div className="comments-container">
        {comments.map((c) => (
          <div className="comment" key={c.user_id}>
            <div className="comment-name">{c.firstname + ' ' + c.lastname}</div>
            <div className="comment-score">Score : {c.mark}</div>
            <div className="comment-text">{c.text}</div>
          </div>
        ))}
      </div>
      <form
        className="add-comment-form"
        onSubmit={(event) => {
          saveComment(
            event,
            formValues,
            setFormValues,
            DEFAULT_FORM_VALUES,
            cookies
          );
          getComments(props.movie.id, setComments);
        }}
      >
        <div className="fields-comment-form">
          <div className="score-comment-form">
            <span className="score-comment-label">Score : </span>
            <select
              className="score-comment-select"
              name="mark"
              value={formValues.mark}
              onChange={(event) =>
                setFormValues({ ...formValues, mark: event.target.value })
              }
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <textarea
            className="comment-textarea"
            placeholder="comment"
            value={formValues.comment}
            onChange={(event) =>
              setFormValues({ ...formValues, comment: event.target.value })
            }
          ></textarea>
        </div>
        <button className="submit-comment" type="submit">
          Send
        </button>

        <input type="hidden" value={formValues.movie_id}></input>
        <input type="hidden" value={formValues.user_id}></input>
      </form>
    </div>
  );
}

export default MovieComments;
