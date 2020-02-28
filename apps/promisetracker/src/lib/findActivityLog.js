import config from 'config';

export default function findActivityLog(logParam) {
  const activityLog = logParam.log.edges.filter(
    ({ node: log }) =>
      log.task !== null && log.task.label === config.status.label
  );
  return activityLog;
}
