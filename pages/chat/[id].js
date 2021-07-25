import styled from "styled-components";
import Head from "next/head";
import { auth, db } from "../../firebase";
import Sidebar from "../../components/Sidebar";
import ChatContainer from "../../components/ChatContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import getUserEmail from "../../utils/getUserEmail";
function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getUserEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer chat={chat} messages={messages} />
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
