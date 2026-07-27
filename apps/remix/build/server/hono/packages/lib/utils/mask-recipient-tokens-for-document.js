const maskRecipientTokensForDocument = ({
  document,
  user,
  token
}) => {
  const maskedRecipients = document.recipients.map(recipient => {
    if (document.userId === user?.id) {
      return recipient;
    }
    if (recipient.email === user?.email) {
      return recipient;
    }
    if (recipient.token === token) {
      return recipient;
    }
    return {
      ...recipient,
      token: ''
    };
  });
  return {
    ...document,
    Recipient: maskedRecipients
  };
};

export { maskRecipientTokensForDocument };
//# sourceMappingURL=mask-recipient-tokens-for-document.js.map
