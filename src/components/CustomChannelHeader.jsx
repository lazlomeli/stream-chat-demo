import React from "react";
import { useChannelStateContext } from "stream-chat-react";

export const CustomChannelHeader = () => {
  const { channel, watcherCount, members } = useChannelStateContext();

  const name = channel?.data?.name || "Unnamed Channel";
  const memberCount = Object.keys(members || {}).length;

  const messages = channel?.state?.messages || [];
  const lastMessage = messages.length ? messages[messages.length - 1] : null;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    return isToday ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : date.toLocaleDateString();
  };

  /**
   * Avoid long text overflow by adding ellipsis on larger texts.
   * @returns {string}
   */
  const formatLastMessageText = () => {
    let message = lastMessage.text;
    if (lastMessage.text.length > 14) {
      message = lastMessage.text.slice(0, 14) + "...";
    }
    return message;
  };

  return (
    <div className="custom-header-container">
      <div className="custom-header-title-container">
        <div className="group-image-container">
          <img className="group-image" src={channel.data?.image || "https://robohash.org/mock"} />
        </div>
        <div className="custom-header-title-container-title">{name}</div>
        <div className="custom-header-title-container-members">
          {memberCount} members · {watcherCount || 0} online
        </div>
      </div>

      <div className="last-message-container">
        <p className="custom-header-lastmessage">Last message: </p>
        {lastMessage && (
          <div className="custom-header-lastmessage-container">
            <span className="last-message-text">{formatTime(lastMessage.created_at)} </span>
            <span>
              <strong>{lastMessage.user?.name || "Someone"}:</strong> {formatLastMessageText() || "[no message]"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
