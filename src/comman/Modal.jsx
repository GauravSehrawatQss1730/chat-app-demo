import React, { useState } from "react";

const CreateGroupModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  if (!isOpen) return null; // Do not render if modal is not open

  const handleSubmit = (e) => {
    e.preventDefault();
    const groupData = {
      name,
      description,
      tags: tags.split(",").map((tag) => tag.trim()), // Split and trim tags
    };
    onCreate(groupData);
    onClose(); // Close modal after creating the group
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Create Group</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
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
    width:'60%'
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    resize: "vertical",
    minHeight: "80px",
    width:'60%'
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
  wrapper:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default CreateGroupModal;
