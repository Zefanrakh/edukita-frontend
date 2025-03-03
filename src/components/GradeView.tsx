import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, Flex } from "antd";
import { Typography } from "antd";
import AssignmentInfoField from "./AssignmentInfoField";

const { Title } = Typography;

export default function GradeView() {
  const { selectedGrade } = useSelector((state: RootState) => state.grade);
  return (
    <Card>
      <AssignmentInfoField
        label="Subject"
        value={selectedGrade?.assignment.subject}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Title"
        value={selectedGrade?.assignment.title}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Content"
        value={selectedGrade?.assignment.content}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Student"
        value={selectedGrade?.assignment.student.name}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Grade"
        value={selectedGrade?.grade.toString()}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Feedback"
        value={selectedGrade?.feedback}
        titleLevel={5}
        gap={10}
      />
      <AssignmentInfoField
        label="Graded By"
        value={selectedGrade?.teacher.name}
        titleLevel={5}
        gap={10}
      />
    </Card>
  );
}
