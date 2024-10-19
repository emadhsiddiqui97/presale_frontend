import React, { useState } from "react";
import Input from "./InputComponent";
const CreatePresale = () => {
  [tokenAddress, setTokenAddress] = useState("");
  return (
    <div>
      <Input type="text" label="Token Address" onChange={setTokenAddress} />
    </div>
  );
};

export default CreatePresale;
