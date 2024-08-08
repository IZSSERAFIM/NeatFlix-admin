import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import AdminService from '../service/AdminService';

const AdminDashboard = () => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editCommentDialogOpen, setEditCommentDialogOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [currentEditComment, setCurrentEditComment] = useState(null);

  useEffect(() => {
    loadComments();
    loadUsers();
  }, []);

  const loadComments = () => {
    AdminService.getComments()
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error loading comments: ', error);
      });
  };

  const loadUsers = () => {
    AdminService.getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error loading users: ', error);
      });
  };

  const handleEditUser = (user) => {
    setCurrentEditUser(user);
    setEditUserDialogOpen(true);
  };

  const handleEditComment = (comment) => {
    setCurrentEditComment(comment);
    setEditCommentDialogOpen(true);
  };

  const handleUserSave = () => {
    AdminService.manageUser(
      currentEditUser.userName,
      currentEditUser.nickName,
      currentEditUser.isBanned
    )
      .then(() => {
        setEditUserDialogOpen(false);
        loadUsers();
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
      });
  };

  const handleCommentSave = () => {
    AdminService.changeComment(currentEditComment.id, currentEditComment.status)
      .then(() => {
        setEditCommentDialogOpen(false);
        loadComments();
      })
      .catch((error) => {
        console.error('Error updating comment: ', error);
      });
  };

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>VIP</TableCell>
              <TableCell>Banned</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userName}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.nickName}</TableCell>
                <TableCell>{user.userEmail}</TableCell>
                <TableCell>
                  <img src={user.userAvatar} alt="Avatar" width={50} />
                </TableCell>
                <TableCell>{user.isVIP ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.isBanned ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditUser(user)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Comments</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditComment(comment)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={editUserDialogOpen}
        onClose={() => setEditUserDialogOpen(false)}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details of the user.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={currentEditUser?.userName}
            onChange={(e) =>
              setCurrentEditUser({
                ...currentEditUser,
                username: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Nickname"
            type="text"
            fullWidth
            value={currentEditUser?.nickName}
            onChange={(e) =>
              setCurrentEditUser({
                ...currentEditUser,
                nickname: e.target.value,
              })
            }
          />
          <Select
            fullWidth
            value={currentEditUser?.isBanned}
            onChange={(e) =>
              setCurrentEditUser({
                ...currentEditUser,
                isBanned: e.target.value,
              })
            }
          >
            <MenuItem value={true}>Banned</MenuItem>
            <MenuItem value={false}>Not Banned</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUserDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUserSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editCommentDialogOpen}
        onClose={() => setEditCommentDialogOpen(false)}
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the status of the comment.</DialogContentText>
          <Select
            fullWidth
            value={
              {
                NORMAL: 0,
                REVIEW: 1,
                BLOCKED: 2,
              }[currentEditComment?.status]
            }
            onChange={(e) =>
              setCurrentEditComment({
                ...currentEditComment,
                status: ['NORMAL', 'REVIEW', 'BLOCKED'][e.target.value],
              })
            }
          >
            <MenuItem value={0}>NORMAL</MenuItem>
            <MenuItem value={1}>REVIEW</MenuItem>
            <MenuItem value={2}>BLOCKED</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCommentDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCommentSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
