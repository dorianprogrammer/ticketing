import React, { useState } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "https://ticketing.dev/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async () => {
    await doRequest();
  };

  return (
    <div>
      <h1>Sign up</h1>
      <div className="form-group">
        <label htmlFor="">Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary" onClick={onSubmit}>
        Sign up
      </button>
    </div>
  );
};

export default Signup;
