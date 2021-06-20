import React from "react";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState({});

  // const getComments = async () => {
  //   const res = await Axios.get(`http://localhost:4001/posts/${id}/comments`);
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   getComments();
  // }, []);

  return (
    <div>
      <p>{comments && <span>{comments.length + " Comments"}</span>}</p>
      <ul className="">
        {comments &&
          Object.values(comments).map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;
