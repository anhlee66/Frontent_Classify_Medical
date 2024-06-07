import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  Button, 
  Form, 
  FormGroup, 
  Input, 
  Label, 
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader 
} from 'reactstrap';

const UploadAvatar = ({ 
  userId, 
  token, 
  username,
  avatarUrl, 
  setIsUserUpdated, 
}) => {

  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0];
      if (type === 'image/png' || type === 'image/jpeg') {
        setFile(files[0]);
      } else {
        toast.error('Only PNG and JPEG image types are allowed', {
          hideProgressBar: true,
        });
      }
    }
  };

  const updateUserAvatarId = async (avatarId, avatarUrl) => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        // PUT /api/users/:userId
        // Mục đích: Cập nhật avatar của người dùng.
        // Yêu cầu: Dữ liệu JSON chứa avatarId và avatarUrl, Header có Authorization với token.
        // Phản hồi: Xác nhận việc cập nhật avatar thành công.
        { avatarId, avatarUrl },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsUserUpdated(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error('File is required', {
        hideProgressBar: true,
      });
      return;
    }

    try {
      const files = new FormData();
      files.append('files', file);
      files.append('name', `${username} avatar`);

      const {
        data: [{ id, url }],
      } = await axios.post('http://localhost:8080/api/upload', files, {
          // POST /api/upload
          // Mục đích: Upload file lên server.
          // Yêu cầu: FormData chứa file và các thông tin khác, Header có Authorization với token.
          // Phản hồi: Trả về ID và URL của file đã upload.
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      updateUserAvatarId(id, url);
      setFile(null);
      setModal(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <Button size="sm" onClick={toggle}>
        {`${avatarUrl ? 'Change' : 'Upload'} picture`}
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {`${avatarUrl ? 'Change' : 'Upload'} your avatar`}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input 
                type="file"
                name="file"
                id="exampleFile"
                onChange={handleFileChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UploadAvatar;
