import { useState } from "react";
import { useParams } from "react-router-dom";

const EditAnswer = () => {
  const { answerId } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION. CODE: {answerId}</p>;
};

export default EditAnswer;
