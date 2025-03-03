import { Flex } from "antd";
import { Typography } from "antd";
import "./css/AssignmentInfoField.css";
const { Title } = Typography;

export default function AssignmentInfoField({
  label,
  value,
  titleLevel,
  gap,
}: {
  titleLevel?: 1 | 2 | 3 | 4 | 5;
  label: string;
  value?: string;
  gap?: number;
}) {
  /* --------------------- RENDER --------------------- */

  return (
    <Flex align="start" gap={gap}>
      <div style={{ flex: 1 }}>
        <Title level={titleLevel} style={{ margin: 0 }}>
          {label}
        </Title>
      </div>
      :
      <div
        style={{
          flex: 3,
          whiteSpace: "pre-wrap",
        }}
        className="scroll-container"
      >
        <Title level={titleLevel} style={{ margin: 0, flex: 1 }}>
          {value}
        </Title>
      </div>
    </Flex>
  );
}
