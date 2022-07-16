import { useState } from "react";
import { useDebounce } from "../../utils/index";
import { useProjects } from "../../utils/project";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useProjectParams } from "./util";

export const ProjectListScreen = () => {
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
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
