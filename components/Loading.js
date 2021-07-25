import styled from "styled-components";

function Loading() {
  return (
    <Container>
      <LoadingIcon src="loading.gif" alt="Loading app..." />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;
const LoadingIcon = styled.img`
  height: 100px;
  width: 100px;
`;
