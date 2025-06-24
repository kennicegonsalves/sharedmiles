// import use state.
import { useState } from 'react';
const withModal = ModalComponent => WrapperComponent => {
  return function () { 
    // state to show / hide custom modal.
    const [isModalShown, setIsModalShown] = useState(false);
    
    return (
      <>
        <WrapperComponent toggleModal={setIsModalShown}/>
        {isModalShown && <ModalComponent toggleModal={setIsModalShown} />}
      </>
    )
  }
}

export default withModal;





// import { useState } from 'react';

// const withModal = ModalComponent => WrapperComponent => {
//   return function WrappedWithModal(props) { 
//     // state to show / hide custom modal.
//     const [isModalShown, setIsModalShown] = useState(false);

//     // Toggle function to handle showing/hiding the modal
//     const toggleModal = () => setIsModalShown(prev => !prev);
    
//     return (
//       <>
//         <WrapperComponent {...props} toggleModal={toggleModal} />
//         {isModalShown && <ModalComponent {...props} toggleModal={toggleModal} />}
//       </>
//     );
//   };
// };

// export default withModal;
