import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGrades,
  setLimit,
  setPage,
  setSearch,
  setSelectedGrade,
} from "../redux/gradeSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Flex, Input, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ReadGradeDto } from "../types/dtos/Grade";
import { Role } from "../types/enums/Role.enum";
import { fetchUsers, setSelectedUserId } from "../redux/userSlice";
import { setFormType, setIsOpen } from "../redux/modalSlice";
import ModalWrapper from "./Modal";
import GradeView from "./GradeView";

const { Option } = Select;

const GradeList: React.FC = () => {
  /* --------------------- STATE HOOK --------------------- */

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, total, page, limit, search, subject } = useSelector(
    (state: RootState) => state.grade
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: dataUsers, selectedUserId } = useSelector(
    (state: RootState) => state.user
  );
  const { formType } = useSelector((state: RootState) => state.modal);

  /* --------------------- CONSTANT --------------------- */

  const columns: ColumnsType<ReadGradeDto> = [
    ...(user?.role === Role.Teacher
      ? [
          {
            title: "Student",
            dataIndex: ["assignment", "student", "name"],
            key: "student",
          },
        ]
      : []),
    { title: "Subject", dataIndex: ["assignment", "subject"], key: "subject" },
    { title: "Title", dataIndex: ["assignment", "title"], key: "title" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
    { title: "Feedback", dataIndex: "feedback", key: "grade" },
  ];

  /* --------------------- HOOK --------------------- */

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch, page, limit, search, subject, selectedUserId]);

  /* --------------------- FUNCTION --------------------- */

  const openGradeModal = (grade: ReadGradeDto) => {
    dispatch(setFormType("gradeView"));
    dispatch(setSelectedGrade(grade));
    dispatch(setIsOpen(true));
  };

  /* --------------------- RENDER --------------------- */

  return (
    <Flex vertical gap={20}>
      <Flex gap={20}>
        <Input
          placeholder="Search Grades..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
          style={{ maxWidth: 300 }}
        />
        {user?.role === Role.Teacher && (
          <Select
            value={selectedUserId}
            placeholder="Select Student"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => dispatch(setSelectedUserId(value))}
          >
            {dataUsers.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        )}
      </Flex>
      <Button
        onClick={() => {
          dispatch(fetchGrades());
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
      <ModalWrapper title="Grade">
        {formType === "gradeView" && <GradeView />}
      </ModalWrapper>
    </Flex>
  );
};

export default GradeList;
