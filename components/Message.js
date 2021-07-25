import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

function Message({ message }) {
  const [userLoggenIn] = useAuthState(auth);

  const TypeOfMessage = message.user === userLoggenIn.email ? Sender : Receiver;
  return (
    <TypeOfMessage>
      {message.message}
      <Timestamp>{message.timestamp ? moment(message.timestamp).format("LT") : "..."}</Timestamp>
    </TypeOfMessage>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.p`
  font-size: 10px;
  position: absolute;
  bottom: 0px;
  color: gray;
  font-weight: 500;
`;