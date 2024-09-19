interface Alias {
  language: string;
  alias: string;
}

interface SchemaField {
  name: string;
  aliases: Alias[];
}
export interface Layer {
  children: any[];
  editable: number;
  groupIdForMain: number;
  groupIdForSub: number;
  groupNameForMain: string;
  groupNameForSub: string;
  groupType: string;
  hasTimeline: boolean;
  hasTimelineWithDates: boolean;
  has_city_ids: number;
  id: number;
  is_pay: number;
  layers: string;
  listTerra: number[];
  name: string;
  ordering: number;
  origin_id: number;
  provider: string;
  schema: SchemaField[];
  subGroupId: number;
  subGroupName: string;
  tags: string[];
  timelineWithDatesField: string;
  timelineYears: number[];
  type: string;
}
