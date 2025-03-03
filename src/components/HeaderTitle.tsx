import { Header } from "antd/es/layout/layout";

export default function HeaderTitle({ title }: { title: string }) {
  /* --------------------- RENDER --------------------- */

  return (
    <Header style={{ background: "#fff" }}>
      <h1>{title}</h1>
    </Header>
  );
}
