import React, { useState } from 'react';
import Modal from '../modal/Modal';
import PostList from '../post-list/PostList';

import './App.scss';

export function App() {
  const [show, setShow] = useState(false);

  return (
    <>

      <PostList
        setShow={setShow}
      />

      {show && <Modal setShow={setShow} />}
    </>
  );
}

export default App;
