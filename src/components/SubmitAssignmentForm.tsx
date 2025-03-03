import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { submitAssignment } from "../redux/assignmentSlice";
import { Role } from "../types/enums/Role.enum";
import { SubmitAssignmentDto } from "../types/dtos/Assignment";
import { Subject } from "../types/enums/Subject.enum";

const { Option } = Select;

export default function SubmitAssignmentForm() {
  /* --------------------- HOOK --------------------- */

  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<SubmitAssignmentDto>();

  /* --------------------- STATE HOOK --------------------- */

  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.assignment);

  /* --------------------- FUNCTION --------------------- */

  const handleGradeSubmit = async () => {
    try {
      if (user?.role === Role.Student) {
        const values = await form.validateFields();
        await dispatch(
          submitAssignment({
            title: values.title,
            subject: values.subject,
            content: values.content,
          })
        );
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Form form={form} layout="vertical" onFinish={handleGradeSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input placeholder="Enter assignment title" />
      </Form.Item>
      <Form.Item
        label="Subject"
        name="subject"
        rules={[{ required: true, message: "Please select a subject" }]}
      >
        <Select placeholder="Select a subject">
          <Option value={Subject.English}>English</Option>
          <Option value={Subject.Math}>Math</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter assignment content" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter assignment content" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit Assignment
        </Button>
      </Form.Item>
    </Form>
  );
}
