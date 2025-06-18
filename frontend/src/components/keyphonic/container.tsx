import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="mx-auto flex w-9/10 flex-col">{children}</div>
    </div>
  );
};

export default Container;
