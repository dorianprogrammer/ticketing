import React, { useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import Router from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errors } = useRequest({
    url: "https://ticketing.dev/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: (ticket) => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = () => {
    doRequest();
  };

  return (
    <div>
      <h1>Create a new ticket</h1>

      <div>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        {errors}
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewTicket;
