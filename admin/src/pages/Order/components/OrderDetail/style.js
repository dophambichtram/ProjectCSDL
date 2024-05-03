import styled from "styled-components";

const Wrapper = styled.section`
  // bóng mờ
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #33333347;
  backdrop-filter: blur(1px);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;

  .container {
    padding: 30px 30px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    background: white;
    border-radius: 6px;
    box-shadow: var(--shadow-2);
  }

  .btn-container-product {
    display: flex;
    gap: 0 0.5rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    flex-flow: row-reverse wrap;
    // position: absolute;
    // top: calc(100% - 1rem);
    // right: 0;
  }
`;

export default Wrapper;
