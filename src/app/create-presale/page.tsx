"use client";

import React, { useState } from "react";
import InputComponent from "../Components/InputComponent";

const page = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [softCap, setSoftCap] = useState("");
  const [hardCap, setHardCap] = useState("");
  const [startDate, setStartDate] = useState("");
  const [tokenMaxAmount, setTokenMaxAmount] = useState("");
  const [pricePerToken, setPricePerToken] = useState("");

  return (
    <div>
      <InputComponent
        type="text"
        label="Token Address"
        onChange={setTokenAddress}
        value={tokenAddress}
      />
      <InputComponent
        type="text"
        label="Soft cap"
        onChange={setSoftCap}
        value={softCap}
      />
      <InputComponent
        type="text"
        label="Hard cap"
        onChange={setHardCap}
        value={hardCap}
      />
    </div>
  );
};

export default page;
