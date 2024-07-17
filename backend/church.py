from serpapi import GoogleSearch
import pgeocode
import re
import string
from fuzzywuzzy import fuzz
import numpy as np
import requests
import os
import json
import re
from requests.structures import CaseInsensitiveDict
from urllib.parse import quote, unquote
import boto3
import uuid
from concurrent.futures import ThreadPoolExecutor


states_dic = {
    'AK': 'Alaska',
    'AL': 'Alabama',
    'AR': 'Arkansas',
    'AS': 'American Samoa',
    'AZ': 'Arizona',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DC': 'District of Columbia',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'GU': 'Guam',
    'HI': 'Hawaii',
    'IA': 'Iowa',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'MA': 'Massachusetts',
    'MD': 'Maryland',
    'ME': 'Maine',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MO': 'Missouri',
    'MP': 'Northern Mariana Islands',
    'MS': 'Mississippi',
    'MT': 'Montana',
    'NA': 'National',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'NE': 'Nebraska',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NV': 'Nevada',
    'NY': 'New York',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'PR': 'Puerto Rico',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VA': 'Virginia',
    'VI': 'Virgin Islands',
    'VT': 'Vermont',
    'WA': 'Washington',
    'WI': 'Wisconsin',
    'WV': 'West Virginia',
    'WY': 'Wyoming'
}

SEMRUSH_API_KEY = os.environ.get('SEMRUSH_API_KEY')
SERPAPI_API_KEY = os.environ.get('SERPAPI_API_KEY')
GOOGLE_MAPS_KEY = os.environ.get('GOOGLE_MAPS_KEY')
GEOAPIFY_API_KEY = os.environ.get('GEOAPIFY_API_KEY')

YELP_NAME_VALUE = 30
YELP_CATEGORY_VALUE = 35
YELP_ABOUT_VALUE = 35
YELP_SCHEDULE_VALUE = 35
YELP_WEBPAGE_VALUE = 30
YELP_PHONE_VALUE = 30
YELP_ADDRESS_VALUE = 35
YELP_STATE_VALUE = 20

GOOGLE_NAME_VALUE = 15
GOOGLE_CATEGORY_VALUE = 20
GOOGLE_ABOUT_VALUE = 20
GOOGLE_SCHEDULE_VALUE = 20
GOOGLE_WEBPAGE_VALUE = 20
GOOGLE_PHONE_VALUE = 10
GOOGLE_ADDRESS_VALUE = 10
GOOGLE_STATE_VALUE = 10

APPLE_NAME_VALUE = 15
APPLE_CATEGORY_VALUE = 20
APPLE_ABOUT_VALUE = 20
APPLE_SCHEDULE_VALUE = 20
APPLE_WEBPAGE_VALUE = 20
APPLE_PHONE_VALUE = 10
APPLE_ADDRESS_VALUE = 10
APPLE_STATE_VALUE = 10

SOCIAL_INSTAGRAM_NAME_VALUE = 40
SOCIAL_INSTAGRAM_WEBPAGE_VALUE = 32
SOCIAL_INSTAGRAM_CATEGORY_VALUE = 28
SOCIAL_FACEBOOK_NAME_VALUE = 40
SOCIAL_FACEBOOK_WEBPAGE_VALUE = 32
SOCIAL_FACEBOOK_CATEGORY_VALUE = 28
SOCIAL_FACEBOOK_INFO_VALUE = 23
SOCIAL_FACEBOOK_ADDRESS_VALUE = 10
SOCIAL_FACEBOOK_STATE_VALUE = 7
SOCIAL_FACEBOOK_PHONE_VALUE = 10


APIFY_TOKEN = "apify_api_iAg7arHnPeftRg9PVFbS1w3bhPwb1d2lxtPH"


