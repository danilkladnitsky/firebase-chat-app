import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { auth, db } from "../firebase";

import { Chat, Search, ExitToApp } from "@material-ui/icons";
import { MoreVert } from "@material-ui/icons";
import * as EMailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import UserChat from "./UserChat";
function Sidebar() {
  const [user, loading] = useAuthState(auth);
  const useChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(useChatRef);
  const createChat = () => {
    const input = prompt("Enter email address for your user");

    if (!input) return;

    if (
      EMailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (userEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === userEmail)?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL}></UserAvatar>
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <IconButton onClick={() => auth.signOut()}>
            <ExitToApp />
          </IconButton>
        </IconsContainer>
      </Header>
      
      <SearchBar>
        <Search />
        <SearchInput placeholder="Search in chats" />
      </SearchBar>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => {
        return (
          <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
        );
      })}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px; ;
`;

const SearchInput = styled.input`
  border: 0;
  outline: 0;
  outline-width: 0;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
