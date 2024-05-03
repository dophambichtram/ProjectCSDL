import styled from "styled-components";
// form : #f1ebe300
// text: #3b302300
const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .logo {
    width: 8em;
    margin: 0 auto;
  }
  //   .form {
  //     background: #dccfbc00;
  //   }
  h3 {
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: var(--letterSpacing);
    // text-transform: capitalize;
  }

  a {
    text-align: left;
    display: block;
    margin-bottom: 0.5rem;
    letter-spacing: var(--letterSpacing);
  }

  .a--register {
    display: inline-block;
    padding-left: 0.3rem;
  }

  p {
    color: black;
    margin: 0;
    padding: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
    letter-spacing: var(--letterSpacing);
    text-align: center;
  }

  .p--register {
    margin-bottom: 0;
  }

  .icon {
    color: var(--primary-50-light);
  }

  .btn-custom {
    width: 100%;
    padding: 1rem;
    font-size: 16px;
    margin-top: 3rem;
  }

  input {
    height: 3rem;
  }

  form {
    text-align: center;
  }

  form a {
    color: var(--primary-50);
  }

  .form-row-two {
    display: flex;
    justify-content: space-between;
    gap: 0 0.5rem;
  }
`;
export default Wrapper;
