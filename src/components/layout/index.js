import React from "react";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  // const [isModalVisible, setModalVisible] = useState(false);

  // const openModal = () => {
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  return (
    <main className="wrapper">
      {/* <Sidebar children={children} openModal={openModal} /> */}
      <Sidebar children={children} />
      {/* <div className="main-content">{children}</div> */}
      {/* <Modal visible={isModalVisible} onHide={closeModal} /> */}
    </main>
  );
};

export default Layout;
