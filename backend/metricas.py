#!/usr/bin/env python
# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""This example generates forecast metrics for keyword planning.

For more details see this guide:
https://developers.google.com/google-ads/api/docs/keyword-planning/generate-forecast-metrics
"""

import argparse
from datetime import datetime, timedelta
import sys

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException


def main(client, customer_id, city, state):
    """The main method that creates all necessary entities for the example.

    Args:
        client: an initialized GoogleAdsClient instance.
        customer_id: a client customer ID.
    """
    return generate_historical_metrics(client, customer_id, city, state)


def generate_historical_metrics(client, customer_id, city, state):
    """Generates historical metrics and prints the results.

    Args:
        client: an initialized GoogleAdsClient instance.
        customer_id: a client customer ID.
    """
    googleads_service = client.get_service("GoogleAdsService")
    keyword_plan_idea_service = client.get_service("KeywordPlanIdeaService")
    request = client.get_type("GenerateKeywordHistoricalMetricsRequest")
    request.customer_id = customer_id
    request.keywords = ["churches near me"]
    # Geo target constant 2840 is for USA.
    request.geo_target_constants.append(
        googleads_service.geo_target_constant_path(get_location_id(client, city, state))
    )
    request.keyword_plan_network = (
        client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    )
    # Language criteria 1000 is for English. For the list of language criteria
    # IDs, see:
    # https://developers.google.com/google-ads/api/reference/data/codes-formats#languages
    request.language = googleads_service.language_constant_path("1000")

    response = keyword_plan_idea_service.generate_keyword_historical_metrics(
        request=request
    )

    for result in response.results:
        metrics = result.keyword_metrics
        # These metrics include those for both the search query and any variants
        # included in the response.
        
        # Approximate number of monthly searches on this query averaged for the
        # past 12 months.
        #return metrics.avg_monthly_searches

        return metrics.monthly_search_volumes[-1]



def get_location_id(client, city, state):
    gtc_service = client.get_service("GeoTargetConstantService")

    gtc_request = client.get_type("SuggestGeoTargetConstantsRequest")

    gtc_request.locale = "en_US"
    gtc_request.country_code = "US"

    # The location names to get suggested geo target constants.
    gtc_request.location_names.names.extend(
        [city + " " + state]
    )

    results = gtc_service.suggest_geo_target_constants(gtc_request)

    for suggestion in results.geo_target_constant_suggestions:
        geo_target_constant = suggestion.geo_target_constant
        if city.lower() in (geo_target_constant.name).lower() and "city" in (geo_target_constant.target_type).lower():
            return(geo_target_constant.resource_name.split("/")[1])



import os
def start_historical(city, state):
    
    # GoogleAdsClient will read the google-ads.yaml configuration file in the
    # home directory if none is specified.
    credentials = {
    "developer_token": os.environ.get('DEVELOPER_TOKEN'),
    "refresh_token": os.environ.get('REFRESH_TOKEN'),
    "client_id": os.environ.get('CLIENT_ID'),
    "client_secret": os.environ.get('CLIENT_SECRET'),
    "use_proto_plus" : True}
    googleads_client = GoogleAdsClient.load_from_dict(credentials)

    customer_id = os.environ.get("CUSTOMER_ID")

    last_month_search_volume = main(googleads_client, customer_id, city, state).monthly_searches

    return last_month_search_volume
