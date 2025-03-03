import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, Flex } from "antd";
import { Typography } from "antd";
import AssignmentInfoField from "./AssignmentInfoField";

const { Title } = Typography;

export default function AssignmentView() {
  const { selectedAssignment } = useSelector(
    (state: RootState) => state.assignment
  );

  /* --------------------- RENDER --------------------- */

  return (
    <Card>
      <AssignmentInfoField
        label="Subject"
        value={selectedAssignment?.subject}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Title"
        value={selectedAssignment?.title}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Content"
        value={selectedAssignment?.content}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Student"
        value={selectedAssignment?.student.name}
        titleLevel={5}
        gap={10}
      />
    </Card>
  );
}
