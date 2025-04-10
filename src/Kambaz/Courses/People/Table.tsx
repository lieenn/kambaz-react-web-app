/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaUserCircle, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as client from "./client";
import * as enrollmentsClient from "../../Enrollments/client";

export default function PeopleTable({ currentUser }: { currentUser: any }) {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "STUDENT",
    section: "",
    loginId: "",
  });

  const fetchUsers = async () => {
    try {
      const usersData = await client.findAllUsers();
      console.log("Users data:", usersData);
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchEnrollments = async () => {
    try {
      if (cid) {
        const enrollmentsData = await enrollmentsClient.findAllEnrollments();
        setEnrollments(
          enrollmentsData.filter((enrollment: any) => enrollment.course === cid)
        );
      }
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEnrollments();
  }, [cid]);

  const handleAddUser = () => {
    setFormData({
      _id: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: "STUDENT",
      section: "",
      loginId: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditUser = (user: any) => {
    setFormData({
      ...user,
      password: "", // Don't show the password in form
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      if (cid) {
        // First unenroll the user from the course
        await enrollmentsClient.unenrollUserFromCourse(userId, cid);
      }
      await client.deleteUser(userId);
      fetchUsers(); // Refresh user list
      fetchEnrollments(); // Refresh enrollments
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // For updates, we need to preserve the password if not changed
        const userToUpdate = { ...formData };
        if (!userToUpdate.password) {
          // If password field is empty, get the current user's data
          const currentUserData = await client.findUserById(formData._id);
          userToUpdate.password = currentUserData.password;
        }
        await client.updateUser(formData._id, userToUpdate);
      } else {
        const newUser = await client.createUser(formData);
        // If creating a user, also enroll them in the course
        if (cid) {
          await enrollmentsClient.enrollUserInCourse(newUser._id, cid);
        }
      }
      setShowModal(false);
      fetchUsers(); // Refresh user list
      fetchEnrollments(); // Refresh enrollments
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const enrolledUsers = users.filter((user) =>
    enrollments.some((enrollment) => enrollment.user === user._id)
  );

  const isInstructor =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  return (
    <div id="wd-people-table">
      {isInstructor && (
        <Button variant="primary" className="mb-3" onClick={handleAddUser}>
          <FaPlus /> Add User
        </Button>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isInstructor && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((usr) => (
            <tr key={usr._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{usr.firstName}</span>{" "}
                <span className="wd-last-name">{usr.lastName}</span>
              </td>
              <td className="wd-login-id">{usr.loginId}</td>
              <td className="wd-section">{usr.section}</td>
              <td className="wd-role">{usr.role}</td>
              <td className="wd-last-activity">{usr.lastActivity}</td>
              <td className="wd-total-activity">{usr.totalActivity}</td>
              {isInstructor && (
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditUser(usr)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(usr._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* User Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required={!isEditMode}
                placeholder={
                  isEditMode ? "Leave blank to keep current password" : ""
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                name="loginId"
                value={formData.loginId}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={formData.section}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isEditMode ? "Update User" : "Create User"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
