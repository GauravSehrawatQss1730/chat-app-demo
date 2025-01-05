import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../services/api';
import { setDirectUsers } from '../redux/user';

const CreateGroupModal = ({ isOpen, onClose, onCreate, modalType }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const loggedInUser = useSelector(state => state.user.loggedInUser);

  const fetchAllUser = async () => {
    try {
      const allUsers = await getAllUsers();
      if (allUsers?.status === 200) {
        const tempData = allUsers.data?.filter((single) => single?._id !== loggedInUser?._id)
        setUsers(tempData)
      }
    } catch (err) { }
  };

  const handleUserSelection = (userId) => {
    if (modalType === 'direct') {
      // For direct chat (radio), only one user can be selected
      setSelectedUsers([userId]);
    } else {
      // For group (checkbox), allow multiple user selection
      setSelectedUsers((prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId)
          : [...prevSelected, userId]
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const groupData = {
      name,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      members: selectedUsers,
      type: "group"
    };
    onCreate(groupData);
    onClose();
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchAllUser();
    }
  }, [loggedInUser]);

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Add</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          {
            modalType === 'group' && <>
              <div style={styles.wrapper}>
                <label style={styles.label}>Group Name</label>
                <input
                  type="text"
                  style={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div style={styles.wrapper}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div style={styles.wrapper}>
                <label style={styles.label}>Tags</label>
                <input
                  type="text"
                  style={styles.input}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags, separated by commas"
                />
              </div>
            </>
          }

          <div style={styles.checkboxWrapper}>
            <label style={styles.label}>Select Users</label>
            <div style={styles.dropdown}>
              {users.map((user) => (
                <div key={user._id} style={styles.checkboxContainer}>
                  {modalType === 'direct' ? (
                    // For direct, use radio buttons (only one can be selected)
                    <input
                      type="radio"
                      name="selectedUser"
                      id={`user-${user._id}`}
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleUserSelection(user._id)}
                    />
                  ) : (
                    // For group, use checkboxes (multiple can be selected)
                    <input
                      type="checkbox"
                      id={`user-${user._id}`}
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleUserSelection(user._id)}
                    />
                  )}
                  <label htmlFor={`user-${user._id}`} style={styles.checkboxLabel}>
                    {user.username}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.createButton }}
            >
              Create
            </button>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    width: "60%",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    resize: "vertical",
    minHeight: "80px",
    width: "60%",
  },
  dropdown: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    maxHeight: "150px",
    overflowY: "auto",
    width: "60%",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkboxLabel: {
    fontSize: "14px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  createButton: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    marginLeft: "10px",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
};

export default CreateGroupModal;
