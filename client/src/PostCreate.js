import React, { useState } from "react";
import Axios from "axios";

const PostCreate = () => {
  const [input, setInput] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await Axios.post("http://posts.com/posts/create", {
      title: input,
    });

    setInput("");
  };

  return (
    <div>
      <form className="form-group" onSubmit={submitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
