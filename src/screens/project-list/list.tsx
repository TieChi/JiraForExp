import { Table, TableProps } from "antd";
import dayjs from "dayjs";

export interface Item {
  id: string;
  name: string;
  personId: number | string;
  organization: string;
  created: number;
}
interface User {
  id: number | string;
  name: string;
}
interface ListProps extends TableProps<Item> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
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
