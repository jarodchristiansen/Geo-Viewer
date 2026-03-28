import { Colors } from "@/styles/variables";
import type { ReactNode } from "react";
import styled from "styled-components";

import Footer from "./footer";
import Header from "./header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      <Header />
      <PageWrapper>{children}</PageWrapper>

      <Footer />
    </LayoutContainer>
  );
}

const PageWrapper = styled.main`
  margin-top: 24px;
  padding: 62px 0;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.richBlack};
  position: relative;
`;

export default Layout;
