import { useState } from "react";
import { useDebounce } from "../../utils/index";
import { useProjects } from "../../utils/project";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useProjectModal, useProjectParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

export const ProjectListScreen = () => {
  const { open } = useProjectModal();
  const [param, setParam] = useProjectParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(param, 1000));
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
