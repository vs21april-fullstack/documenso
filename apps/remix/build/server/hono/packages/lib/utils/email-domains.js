const generateDkimRecord = (recordName, publicKeyFlattened) => {
  return {
    name: recordName,
    value: `v=DKIM1; k=rsa; p=${publicKeyFlattened}`,
    type: 'TXT'
  };
};
const AWS_SES_SPF_RECORD = {
  name: `@`,
  value: 'v=spf1 include:amazonses.com -all',
  type: 'TXT'
};
const generateEmailDomainRecords = (recordName, publicKeyFlattened) => {
  return [generateDkimRecord(recordName, publicKeyFlattened), AWS_SES_SPF_RECORD];
};

export { AWS_SES_SPF_RECORD, generateDkimRecord, generateEmailDomainRecords };
//# sourceMappingURL=email-domains.js.map
