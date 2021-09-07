import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
  return <div className=" mx-auto px-5 bg-purple-800 text-white">{children}</div>;
};

export default Container;
