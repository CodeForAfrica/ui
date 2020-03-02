import config from 'config';

export default function findActivityLog(logParam) {
  const activityLog = logParam.log.edges.filter(
    ({ node: log }) =>
      log.task !== null &&
      log.task.label === config.status.label &&
      (log.event_type === 'create_dynamicannotationfield' ||
        log.event_type === 'update_dynamicannotationfield')
  );
  return activityLog;
}
