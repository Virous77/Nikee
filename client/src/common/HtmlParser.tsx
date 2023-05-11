import parse from "html-react-parser";
import React from "react";

type HtmlParserType = {
  data: string | undefined;
};

const HtmlParser: React.FC<HtmlParserType> = ({ data }) => {
  return <div>{data && parse(data)}</div>;
};

export default HtmlParser;
