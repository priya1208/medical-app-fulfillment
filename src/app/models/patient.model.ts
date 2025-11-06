export interface CustomFields {
[key: string]: any;
}


export interface Patient {
mobile: string; // required
first_name: string; // required
last_name?: string;
zipcode?: string;
apikey: string; // required
dob?: string; // YYYY-MM-DD
gender?: 'male' | 'female' | 'other';
blood_group?: string;
custom_fields?: CustomFields;
}