"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";

export default function HowTo() {

  return (
    <div className="howto">
      <h1>How To</h1>
      <p>How to use this app</p>
    </div>
  );
}
