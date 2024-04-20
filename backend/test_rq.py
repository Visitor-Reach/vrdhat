from church import church
import metricas

form_data = {'website': 'one.church', 'name': 'One Church', 'physical_address': '817 N Hamilton Rd Gahanna', 'location': 'Columbus', 'state': 'Ohio', 'zipCode': '43215', 'phone_number' : "16142213446"}
church_obj = church(name=form_data["name"], address=form_data["physical_address"], city=form_data["location"], state=form_data["state"], zipcode=form_data["zipCode"], webpage=form_data["website"], phone=form_data["phone_number"])
church_obj.get_digital_search_assesment_score()
church_obj.get_map_image()
print(church_obj.digital_search_assesment_score)