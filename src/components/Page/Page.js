import React, { useEffect } from "react";
import Container from "../container/Container";

const Page = (props) => {
  useEffect(() => {
    document.title = `${props.title} | Complex-app`;
    window.scrollTo(0, 0);
  }, []);
  return <Container wide={true}>{props.children}</Container>;
};

export default Page;
