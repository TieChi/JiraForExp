import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import Logo from "assets/LogoSoftware.png";
import { Dropdown, Menu, Button } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { useState } from "react";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        {/* <Nav>nav</Nav> */}
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path={""} element={<Navigate to="projects" />}></Route>
          </Routes>
        </Main>
        <ProjectModal />
        {/* <Aside>aside</Aside> */}
        {/* <Footer>footer</Footer> */}
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <LogoImg src={Logo} alt="" />
        </ButtonNoPadding>
        <ProjectPopover />
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const LogoImg = styled.img`
  width: 18rem;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;

// use grid-area constom area

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 6rem 1fr 6rem;
//   grid-template-columns: 20rem 1fr 20rem;
//   grid-template-areas:
//   "header header header"
//   "nav main aside"
//   "footer footer footer";
//   height: 100vh;
//   grid-gap: 10rem;
// `

// const PageHeader = styled.header`grid-area: header`
// const Main = styled.main`grid-area: main`
// const Nav = styled.nav`grid-area: nav`
// const Aside = styled.aside`grid-area: aside`
// const Footer = styled.footer`grid-area: footer`
