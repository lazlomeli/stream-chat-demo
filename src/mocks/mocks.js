import { StreamChat } from "stream-chat";

const fakeUserMessage = "Hello Lazlo, good luck in the match!";

const USERS_MOCK = {
  myUser: {
    id: "lazlo10",
    name: "Lazlo Meli",
    image: "https://i.pravatar.cc/300?img=10",
  },
  fakeUser: {
    id: "opponent123",
    name: "Opponent Bot",
    image: "https://i.pravatar.cc/300?img=11",
  },
};

const CHANNEL_MOCK = {
  channelType: "messaging",
  channelId: "football-group",
  mockChannel: {
    image: "https://robohash.org/football",
    name: "Football",
    members: [USERS_MOCK.myUser.id],
  },
};

/**
 * Function to check if fake message has already been sent to avoid multi-rendering.
 * @param {ChannelState} channelState
 * @returns {boolean}
 */
const hasFakeUserMessage = async (channel) => {
  // const messages = await channelState.messageSets[0].messages;
  // return messages.some((msg) => msg.text === fakeUserMessage);
  const result = await channel.query({ messages: { limit: 50 } });

  return result.messages.some((msg) => msg.text === fakeUserMessage);
};

/**
 * Function to mock a chat message from a fake user.
 * @param {string} channelType
 * @param {string} channelId
 * @param {string} userId
 */
const sendFakeMessage = async (channelType, channelId, myUser, fakeUser) => {
  const tempClient = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);

  await tempClient.connectUser(fakeUser, tempClient.devToken(fakeUser.id));

  const tempChannel = tempClient.channel(channelType, channelId, { members: [fakeUser.id, myUser.id] });

  await tempChannel.watch();
  await tempChannel.sendMessage({ text: fakeUserMessage });
  await tempClient.disconnectUser();
};

export { USERS_MOCK, CHANNEL_MOCK, hasFakeUserMessage, sendFakeMessage };
