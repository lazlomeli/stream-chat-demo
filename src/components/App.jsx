import React, { useEffect, useState } from "react";

import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, MessageList, MessageInput, Thread, LoadingIndicator } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { USERS_MOCK, CHANNEL_MOCK, hasFakeUserMessage, sendFakeMessage } from "../mocks/mocks";
import { suppressDraftNotFoundError } from "../services/errorHandling";
import { CustomChannelHeader } from "./CustomChannelHeader";

const App = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const { channelType, channelId, mockChannel } = CHANNEL_MOCK;
  const { myUser, fakeUser } = USERS_MOCK;

  useEffect(() => {
    let mounted = true;

    /**
     * Setup chat client and channel on component mount.
     */
    const setup = async () => {
      const chatClient = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

      /**
       * Development token for demo purposes - authentication via user token in production environment.
       */
      await chatClient.connectUser(myUser, chatClient.devToken(myUser.id));

      const channel = chatClient.channel(channelType, channelId, mockChannel);

      suppressDraftNotFoundError(channel);

      await channel.watch();
      await channel.truncate();
      await channel.addMembers([fakeUser.id]);

      /**
       * Avoid rendering the fake message several times.
       */
      const fakeUserMessage = await hasFakeUserMessage(channel);
      if (!fakeUserMessage) await sendFakeMessage(channelType, channelId, myUser, fakeUser);

      if (mounted) {
        setClient(chatClient);
        setChannel(channel);
      }
    };

    setup();

    return () => {
      mounted = false;
      if (client) client.disconnectUser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!channel || !client ? (
        <div className="loading-indicator">
          <LoadingIndicator />
        </div>
      ) : (
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <CustomChannelHeader />
              <MessageList />
              <MessageInput />
              <Thread />
            </Window>
          </Channel>
        </Chat>
      )}
    </>
  );
};

export default App;
