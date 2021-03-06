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
            <li key={comment.id}>
              {comment.status === "approved" ? (
                comment.content
              ) : comment.status === "pending" ? (
                "This comment is awaiting moderation"
              ) : (
                <span style={{ color: "red" }}>
                  This comment has been rejected{" "}
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;
