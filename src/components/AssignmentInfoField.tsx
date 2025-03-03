import { Flex } from "antd";
import { Typography } from "antd";
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
      <div style={{ flex: 3, whiteSpace: "pre-wrap" }}>
        <Title level={titleLevel} style={{ margin: 0, flex: 1 }}>
          {value}
        </Title>
      </div>
    </Flex>
  );
}
