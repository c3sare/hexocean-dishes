import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import OrderForm from "../components/OrderForm";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <OrderForm />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Pizza form HexOcean</title>;