class church:

    def __init__(self, name='', address='', city='', state='', zipcode='', webpage='', phone='', size='', facebook_profile='', instagram_profile='', first_name='', last_name='', mobile_phone='', email='') -> None:
        self.id = ""
        self.contact_role = ""
        self.name = name
        self.coordinates = ""
        self.address = address
        self.city = city
        self.state = state
        self.phone = phone
        self.zipcode = zipcode
        self.webpage = webpage
        self.size = size
        self.facebook_profile = facebook_profile
        self.instagram_profile = instagram_profile
        self.first_name = first_name
        self.last_name = last_name
        self.mobile_phone = mobile_phone
        self.email = email
        self.map_image = ""
        self.data_file = ""
        self.search_params = ""
        self.pdf_sent = 0

        self.parsed_address = ""
        self.original_address = ""
        self.google_parsed_address = ""
        self.apple_parsed_address = ""
        self.yelp_parsed_address = ""
        self.facebook_parsed_address = ""

        self.apple_name = ""
        self.apple_name_score = 0
        self.apple_name_similarity_score = 0
        self.apple_address = ""
        self.apple_address_score = 0
        self.apple_address_similarity_score = 0
        self.apple_state = ""
        self.apple_state_score = 0
        self.apple_state_similarity_score = 0
        self.apple_phone = ""
        self.apple_phone_score = 0
        self.apple_phone_similarity_score = 0
        self.apple_webpage = ""
        self.apple_webpage_score = 0
        self.apple_webpage_similarity_score = 0
        self.apple_category = []
        self.apple_category_score = 0
        self.apple_description = ""
        self.apple_description_score = 0
        self.apple_description_similarity_score = 0
        self.apple_schedule = ""
        self.apple_schedule_score = 0
        self.apple_maps_score = 6

        self.google_name = ""
        self.google_name_score = 0
        self.google_name_similarity_score = 0
        self.google_coordinates = ""
        self.google_address = ""
        self.google_address_score = 0
        self.google_address_similarity_score = 0
        self.google_state = ""
        self.google_state_score = 0
        self.google_state_similarity_score = 0
        self.google_phone = ""
        self.google_phone_score = 0
        self.google_phone_similarity_score = 0
        self.google_webpage = ""
        self.google_webpage_score = 0
        self.google_webpage_similarity_score = 0
        self.google_category = []
        self.google_category_score = 0
        self.google_description = ""
        self.google_description_score = 0
        self.google_description_similarity_score = 0
        self.google_schedule = ""
        self.google_schedule_score = 0
        self.google_maps_score = 6

        self.yelp_name = ""
        self.yelp_name_score = 0
        self.yelp_name_similarity_score = 0
        self.yelp_address = ""
        self.yelp_address_score = 0
        self.yelp_address_similarity_score = 0
        self.yelp_state = ""
        self.yelp_state_score = 0
        self.yelp_state_similarity_score = 0
        self.yelp_phone = ""
        self.yelp_phone_score = 0
        self.yelp_phone_similarity_score = 0
        self.yelp_webpage = ""
        self.yelp_webpage_score = 0
        self.yelp_webpage_similarity_score = 0
        self.yelp_category = []
        self.yelp_category_score = 0
        self.yelp_description = ""
        self.yelp_description_score = 0
        self.yelp_schedule = ""
        self.yelp_schedule_score = 0

        self.instagram_data = []
        self.instagram_name_score = 0
        self.instagram_webpage_score = 0
        self.instagram_category_score = 0
        self.instagram_score = 0

        self.facebook_data = []
        self.facebook_name_score = 0
        self.facebook_webpage_score = 0
        self.facebook_category_score = 0
        self.facebook_info_score = 0
        self.facebook_address_score = 0
        self.facebook_state_score = 0
        self.facebook_phone_score = 0
        self.facebook_score = 0

        self.facebook_address = ""
        self.facebook_state = ""

        self.church_search_results = []
        self.domain_organic_keywords = []

        self.maps_score = 0
        self.voice_score = 0
        self.domain_trust_score = 0
        self.social_clarity_score = 0

        self.digital_search_assesment_score = 0

    def get_map_image(self):
        if self.google_coordinates == "":
            return None
        
        file_name = str(uuid.uuid4()) + '.png'
        base_url = "https://maps.googleapis.com/maps/api/staticmap?"
        style = "&format=png&maptype=roadmap&style=visibility:simplified&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text%7Csaturation:-5%7Clightness:-5&style=element:labels.text.fill%7Ccolor:0xb5b5b5&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e"
        center = str(self.coordinates[0]) + "," + str(self.coordinates[1])
        zoom = 10
        marker = "&markers=color:gray%7C" + \
            str(self.google_coordinates[0]) + \
            "," + str(self.google_coordinates[1])
        complete_url = base_url + "center=" + center + "&zoom=" + \
            str(zoom) + "&size=640x360&scale=2&key=" + \
            GOOGLE_MAPS_KEY + style + marker
        request_map = requests.get(complete_url)
        image_name = f"../public/map_background_report/{file_name}"
        image_file = open(image_name, 'wb')
        image_file.write(request_map.content)
        image_file.close()

        s3 = boto3.client('s3')
        bucket_name = 'vr-digital-health-files'
        key = 'map_images/' + file_name
        s3.upload_file(image_name, bucket_name, key, ExtraArgs={'ContentType': 'image/png'})
        print(f'Image uploaded to https://s3.amazonaws.com/{bucket_name}/{key}')

        os.remove(image_name)
        self.map_image = file_name
        return file_name
        
    def get_weighted_average(self, request_result):

        data_string = request_result.decode('utf-8')

        # Split the data by lines
        lines = data_string.splitlines()

        # Skip the header line
        data_lines = lines[1:]

        # Create an empty dictionary to store the data
        result_dict = {}
        weighted = 0
        weights = 0
        # Loop through each data line
        for line in enumerate(data_lines):
            # Split the line by semicolon
            auth_score, backlinks = line[1].split(';')
            # Convert the key and value to integers
            weighted += int(auth_score) * int(backlinks)
            weights += int(backlinks)
        weighted_average = weighted / weights

        return int(weighted_average*2.5)

    def get_semrush_authority_score(self):
        url = "https://api.semrush.com/analytics/v1/?key=" + SEMRUSH_API_KEY + \
            "&type=backlinks_ascore_profile&target=" + \
            self.webpage + "&target_type=root_domain"
        auth_score_result = requests.get(url)
        self.domain_trust_score = self.get_weighted_average(auth_score_result.content)
        return self.domain_trust_score

    def get_top_keywords(self, organic_results):
        lines = organic_results.splitlines()

        # Skip the header line
        data_lines = lines[1:]

        # Create an empty dictionary to store the data
        keywords = []
        # Loop through each data line
        for line in enumerate(data_lines):
            # Split the line by semicolon
            keyword = line[1].split(';')[0]

            keywords.append(keyword)
        keywords = ",".join([item for item in keywords])

        return keywords

    def get_semrush_domain_organic_results(self):
        print("Getting organic results")
        url = "https://api.semrush.com/?type=domain_organic&key=" + SEMRUSH_API_KEY + \
            "&display_limit=10&export_columns=Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td&domain=" + \
            self.webpage + "&display_sort=tr_desc&database=us"
        top_organic_results = requests.get(url)
        self.domain_organic_keywords = self.get_top_keywords(top_organic_results.text)
        return self.domain_organic_keywords

    def get_digital_search_assesment_score(self):
        self.standarize_initial_address()
        self.set_coordinates()

        executors_list = []
        with ThreadPoolExecutor() as executor:
            executors_list.append(executor.submit(self.get_semrush_domain_organic_results))
            executors_list.append(executor.submit(self.get_domain_trust_score))
            executors_list.append(executor.submit(self.get_maps_score))
            executors_list.append(executor.submit(self.get_voice_score))
            executors_list.append(executor.submit(self.get_facebook_data, APIFY_TOKEN))
            executors_list.append(executor.submit(self.get_instagram_data, APIFY_TOKEN))

        self.get_social_clarity_score()

        self.digital_search_assesment_score += \
            self.domain_trust_score + \
            self.maps_score + \
            self.voice_score + \
            self.social_clarity_score

    def set_coordinates(self):
        if self.coordinates == "":
            location_retriever = pgeocode.Nominatim(country='us')
            location_info_zipcode = location_retriever.query_postal_code(self.zipcode)
            self.coordinates = (location_info_zipcode["latitude"], location_info_zipcode["longitude"])

    def find_all_letters(self, text_list):
        """
        This function takes a list of strings and returns a list containing only the strings
        with only letters (a-zA-Z).
        """
        pattern = r"[a-zA-Z]+"  # Matches one or more letters (a-z and A-Z)
        return [text for text in text_list if re.match(pattern, text)]

    def extract_country(self, address):
        """
        This function uses a regular expression to extract the country name from an address string,
        assuming the country is most likely "US" or "United States" at the end.

        Args:
            address: The address string to process.

        Returns:
            The extracted country name ("US" or "United States") or None if not found.
        """
        pattern = "\b(US|United States)\b"  # Matches either "US" or "United States" with word boundaries
        # Case-insensitive search
        match = re.search(pattern, address, flags=re.IGNORECASE)
        return match.group(0) if match else None

    def extract_zipcode(self, address):
        """
        Extracts the zip code from a given address string.

        Args:
            address (str): The address string from which to extract the zip code.

        Returns:
            str: The extracted zip code, or None if no zip code is found.
        """

        # Define a regular expression pattern to match US zip codes (5 digits or 5 digits with a hyphen and 4 digits)
        zipcode_regex = r"\d{5}(?:-\d{4})?"

        # Search for the zip code pattern in the address string
        match = re.search(zipcode_regex, address)

        # If a match is found, return the extracted zip code
        if match:
            return match.group()
        else:
            return None

    def clean_address(self, address):
        if address == "" or address == None:
            return ""
        
        # Lowercase the address and remove extra spaces
        address = address.lower().strip()

        # Replace common abbreviations with full words
        address_abbreviations = {
            "ave.": "Avenue",
            "blvd.": "Boulevard",
            "cir.": "Circle",
            "ct.": "Court",
            "dr.": "Drive",
            "hwy.": "Highway",
            "ln.": "Lane",
            "pkwy.": "Parkway",
            "pl.": "Place",
            "rd.": "Road",
            "sq.": "Square",
            "st.": "Street",
            "e.": "East",
            "n.": "North",
            "s.": "South",
            "w.": "West",
            "ne": "Northeast",
            "nw": "Northwest",
            "se": "Southeast",
            "sw": "Southwest",
            "apt.": "Apartment",
            "ste.": "Suite",
            "bldg.": "Building",
            "#": "Number",
            "c/o": "Care Of",
            "po box": "Post Office Box"
        }
        for abbrev, full_word in address_abbreviations.items():
            address = address.replace(abbrev, full_word)

        # Remove punctuation
        punctuation = ",;:."
        for char in punctuation:
            address = address.replace(char, "")

        return address

    def clean_name(self, text):
        cleaned_text = text.lower()
        return cleaned_text

    def clean_phone_number(self, phone_number):
        return re.sub(r'\D', '', phone_number)

    def text_similarity(self, text_1, text_2, threshold=80):
        """
        Calculates the similarity between two addresses using fuzzy matching.

        Args:
            text_1 (str): The address provided by the customer.
            text_2 (str): The address retrieved from Google Maps.
            threshold (int, optional): The minimum similarity score for addresses to be considered similar. Defaults to 80.

        Returns:
            bool: True if the addresses are similar, False otherwise.
        """

        if text_1 == "" or text_2 == "":
            return 0
        
        # Clean both addresses
        cleaned_text_1 = self.clean_address(text_1)
        cleaned_text_2 = self.clean_address(text_2)

        # Calculate similarity score using Levenshtein distance
        similarity_score = fuzz.ratio(cleaned_text_1, cleaned_text_2)

        return similarity_score

    def name_similarity(self, input_name):
        cleaned_input_name = self.clean_name(input_name)
        cleaned_name = self.clean_name(self.name)

        similarity_score = self.text_similarity(cleaned_input_name, cleaned_name)
        return similarity_score

    def address_similarity(self, map_adress, source):
        response = self.parse_address(map_adress)
        if response.get('results') != None:
            if len(response.get('results')) > 0 and response.get('results')[0].get('rank').get('confidence') >= 0.9:
                result = response.get('results')[0]

                if source == "google":
                    self.google_parsed_address = result
                    self.google_address = result.get('address_line1')
                    self.google_state = result.get('state')
                    self.google_coordinates = (result.get('lat'), result.get('lon'))

                elif source == "apple":
                    self.apple_parsed_address = result
                    self.apple_address = result.get('address_line1')
                    self.apple_state = result.get('state')

                elif source == "yelp":
                    self.yelp_parsed_address = result
                    self.yelp_address = result.get('address_line1')
                    self.yelp_state = result.get('state')

                elif source == "facebook":
                    self.facebook_parsed_address = result
                    self.facebook_address = result.get('address_line1')
                    self.facebook_state = result.get('state')

                # Calculate similarity score using Levenshtein distance
                address_similarity = self.text_similarity(self.address, result.get('address_line1'))
                return address_similarity
        return 0

    def get_yelp_name_score(self):
        name_similarity_value = self.name_similarity(self.yelp_name)
        self.yelp_name_similarity_score = name_similarity_value
        self.yelp_name_score = YELP_NAME_VALUE * (name_similarity_value > 95)
        if self.yelp_name_score == 0 and self.name.lower() in self.yelp_name.lower():
            self.yelp_name_score = YELP_NAME_VALUE
        return self.yelp_name_score

    def get_yelp_category_score(self):
        for cat_element in self.yelp_category:
            if "church" in cat_element.lower():
                self.yelp_category_score = YELP_CATEGORY_VALUE
                return self.yelp_category_score

    def get_yelp_about_score(self):
        if len(self.yelp_description) > 0:
            self.yelp_description_score = YELP_ABOUT_VALUE
            return self.yelp_description_score

    def get_yelp_schedule_score(self):
        for sched_el in self.yelp_schedule:
            if (sched_el.get("day")).lower() == "sun":
                if len(sched_el.get("hours")) > 0 and sched_el.get("hours") != "Closed":
                    self.yelp_schedule_score = YELP_SCHEDULE_VALUE
                    return self.yelp_schedule_score

    def get_yelp_webpage_score(self):
        if self.yelp_webpage != "" and self.yelp_webpage != None:
            self.yelp_webpage_similarity_score = self.text_similarity(self.webpage, self.yelp_webpage)
            if self.yelp_webpage_similarity_score >= 85:
                self.yelp_webpage_score = YELP_WEBPAGE_VALUE
                return self.yelp_webpage_score

    def get_yelp_phone_score(self):
        self.phone = self.clean_phone_number(self.phone)
        self.yelp_phone_similarity_score = self.text_similarity(self.phone, self.yelp_phone)
        if self.yelp_phone_similarity_score >= 95:
            self.yelp_phone_score = YELP_PHONE_VALUE
            return self.yelp_phone_score

    def get_yelp_address_score(self):
        self.yelp_address_similarity_score = self.address_similarity(self.yelp_address, 'yelp')
        if self.yelp_address_similarity_score >= 85:
            self.yelp_address_score = YELP_ADDRESS_VALUE
            return self.yelp_address_score

    def get_yelp_state_score(self):
        self.yelp_state_similarity_score = self.text_similarity(self.state, self.yelp_state)
        if self.yelp_state_similarity_score >= 95:
            self.yelp_state_score = YELP_STATE_VALUE
            return self.yelp_state_score

    def get_yelp_score(self):
        self.set_yelp_search()
        self.get_yelp_name_score()
        self.get_yelp_category_score()
        self.get_yelp_about_score()
        self.get_yelp_schedule_score()
        self.get_yelp_webpage_score()
        self.get_yelp_phone_score()
        self.get_yelp_address_score()
        self.get_yelp_state_score()

    def get_voice_score(self):
        print("Getting voice score")
        self.get_yelp_score()
        self.voice_score += \
            self.yelp_name_score + \
            self.yelp_category_score + \
            self.yelp_description_score + \
            self.yelp_schedule_score + \
            self.yelp_webpage_score + \
            self.yelp_phone_score + \
            self.yelp_address_score + \
            self.yelp_state_score

    def get_google_name_score(self):
        self.google_name = unquote(self.google_name).replace("’", "'")
        name_similarity_value = self.name_similarity(self.google_name)
        self.google_name_similarity_score = name_similarity_value
        self.google_name_score = GOOGLE_NAME_VALUE * (name_similarity_value > 95)
        if self.google_name_score == 0 and self.name.lower() in self.google_name.lower():
            self.google_name_score = GOOGLE_NAME_VALUE
        return self.google_name_score

    def get_google_category_score(self):
        for cat_element in self.google_category:
            if "church" in cat_element.lower() or "religious" in cat_element.lower():
                self.google_category_score = GOOGLE_CATEGORY_VALUE
                return self.google_category_score

    def get_google_about_score(self):
        self.google_description_similarity_score = self.text_similarity(self.google_description, self.apple_description)
        if self.google_description_similarity_score >= 90:
            self.google_description_score = GOOGLE_ABOUT_VALUE
            return self.google_description_score

    def get_google_schedule_score(self):
        for sched_el in self.google_schedule:
            if sched_el.get("sunday", "") != None and sched_el.get("sunday", "") != "Closed":
                # if len(sched_el.get("hours", "")) > 0:
                self.google_schedule_score = GOOGLE_SCHEDULE_VALUE
                return self.google_schedule_score

    def get_google_webpage_score(self):
        self.google_webpage_similarity_score = self.text_similarity(self.webpage, self.google_webpage)
        if self.google_webpage_similarity_score >= 85:
            self.google_webpage_score = GOOGLE_WEBPAGE_VALUE
            return self.google_webpage_score

    def get_google_phone_score(self):
        self.phone = self.clean_phone_number(self.phone)
        self.google_phone_similarity_score = self.text_similarity(self.phone, self.google_phone)
        if self.google_phone_similarity_score >= 95:
            self.google_phone_score = GOOGLE_PHONE_VALUE
            return self.google_phone_score

    def get_google_addres_score(self):
        self.google_address_similarity_score = self.address_similarity(self.google_address, 'google')
        if self.google_address_similarity_score >= 85:
            self.google_address_score = GOOGLE_ADDRESS_VALUE
            return self.google_address_score

    def get_google_state_score(self):
        self.google_state_similarity_score = self.text_similarity(self.state, self.google_state)
        if self.google_state_similarity_score >= 95:
            self.google_state_score = GOOGLE_STATE_VALUE
            return self.google_state_score

    def get_google_score(self):
        self.set_google_maps_att()
        self.get_google_addres_score()
        self.get_google_name_score()
        self.get_google_category_score()
        self.get_google_about_score()
        self.get_google_schedule_score()
        self.get_google_webpage_score()
        self.get_google_phone_score()
        self.get_google_state_score()

    def get_apple_name_score(self):
        self.apple_name = unquote(self.apple_name).replace("’", "'")
        name_similarity_value = self.name_similarity(self.apple_name)
        self.apple_name_similarity_score = name_similarity_value
        self.apple_name_score = APPLE_NAME_VALUE * (name_similarity_value > 95)
        if self.apple_name_score == 0 and self.name.lower() in self.apple_name.lower():
            self.apple_name_score = APPLE_NAME_VALUE
        return self.apple_name_score

    def get_apple_category_score(self):
        for cat_element in self.apple_category:
            if "church" in cat_element.lower() or "religious" in cat_element.lower():
                self.apple_category_score = APPLE_CATEGORY_VALUE
                return self.apple_category_score

    def get_apple_about_score(self):
        self.apple_description_similarity_score = self.text_similarity(self.apple_description, self.google_description)
        if self.text_similarity(self.apple_description, self.google_description) >= 90:
            self.apple_description_score = APPLE_ABOUT_VALUE
            return self.apple_description_score

    def get_apple_schedule_score(self):
        if len(self.apple_schedule) > 0:
            if len(self.apple_schedule.get("sunday", "")) > 0:
                self.apple_schedule_score = APPLE_SCHEDULE_VALUE
                return self.apple_schedule_score

    def get_apple_webpage_score(self):
        self.apple_webpage_similarity_score = self.text_similarity(self.webpage, self.apple_webpage)
        if self.text_similarity(self.webpage, self.apple_webpage) >= 80:
            self.apple_webpage_score = APPLE_WEBPAGE_VALUE
            return self.apple_webpage_score

    def get_apple_phone_score(self):
        self.phone = self.clean_phone_number(self.phone)
        self.apple_phone_similarity_score = self.text_similarity(self.phone, self.apple_phone)
        if self.text_similarity(self.phone, self.apple_phone) >= 95:
            self.apple_phone_score = APPLE_PHONE_VALUE
            return self.apple_phone_score

    def get_apple_addres_score(self):
        self.apple_address_similarity_score = self.address_similarity(self.apple_address, 'apple')
        if self.apple_address_similarity_score >= 85:
            self.apple_address_score = APPLE_ADDRESS_VALUE
            return self.apple_address_score

    def get_apple_state_score(self):
        self.apple_state_similarity_score = self.text_similarity(self.state, self.apple_state)
        if self.apple_state_similarity_score >= 95:
            self.apple_state_score = APPLE_STATE_VALUE
            return self.apple_state_score

    def get_apple_score(self):
        self.set_duckduckgo_maps_att()
        self.get_apple_addres_score()
        self.get_apple_name_score()
        self.get_apple_category_score()
        self.get_apple_about_score()
        self.get_apple_schedule_score()
        self.get_apple_webpage_score()
        self.get_apple_phone_score()
        self.get_apple_state_score()

    def get_maps_score(self):
        print("Getting maps score")
        self.get_google_score()
        self.get_apple_score()
        self.apple_maps_score += \
            self.apple_name_score + \
            self.apple_category_score + \
            self.apple_description_score + \
            self.apple_schedule_score + \
            self.apple_webpage_score + \
            self.apple_phone_score + \
            self.apple_address_score + \
            self.apple_state_score
        self.google_maps_score += \
            self.google_name_score + \
            self.google_category_score + \
            self.google_description_score + \
            self.google_schedule_score + \
            self.google_webpage_score + \
            self.google_phone_score + \
            self.google_address_score + \
            self.google_state_score
        self.maps_score += (self.apple_maps_score + self.google_maps_score)

    def set_duckduckgo_maps_att(self):
        params = {
            "engine": "duckduckgo_maps",
            "q": self.name,
            "lat": self.coordinates[0],
            "lon": self.coordinates[1],
            "api_key": SERPAPI_API_KEY,
            "strict": 0
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        local_results = results.get("local_results")
        if local_results is not None:
            if len(local_results) > 0:
                sources = local_results[0]["source"]
                for source in sources:
                    source_name = source.get("name", "")
                    if "apple" in source_name.lower():
                        self.apple_name = local_results[0].get("title")
                        try:
                            self.apple_address = local_results[0].get('address', '')
                        except IndexError:
                            pass
                        allowed_chars = string.digits
                        self.apple_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", local_results[0].get("phone", ""))
                        self.apple_webpage = local_results[0].get("website")
                        try:
                            self.apple_category = [category for category in local_results[0].get("types")]
                            self.apple_category.append(local_results[0].get("type"))
                        except:
                            pass
                        self.apple_description = local_results[0].get("description", "")
                        self.apple_schedule = local_results[0].get("operating_hours", "")

    def set_google_maps_att(self):
        params = {
            "engine": "google_maps",
            "google_domain": "google.com",
            "q": self.name,
            "ll": "@" + str(self.coordinates[0]) + "," + str(self.coordinates[1]) + "," + "15.1z",
            "api_key": SERPAPI_API_KEY,
            "hl": "en"
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        local_results = results.get("local_results", "")
        place_results = results.get("place_results", "")

        # no results found
        if local_results == "" and place_results == "":
            return

        # local results found, assume first one is the correct one and get specific place results for it
        if local_results != "":
            place_id = local_results[0].get("place_id", "")
            params = {
                "engine": "google_maps",
                "google_domain": "google.com",
                "q": self.name,
                "ll": "@" + str(self.coordinates[0]) + "," + str(self.coordinates[1]) + "," + "15.1z",
                "api_key": SERPAPI_API_KEY,
                "hl": "en",
                "place_id": place_id
            }
            search = GoogleSearch(params)
            results = search.get_dict()

            place_results = results.get("place_results", "")
            self.parse_google_place_results(place_results)

        else:
            place_results = results.get("place_results", "")
            self.parse_google_place_results(place_results)

    def parse_google_place_results(self, place_results):
        self.google_name = place_results.get("title")
        self.google_coordinates = (place_results["gps_coordinates"]["latitude"], place_results["gps_coordinates"]["longitude"])

        try:
            self.google_address = place_results.get('address', '')
        except IndexError:
            pass

        allowed_chars = string.digits
        self.google_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", place_results.get("phone", "")).replace(" ", "")
        self.google_webpage = place_results.get("website")
        self.google_category = [category for category in place_results.get("type")]
        self.google_description = place_results.get("description", "")
        self.google_schedule = place_results.get("hours", "")

    def set_yelp_search(self):
        params = {
            "api_key": SERPAPI_API_KEY,
            "engine": "yelp",
            "find_loc": self.city + ", " + self.state,
            "find_desc": self.name
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        organic_results = results.get("organic_results", "")
        name_simil = []
        if len(organic_results) > 0:
            for organic_result in organic_results:
                name_simil.append(self.name_similarity(organic_result.get("title", "")))

            organic_result_simil_idx = np.argmax(np.array(name_simil))
            most_similar_result = organic_results[organic_result_simil_idx]
            if name_simil[organic_result_simil_idx] < 75:
                return
            place_id = most_similar_result.get("place_ids", "")[0]

            params = {
                "api_key": SERPAPI_API_KEY,
                "engine": "yelp_place",
                "place_id": place_id
            }

            search = GoogleSearch(params)
            try:
                result = search.get_dict()
                place_result = result.get("place_results", "")
                self.yelp_name = place_result.get("name")
                self.yelp_address = place_result.get("address", "")
                allowed_chars = string.digits
                self.yelp_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", place_result.get("phone", "")).replace(" ", "")
                self.yelp_webpage = place_result.get("website")
                # self.yelp_rating = place_result.get("rating", "")

                self.yelp_category = [category.get("title", "") for category in place_result.get("categories", "")]
                self.yelp_description = place_result.get("about", "")

                if len(place_result.get("operation_hours", "")) > 0:
                    self.yelp_schedule = place_result.get("operation_hours", "").get("hours", "")
            except:
                pass

    def write_object_to_json(self):
        file_name = str(uuid.uuid4()) + '.json'
        data = {key: value for key, value in self.__dict__.items()
                if not callable(value)}

        with open('../public/data/' + file_name, 'w') as f:
            json.dump(data, f)
        
        s3 = boto3.client('s3')
        bucket_name = 'vr-digital-health-files'
        key = 'data/' + file_name
        s3.upload_file('../public/data/' + file_name, bucket_name, key, ExtraArgs={'ContentType': 'application/json'})
        print(f'JSON file uploaded to /{bucket_name}/{key}')

        os.remove('../public/data/' + file_name)
        self.data_file = file_name
        return file_name

    def standarize_initial_address(self):
        full_address = f'{self.address} {self.city} {self.state} {self.zipcode}'

        response = self.parse_address(full_address)
        if response.get('results') != None and len(response.get('results')) > 0 and response.get('results')[0].get('rank').get('confidence') >= 0.9:
            result = response.get('results')[0]
            self.parsed_address = result
            self.original_address = full_address
            self.address = result.get('address_line1')
            self.city = result.get('city')
            self.state = result.get('state')
            self.zipcode = result.get('postcode')
            self.coordinates = (result.get('lat'), result.get('lon'))
        # else:
        #     print(json.dumps(response, indent=4))

    def parse_address(self, addressString):
        url = 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + quote(addressString) + \
            '&filter=countrycode:us&format=json&apiKey=' + GEOAPIFY_API_KEY
        headers = CaseInsensitiveDict()
        headers["Accept"] = "application/json"
        response = requests.get(url, headers=headers)
        data = response.json()
        return data

    def get_domain_trust_score(self):
        print('Getting domain trust score')
        url = f"https://serpapi.com/search?engine=google_maps&google_domain=google.com&q=church&ll=@{self.coordinates[0]},{self.coordinates[1]},15.1z&api_key={SERPAPI_API_KEY}&hl=en&type=search"
        response = requests.request("GET", url)
        results = response.json()
        self.church_search_results = []
        for result in results.get("local_results"):
            if (result.get("position") > 10):
                break
            self.church_search_results.append(f"{result.get('position')} - {result.get('title')} - {str(self.name_similarity(result.get('title')))}")
            if self.name_similarity(result.get("title")) > 95:
                self.domain_trust_score = 275 - result.get("position") * 25
                break
            if self.name.lower() in result.get("title").lower():
                self.domain_trust_score = 275 - result.get("position") * 25
                break
        if self.domain_trust_score < 0:
            self.domain_trust_score = 0
        return self.domain_trust_score

    def get_facebook_data(self, token):
        print('Getting facebook data')
        if self.facebook_profile == "" or self.facebook_profile == None:
            return
        url = "https://api.apify.com/v2/acts/apify~facebook-pages-scraper/run-sync-get-dataset-items?token=" + token
        payload = '{"startUrls": [{"url": "https://www.facebook.com/' + self.facebook_profile + '"}]}'
        headers = {'Content-Type': 'application/json'}
        # proxy_group = "RESIDENTIAL"
        proxy_group = "BUYPROXIES94952"
        proxies = {
            'http': 'http://groups-' + proxy_group + ':apify_proxy_tFJ7WaDa0vfaXaywtmenDA81s7UYc54Ex8Lf@proxy.apify.com:8000',
            'https': 'http://groups-' + proxy_group + ':apify_proxy_tFJ7WaDa0vfaXaywtmenDA81s7UYc54Ex8Lf@proxy.apify.com:8000'
        }
        try:
            response = requests.request("POST", url, headers=headers, data=payload, proxies=proxies, timeout=120)
            fb_results = response.json()
            self.facebook_data = fb_results
            print('Got facebook data')
        except Exception as e:
            print(e)

    def get_instagram_data(self, token):
        print('Getting instagram data')
        if self.instagram_profile == "" or self.instagram_profile == None:
            return
        url = "https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=" + token + "&omit=relatedProfiles,latestIgtvVideos,postsCount,latestPosts"
        payload = '{"usernames":["' + self.instagram_profile + '"]}'
        headers = {'Content-Type': 'application/json'}
        # proxy_group = "RESIDENTIAL"
        proxy_group = "BUYPROXIES94952"
        proxies = {
            'http': 'http://groups-' + proxy_group + ':apify_proxy_tFJ7WaDa0vfaXaywtmenDA81s7UYc54Ex8Lf@proxy.apify.com:8000',
            'https': 'http://groups-' + proxy_group + ':apify_proxy_tFJ7WaDa0vfaXaywtmenDA81s7UYc54Ex8Lf@proxy.apify.com:8000'
        }
        try:
            response = requests.request("POST", url, headers=headers, data=payload, proxies=proxies, timeout=120)
            insta_results = response.json()
            self.instagram_data = insta_results
            print('Got instagram data')
        except Exception as e:
            print(e)

    def get_social_clarity_score(self):
        if self.instagram_data == None or len(self.instagram_data) == 0:
            return
        self.instagram_data = self.instagram_data[0]

        try:
            self.get_instagram_name_score()
            self.get_instagram_category_score()
            self.get_instagram_webpage_score()
        except Exception as e:
            print(e)

        if self.facebook_data == None or len(self.facebook_data) == 0:
            return
        self.facebook_data = self.facebook_data[0]

        try:
            self.get_facebook_name_score()
            self.get_facebook_category_score()
            self.get_facebook_webpage_score()
            self.get_facebook_info_score()
            self.get_facebook_address_score()
            self.get_facebook_state_score()
            self.get_facebook_phone_score()
        except Exception as e:
            print(e)

        self.instagram_score = \
            self.instagram_name_score + \
            self.instagram_category_score + \
            self.instagram_webpage_score
        
        self.facebook_score = \
            self.facebook_name_score + \
            self.facebook_category_score + \
            self.facebook_webpage_score + \
            self.facebook_info_score + \
            self.facebook_address_score + \
            self.facebook_state_score + \
            self.facebook_phone_score
        

        self.social_clarity_score = self.instagram_score + self.facebook_score
        
    def get_instagram_name_score(self):
        self.instagram_name = self.instagram_data.get("fullName", "")
        self.instagram_name = unquote(self.instagram_name).replace("’", "'")
        self.instagram_name_similarity_score = self.name_similarity(self.instagram_name)
        self.instagram_name_score = SOCIAL_INSTAGRAM_NAME_VALUE * (self.instagram_name_similarity_score > 95)
        if self.instagram_name_score == 0 and self.name.lower() in self.instagram_name.lower():
            self.facebook_name_score = SOCIAL_INSTAGRAM_NAME_VALUE

    def get_instagram_category_score(self):
        self.instagram_category = self.instagram_data.get("businessCategoryName", "")
        if "church" in self.instagram_category.lower() or "religious" in self.instagram_category.lower():
            self.instagram_category_score = SOCIAL_INSTAGRAM_CATEGORY_VALUE

    def get_instagram_webpage_score(self):
        self.instagram_webpage = self.instagram_data.get("externalUrl", "")
        if not self.instagram_webpage.startswith("https://"):
            self.instagram_webpage = "https://" + self.instagram_webpage
        self.instagram_webpage_similarity_score = self.text_similarity(self.webpage, self.instagram_webpage)
        if self.instagram_webpage_similarity_score >= 85:
            self.instagram_webpage_score = SOCIAL_INSTAGRAM_WEBPAGE_VALUE

    def get_facebook_name_score(self):
        self.facebook_name = self.facebook_data.get("title", "")
        self.facebook_name = unquote(self.facebook_name).replace("’", "'")
        self.facebook_name_similarity_score = self.name_similarity(self.facebook_name)
        self.facebook_name_score = SOCIAL_FACEBOOK_NAME_VALUE * (self.facebook_name_similarity_score > 95)
        if self.facebook_name_score == 0 and self.name.lower() in self.facebook_name.lower():
            self.facebook_name_score = SOCIAL_FACEBOOK_NAME_VALUE

    def get_facebook_category_score(self):
        self.facebook_categories = self.facebook_data.get("categories", [])
        for category in self.facebook_categories:
            if "church" in category.lower() or "religious" in category.lower():
                self.facebook_category_score = SOCIAL_FACEBOOK_CATEGORY_VALUE

    def get_facebook_webpage_score(self):
        self.facebook_webpage = self.facebook_data.get("website", "")
        if not self.facebook_webpage.startswith("https://"):
            self.facebook_webpage = "https://" + self.facebook_webpage
        self.facebook_webpage_similarity_score = self.text_similarity(self.webpage, self.facebook_webpage)
        if self.facebook_webpage_similarity_score >= 85:
            self.facebook_webpage_score = SOCIAL_FACEBOOK_WEBPAGE_VALUE

    def get_facebook_info_score(self):
        self.facebook_info = self.facebook_data.get("info", [])
        for info in self.facebook_info:
            if self.name.lower() in info.lower():
                self.facebook_info_score = SOCIAL_FACEBOOK_INFO_VALUE

    def get_facebook_address_score(self):
        url_pattern = r'https?://\S+'
        self.facebook_address = self.facebook_data.get("address", "")
        self.facebook_address = re.sub(url_pattern, '', self.facebook_address)

        self.facebook_address_similarity_score = self.address_similarity(self.facebook_address, 'facebook')
        if self.facebook_address_similarity_score >= 85:
            self.facebook_address_score = SOCIAL_FACEBOOK_ADDRESS_VALUE

    def get_facebook_state_score(self):
        self.facebook_state_similarity_score = self.text_similarity(self.state, self.facebook_state)
        if self.facebook_state_similarity_score >= 95:
            self.facebook_state_score = SOCIAL_FACEBOOK_STATE_VALUE
        
    def get_facebook_phone_score(self):
        self.phone = self.clean_phone_number(self.phone)
        self.facebook_phone = self.facebook_data.get("phone", "")
        self.facebook_phone = self.clean_phone_number(self.facebook_phone)
        self.facebook_phone_similarity_score = self.text_similarity(self.phone, self.facebook_phone)
        if self.facebook_phone_similarity_score >= 95:
            self.facebook_phone_score = SOCIAL_FACEBOOK_PHONE_VALUE
