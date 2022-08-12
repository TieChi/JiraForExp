import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";
import { Pin } from "./pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";

export interface Item {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}
interface ListProps extends TableProps<Item> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      rowKey={(line) => line.id}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            return (
              <Pin
                checked={project?.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value: any, project: { personId: number | string }) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value: any, project: { created: number }) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "未知"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding type={"link"}>编辑</ButtonNoPadding>
                    </Menu.Item>
                    <Menu.Item>
                      <ButtonNoPadding type={"link"}>删除</ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th></th>
  //         <th></th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>

  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
