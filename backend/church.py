from serpapi import GoogleSearch
import pgeocode
import re
import string
from fuzzywuzzy import fuzz
import numpy as np
import requests
import os
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

class church:
    
    def __init__(self, name = '', address = '', city = '', state = '', zipcode = '', webpage = '', phone = '', size = '', facebook_profile = '', instagram_profile = '', first_name = '', last_name = '', mobile_phone = '', email = '') -> None:
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

        self.apple_name = ""
        self.apple_coordinates = ""
        self.apple_address = ""
        self.apple_city = ""
        self.apple_state = ""
        self.apple_zipcode = ""
        self.apple_phone = ""
        self.apple_webpage = ""
        self.apple_rating = ""
        self.apple_category = []
        self.apple_description = ""
        self.apple_schedule = ""

        self.apple_name_score = 0
        self.apple_coordinates_score = 0
        self.apple_address_score = 0
        self.apple_city_score = 0
        self.apple_state_score = 0
        self.apple_zipcode_score = 0
        self.apple_phone_score = 0
        self.apple_webpage_score = 0
        self.apple_rating_score = 0
        self.apple_category_score = 0
        self.apple_description_score = 0
        self.apple_schedule_score = 0
        self.apple_maps_score = 0

        self.google_name = ""
        self.google_coordinates = ""
        self.google_address = ""
        self.google_city = ""
        self.google_state = ""
        self.google_zipcode = ""
        self.google_phone = ""
        self.google_webpage = ""
        self.google_rating = ""
        self.google_category = []
        self.google_description = ""
        self.google_schedule = ""

        self.google_name_score = 0
        self.google_coordinates_score = 0
        self.google_address_score = 0
        self.google_city_score = 0
        self.google_state_score = 0
        self.google_zipcode_score = 0
        self.google_phone_score = 0
        self.google_webpage_score = 0
        self.google_rating_score = 0
        self.google_category_score = 0
        self.google_description_score = 0
        self.google_schedule_score = 0
        self.google_maps_score = 0

        self.yelp_name = ""
        self.yelp_coordinates = ""
        self.yelp_address = ""
        self.yelp_city = ""
        self.yelp_state = ""
        self.yelp_zipcode = ""
        self.yelp_phone = ""
        self.yelp_webpage = ""
        self.yelp_rating = ""
        self.yelp_category = []
        self.yelp_description = ""
        self.yelp_schedule = ""

        self.yelp_name_score = 0
        self.yelp_address_score = 0 
        self.yelp_state_score = 0 
        self.yelp_phone_score = 0 
        self.yelp_webpage_score = 0 
        self.yelp_category_score = 0
        self.yelp_description_score = 0
        self.yelp_schedule_score = 0 

        self.maps_score = 22
        self.google_score = 0
        self.apple_score = 0
        self.voice_score = 34

        self.domain_trust_score = 0
        self.domain_organic_keywords = []

        self.digital_search_assesment_score = 0

    def get_map_image(self, email):
        base_url = "https://maps.googleapis.com/maps/api/staticmap?"
        style = "&format=png&maptype=roadmap&style=visibility:simplified&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text%7Csaturation:-5%7Clightness:-5&style=element:labels.text.fill%7Ccolor:0xb5b5b5&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e"
        center = str(self.coordinates[0]) + "," + str(self.coordinates[1])
        zoom = 10
        marker = "&markers=color:gray%7C" + str(self.google_coordinates[0]) + "," + str(self.google_coordinates[1])
        complete_url = base_url + "center=" + center + "&zoom=" + str(zoom) + "&size=640x360&scale=2&key=" + GOOGLE_MAPS_KEY + style + marker
        request_map = requests.get(complete_url)
        image_name = f"../public/map_background_report/map_back_{email}"
        image_file = open(image_name + '.png', 'wb')
        image_file.write(request_map.content)
        image_file.close()




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
        url = "https://api.semrush.com/analytics/v1/?key=" + SEMRUSH_API_KEY + "&type=backlinks_ascore_profile&target=" + self.webpage + "&target_type=root_domain"
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
        url = "https://api.semrush.com/?type=domain_organic&key=" + SEMRUSH_API_KEY + "&display_limit=10&export_columns=Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td&domain=" + self.webpage + "&display_sort=tr_desc&database=us"
        top_organic_results = requests.get(url)
        self.domain_organic_keywords = self.get_top_keywords(top_organic_results.text)
        return self.domain_organic_keywords

    def get_digital_search_assesment_score(self):
        self.set_coordinates()
        self.get_semrush_domain_organic_results()
        self.get_semrush_authority_score()
        self.get_maps_score()
        self.get_voice_score()
        self.digital_search_assesment_score += self.domain_trust_score + self.maps_score + self.voice_score

    def set_coordinates(self):
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
        pattern = "\b(US|United States)\b" # Matches either "US" or "United States" with word boundaries
        match = re.search(pattern, address, flags=re.IGNORECASE)  # Case-insensitive search
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
        """
        Cleans and standardizes the address string.

        Args:
            address (str): The address to be cleaned.

        Returns:
            str: The cleaned address string.
        """

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
    
    def address_similarity(self, map_adress):
        """
        Calculates the similarity between two addresses using fuzzy matching.

        Args:
            customer_address (str): The address provided by the customer.
            map_address (str): The address retrieved from Google Maps.
            threshold (int, optional): The minimum similarity score for addresses to be considered similar. Defaults to 80.

        Returns:
            bool: True if the addresses are similar, False otherwise.
        """

        # Clean both addresses
        cleaned_customer_address = self.clean_address(self.address)
        cleaned_map_address = self.clean_address(map_adress)

        # Calculate similarity score using Levenshtein distance
        address_similarity = self.text_similarity(cleaned_customer_address, cleaned_map_address)
        return address_similarity

    def get_yelp_name_score(self):
        name_similarity_value = self.name_similarity(self.yelp_name)
        self.yelp_name_score = 27 * (name_similarity_value > 95)
        return self.yelp_name_score
    
    def get_yelp_category_score(self):
        for cat_element in self.yelp_category:
            if "church" in cat_element.lower():
                self.yelp_category_score = 27
                return self.yelp_category_score
            
    def get_yelp_about_score(self):
        if len(self.yelp_description) > 0:
            self.yelp_description_score = 27
            return self.yelp_description_score
        
    def get_yelp_schedule_score(self):
        for sched_el in self.yelp_schedule:
            if (sched_el.get("day")).lower() == "sun":
                if len(sched_el.get("hours")) > 0:
                    self.yelp_schedule_score = 27
                    return self.yelp_schedule_score
                
    def get_yelp_webpage_score(self):
        if self.text_similarity(self.webpage, self.yelp_webpage) >= 85:
            self.yelp_webpage_score = 27
            return self.yelp_webpage_score
        
    def get_yelp_phone_score(self):
        if self.text_similarity(self.phone, self.yelp_phone) >= 95:
            self.yelp_phone_score = 27
            return self.yelp_phone_score
        
    def get_yelp_address_score(self):
        if self.address_similarity(self.yelp_address) >= 85:
            self.yelp_address_score = 27
            return self.yelp_address_score
        
    def get_yelp_state_score(self):
        if self.text_similarity(self.state, self.yelp_state) >= 95:
            self.yelp_state_score = 27
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
        self.get_yelp_score()
        self.voice_score += (self.yelp_name_score + self.yelp_category_score + self.yelp_description_score + self.yelp_schedule_score + self.yelp_webpage_score + self.yelp_phone_score + self.yelp_address_score + self.yelp_state_score)
        
    def get_google_name_score(self):
        name_similarity_value = self.name_similarity(self.google_name)
        self.google_name_score = 20 * (name_similarity_value > 95)
        return self.google_name_score
    
    def get_google_category_score(self):
        for cat_element in self.google_category:
            if "church" in cat_element.lower():
                self.google_category_score = 14
                return self.google_category_score
            
    def get_google_about_score(self):
        if self.text_similarity(self.google_description, self.apple_description) >= 90:
            self.google_description_score = 15
            return self.google_description_score
        
    def get_google_schedule_score(self):
        for sched_el in self.google_schedule:
            if len(sched_el.get("sunday", "")) > 0:
                if len(sched_el.get("hours", "")) > 0:
                    self.google_schedule_score = 14
                    return self.google_schedule_score
                
    def get_google_webpage_score(self):
        if self.text_similarity(self.webpage, self.google_webpage) >= 85:
            self.google_webpage_score = 14
            return self.google_webpage_score
        
    def get_google_phone_score(self):
        if self.text_similarity(self.phone, self.google_phone) >= 95:
            self.google_phone_score = 14
            return self.google_phone_score
        
    def get_google_addres_score(self):
        
        if self.address_similarity(self.google_address) >= 85:
            self.google_address_score = 14
            return self.google_address_score
        
    def get_google_state_score(self):
        if self.text_similarity(self.state, self.google_state) >= 95:
            self.google_state_score = 27
            return self.google_state_score
        
    def get_google_score(self):
        self.set_google_maps_att()
        self.get_google_name_score()
        self.get_google_category_score()
        self.get_google_about_score()
        self.get_google_schedule_score()
        self.get_google_webpage_score()
        self.get_google_phone_score()
        self.get_google_addres_score()
        self.get_google_state_score()
        
    def get_apple_name_score(self):
        name_similarity_value = self.name_similarity(self.apple_name)
        self.apple_name_score = 20 * (name_similarity_value > 95)
        return self.apple_name_score
    
    def get_apple_category_score(self):
        for cat_element in self.apple_category:
            if "church" in cat_element.lower():
                self.apple_category_score = 14
                return self.apple_category_score
            
    def get_apple_about_score(self):
        if self.text_similarity(self.apple_description, self.google_description) >= 90:
            self.apple_description_score = 15
            return self.apple_description_score
        
    def get_apple_schedule_score(self):
        if len(self.apple_schedule) > 0:
            if len(self.apple_schedule.get("sunday", "")) > 0:
                self.apple_schedule_score = 14
                return self.apple_schedule_score
                
                
    def get_apple_webpage_score(self):
        if self.text_similarity(self.webpage, self.apple_webpage) >= 85:
            self.apple_webpage_score = 14
            return self.apple_webpage_score
        
    def get_apple_phone_score(self):
        if self.text_similarity(self.phone, self.apple_phone) >= 95:
            self.apple_phone_score = 14
            return self.apple_phone_score
        
    def get_apple_addres_score(self):
        if self.address_similarity(self.apple_address) >= 85:
            self.apple_address_score = 14
            return self.apple_address_score
        
    def get_apple_state_score(self):
        if self.text_similarity(self.state, self.apple_state) >= 95:
            self.apple_state_score = 27
            return self.apple_state_score
        
    def get_apple_score(self):
        self.set_duckduckgo_maps_att()
        self.get_apple_name_score()
        self.get_apple_category_score()
        self.get_apple_about_score()
        self.get_apple_schedule_score()
        self.get_apple_webpage_score()
        self.get_apple_phone_score()
        self.get_apple_addres_score()
        self.get_apple_state_score()


    def get_maps_score(self):
        self.get_google_score()
        self.get_apple_score()
        self.apple_maps_score += self.apple_name_score + self.apple_category_score + self.apple_description_score + self.apple_schedule_score + self.apple_webpage_score 
        self.apple_maps_score += self.apple_phone_score + self.apple_address_score + self.apple_state_score
        self.google_maps_score += (self.google_name_score + self.google_category_score + self.google_description_score + self.google_schedule_score + self.google_webpage_score + self.google_phone_score + self.google_address_score + self.google_state_score)
        self.maps_score += (self.apple_maps_score + self.google_maps_score)

    def set_duckduckgo_maps_att(self):

        params = {
            "engine": "duckduckgo_maps",
            "q": self.name,
            "lat": self.coordinates[0],
            "lon": self.coordinates[1],
            "api_key": SERPAPI_API_KEY,
            "strict" : 0    
        }


        search = GoogleSearch(params)
        results = search.get_dict()

        local_results = results.get("local_results")
        if local_results is not None:
            if len(local_results) > 1:
                pass
            else:
                sources = local_results[0]["source"]
                
                for source in sources:
                    source_name = source.get("name", "")
                    if "apple" in source_name.lower():
                        
                        self.apple_name = local_results[0].get("title")
                        self.apple_coordinates = (local_results[0]["gps_coordinates"]["latitude"], local_results[0]["gps_coordinates"]["longitude"])
                        try:
                            self.apple_address =  local_results[0].get("address", "").split(",")[0]
                            if states_dic.get(local_results[0].get("address", "").split(", ")[2].split(" ")[0], "") == "":
                                self.apple_state = states_dic[local_results[0].get("address", "").split(", ")[3].split(" ")[0]]
                                self.apple_city = local_results[0].get("address", "").split(",")[2]  
                                self.apple_zipcode = local_results[0].get("address", "").split(",")[3].split(" ")[1]
                            else:
                                self.apple_state = states_dic[local_results[0].get("address", "").split(", ")[2].split(" ")[0]]
                                self.apple_city = local_results[0].get("address", "").split(",")[1]  
                                self.apple_zipcode = local_results[0].get("address", "").split(",")[2].split(" ")[1]

                            
                        except IndexError:
                            pass
                        allowed_chars = string.digits
                        self.apple_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", local_results[0].get("phone", ""))
                        self.apple_webpage = local_results[0].get("website")
                        self.apple_rating = local_results[0].get("rating", "")
                        self.apple_category = [category for category in local_results[0].get("types")]
                        self.apple_category.append(local_results[0].get("type"))
                        self.apple_description = local_results[0].get("description", "")
                        self.apple_schedule = local_results[0].get("operating_hours", "")

    

    def set_google_maps_att(self):

        params = {
            "engine": "google_maps",
            "google_domain" : "google.com",
            "q": self.name,
            "ll": "@" + str(self.coordinates[0]) + "," + str(self.coordinates[1]) + "," + "15.1z",
            "api_key": SERPAPI_API_KEY,
            "hl" : "en"
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        local_results = results.get("local_results", "")

        if results.get("place_results", "") is not None:
            if len(results.get("place_results", "")) == 0:
                place_id = local_results[0].get("place_id", "")
                params = {
                    "engine": "google_maps",
                    "google_domain" : "google.com",
                    "q": self.name,
                    "ll": "@" + str(self.coordinates[0]) + "," + str(self.coordinates[1]) + "," + "15.1z",
                    "api_key": SERPAPI_API_KEY,
                    "hl" : "en",
                    "place_id" : place_id
                }
                search = GoogleSearch(params)
                results = search.get_dict()

                place_results = results.get("place_results", "")

                self.google_name = place_results.get("title")
                self.google_coordinates = (place_results["gps_coordinates"]["latitude"], place_results["gps_coordinates"]["longitude"])
                

                try:
                    self.google_address =  place_results.get("address", "").split(",")[0]
                    self.google_city = place_results.get("address", "").split(",")[1]          
                    self.google_state = states_dic[self.find_all_letters(place_results.get("address", "").split(",")[2].split(" "))[0]]
                    self.google_zipcode = self.extract_zipcode(place_results.get("address", ""))
                except IndexError:
                    pass
                allowed_chars = string.digits
                self.google_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", place_results.get("phone", "")).replace(" ", "")
                self.google_webpage = place_results.get("website")
                self.google_rating = place_results.get("rating", "")
                self.google_category = [category for category in place_results.get("type")]
                self.google_description = place_results.get("description", "")
                self.google_schedule = place_results.get("hours", "")

            else:
                place_results = results.get("place_results", "")

                self.google_name = place_results.get("title")
                self.google_coordinates = (place_results["gps_coordinates"]["latitude"], place_results["gps_coordinates"]["longitude"])
                

                try:
                    self.google_address =  place_results.get("address", "").split(",")[0]
                    self.google_city = place_results.get("address", "").split(",")[1]          
                    self.google_state = states_dic[self.find_all_letters(place_results.get("address", "").split(",")[2].split(" "))[0]]
                    self.google_zipcode = self.extract_zipcode(place_results.get("address", ""))
                except IndexError:
                    pass
                allowed_chars = string.digits
                self.google_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", place_results.get("phone", "")).replace(" ", "")
                self.google_webpage = place_results.get("website")
                self.google_rating = place_results.get("rating", "")
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
            place_id = most_similar_result.get("place_ids", "")[0]

            params = {
            "api_key": SERPAPI_API_KEY,
            "engine": "yelp_place",
            "place_id": place_id
            }

            search = GoogleSearch(params)
            result = search.get_dict()
            place_result = result.get("place_results", "")

            self.yelp_name = place_result.get("name")
            try:
                self.yelp_address =  place_result.get("address", "").split(",")[0]
                self.yelp_city = place_result.get("address", "").split(",")[0].split(" ")[-1]          
                self.yelp_state = states_dic[self.find_all_letters(place_result.get("address", "").split(",")[1].split(" "))[0]]
                self.yelp_zipcode = place_result.get("address", "").split(",")[1].split(" ")[-1]
            except IndexError:
                pass
            allowed_chars = string.digits
            self.yelp_phone = re.sub(r"[^\w\s" + allowed_chars + "]", "", place_result.get("phone", "")).replace(" ", "")
            self.yelp_webpage = place_result.get("website")
            self.yelp_rating = place_result.get("rating", "")
            
            self.yelp_category = [category.get("title", "") for category in place_result.get("categories", "")]
            self.yelp_description = place_result.get("about", "")

            if len(place_result.get("operation_hours", "")) > 0:
                self.yelp_schedule = place_result.get("operation_hours", "").get("hours", "")
            


