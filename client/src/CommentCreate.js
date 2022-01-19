import React, { useState } from "react";
import Axios from "axios";

const CommentCreate = ({ id }) => {
  const [input, setInput] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await Axios.post(`http://posts.com/posts/${id}/comments`, {
      content: input,
    });

    setInput("");
  };

  return (
    <div>
      <form className="form-group" onSubmit={submitHandler}>
        <div>
          <label>New Comment</label>
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button className="btn btn-sm btn-secondary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
