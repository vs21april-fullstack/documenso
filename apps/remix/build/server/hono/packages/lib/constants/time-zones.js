import { timeZonesNames, rawTimeZones } from '@vvo/tzdb';

const TIME_ZONE_DATA = rawTimeZones;
const DEFAULT_DOCUMENT_TIME_ZONE = 'Etc/UTC';
const minutesToHours = minutes => {
  const hours = Math.abs(Math.floor(minutes / 60));
  const min = Math.abs(minutes % 60);
  const sign = minutes >= 0 ? '+' : '-';
  return `${sign}${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
};
const getGMTOffsets = timezones => {
  const gmtOffsets = [];
  for (const timezone of timezones) {
    const offsetValue = minutesToHours(timezone.rawOffsetInMinutes);
    const gmtText = `(${offsetValue})`;
    gmtOffsets.push(`${timezone.name} ${gmtText}`);
  }
  return gmtOffsets;
};
getGMTOffsets(TIME_ZONE_DATA);
const TIME_ZONES = ['Etc/UTC', ...timeZonesNames];

export { DEFAULT_DOCUMENT_TIME_ZONE, TIME_ZONES, TIME_ZONE_DATA, minutesToHours };
//# sourceMappingURL=time-zones.js.map
