// @ts-nocheck
import ReactDOM from 'react-dom';

const Portal = ({ children, selector }) => {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector);
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
