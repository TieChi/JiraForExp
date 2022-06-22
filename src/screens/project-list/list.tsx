import { Table } from "antd";

interface Item {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}
interface User {
  id: number;
  name: string;
}
interface ListProps {
  list: Item[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
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
          title: "负责人",
          render(value: any, project: { personId: number }) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
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
