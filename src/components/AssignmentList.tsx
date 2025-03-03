import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssignments,
  setLimit,
  setPage,
  setSearch,
  setSelectedAssignment,
  setSubject,
} from "../redux/assignmentSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Flex, Input, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ReadAssignmentDto } from "../types/dtos/Assignment";
import { Subject } from "../types/enums/Subject.enum";
import { setFormType, setIsOpen } from "../redux/modalSlice";
import ModalWrapper from "./Modal";
import { Role } from "../types/enums/Role.enum";
import GradeForm from "./GradeForm";
import SubmitAssignmentForm from "./SubmitAssignmentForm";

const { Option } = Select;

const AssignmentList: React.FC = () => {
  /* --------------------- STATE HOOK --------------------- */

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, total, page, limit, search, subject } = useSelector(
    (state: RootState) => state.assignment
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { formType } = useSelector((state: RootState) => state.modal);

  /* --------------------- HOOK --------------------- */

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch, page, limit, search, subject]);

  /* --------------------- CONSTANT --------------------- */

  const columns: ColumnsType<ReadAssignmentDto> = [
    ...(user?.role === Role.Teacher
      ? [{ title: "Student", dataIndex: ["student", "name"], key: "student" }]
      : []),
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Grade", dataIndex: ["grade", "grade"], key: "grade" },
    { title: "Feedback", dataIndex: ["grade", "feedback"], key: "grade" },
  ];

  /* --------------------- FUNCTION --------------------- */

  const openGradeModal = (assignment: ReadAssignmentDto) => {
    dispatch(setFormType("grade"));
    dispatch(setSelectedAssignment(assignment));
    dispatch(setIsOpen(true));
  };

  const openSubmitAssignmentModal = () => {
    dispatch(setFormType("submit"));
    dispatch(setIsOpen(true));
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Flex vertical gap={20}>
      <Flex gap={20} justify="space-between">
        <Flex gap={20}>
          <Input
            placeholder="Search Assignments..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            style={{ maxWidth: 300 }}
          />
          <Select
            placeholder="Select Subject"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => dispatch(setSubject(value))}
          >
            <Option value={Subject.English}>English</Option>
            <Option value={Subject.Math}>Math</Option>
          </Select>
        </Flex>
        {user?.role === Role.Student && (
          <Button onClick={openSubmitAssignmentModal}>Submit Assignment</Button>
        )}
      </Flex>
      <Button
        onClick={() => {
          dispatch(fetchAssignments());
        }}
        style={{ width: "min-content" }}
        loading={loading}
      >
        Refresh
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          onChange: (page, pageSize) => {
            dispatch(setPage(page));
            dispatch(setLimit(pageSize));
          },
        }}
        onRow={(record) => ({
          onClick: () => openGradeModal(record),
        })}
      />

      <ModalWrapper>
        {formType === "grade" ? (
          user?.role === Role.Teacher && <GradeForm />
        ) : (
          <SubmitAssignmentForm />
        )}
      </ModalWrapper>
    </Flex>
  );
};

export default AssignmentList;
