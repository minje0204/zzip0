// @ts-nocheck
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GOOGLE_AUTH_URL } from './index';
import Image from 'next/image';

const LoginModal = ({ setOpen, open }) => {
  const handleClose = () => {
    console.log('clicked!@!');
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <Image
            src={`/google-logo.png`}
            width={50}
            height={50}
            alt="google"
          ></Image>
          Log in with Google
        </a>
      </Box>
    </Modal>
  );
};

export default LoginModal;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
