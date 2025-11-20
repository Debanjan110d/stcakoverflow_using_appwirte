"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => {
    return mod.default;
  }),
  { ssr: false }
);

export default Editor;
