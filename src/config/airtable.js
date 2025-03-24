import Airtable from "airtable";

const AIRTABLE_API_URL = 'https://api.airtable.com';

Airtable.configure({
  endpointUrl: AIRTABLE_API_URL,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || "<enter_airtable_key>"
});

export const airtableBase = Airtable.base('<enter_airtable_base>');