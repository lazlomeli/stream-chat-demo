/**
 * Temporary patch for GetDraft error when accessing to message thread.
 * @param {string} channel
 * @returns { draft: null }
 */
export const suppressDraftNotFoundError = (channel) => {
  if (!channel || typeof channel.getDraft !== "function") return;

  const originalGetDraft = channel.getDraft;

  channel.getDraft = async (...args) => {
    try {
      return await originalGetDraft.apply(channel, args);
    } catch (err) {
      if (err?.code === 16 && err?.message?.includes("draft not found")) {
        console.warn('[Stream] Suppressed "draft not found" error.');
        return { draft: null };
      }
    }
  };
};
