import { Button, Flex, Form, Input, InputNumber, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  gradeAssignment,
  gradeAssignmentWithAI,
} from "../redux/assignmentSlice";
import { Role } from "../types/enums/Role.enum";
import { GradeAssignmentDto } from "../types/dtos/Grade";
import AssignmentView from "./AssignmentView";

export default function GradeForm() {
  /* --------------------- HOOK --------------------- */

  const [form] = Form.useForm<GradeAssignmentDto>();

  /* --------------------- STATE HOOK --------------------- */

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.assignment);

  const { user } = useSelector((state: RootState) => state.auth);

  /* --------------------- FUNCTION --------------------- */

  const handleGradeSubmit = async () => {
    try {
      if (user?.role === Role.Teacher) {
        const values = await form.validateFields();
        await dispatch(
          gradeAssignment({
            grade: values.grade,
            feedback: values.feedback,
          })
        );
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleGradeWithAI = async () => {
    try {
      const aiResponse = await dispatch(gradeAssignmentWithAI()).unwrap();
      form.setFieldsValue({
        grade: aiResponse.grade,
        feedback: aiResponse.feedback,
      });
      message.success("AI-generated grade and feedback applied!");
    } catch (error) {
      message.error("Failed to get AI-generated grade.");
    }
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Form form={form} layout="vertical" onFinish={handleGradeSubmit}>
      <AssignmentView />
      <br />
      <Form.Item
        label="Grade"
        name="grade"
        rules={[{ required: true, message: "Please enter a grade" }]}
      >
        <InputNumber min={0} max={100} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Feedback" name="feedback">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Flex gap={5} vertical>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Grade Assignment
          </Button>
          <Button onClick={handleGradeWithAI} loading={loading} block>
            Grade With AI
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
