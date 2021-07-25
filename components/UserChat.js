import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getUserEmail from "../utils/getUserEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function UserChat({ id, users }) {
  const router = useRouter();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  const [user] = useAuthState(auth);

  const [userSnapshot] = useCollection(
    db.collection("users").where("email", "==", getUserEmail(users, user))
  );

  const recipient = userSnapshot?.docs?.[0]?.data();
  const userEmail = getUserEmail(users, user);
  return (
    <Container onClick={enterChat}>
      {recipient || recipient?.photoURL ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{userEmail[0]}</UserAvatar>
      )}
      <UserEmail>{userEmail}</UserEmail>
    </Container>
  );
}

export default UserChat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

const UserEmail = styled.div``;
