import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from PIL import Image
from pdf2image import convert_from_path
import img2pdf
import time

def merge_images_to_pdf(church_name, image_files):
    images_data = []
    for image_file in image_files:
        with open(image_file, 'rb') as f:
            images_data.append(f.read())
    
    pdf_bytes = img2pdf.convert(images_data)

    # Save the PDF to the specified output filename
    with open("reports/" + church_name.replace(" ", "_") + ".pdf", 'wb') as f:
        f.write(pdf_bytes)


def generate(church_name, email):
    print("333333333")
    try:
        # Launch a new browser instance with Selenium
        service = Service(ChromeDriverManager().install())
        options = webdriver.ChromeOptions()
        options.add_argument("--window-size=1920,945")
        options.add_argument("--hide-scrollbars")
        #options.add_argument("--headless=new")
        #o  ptions.add_argument("--force-device-scale-factor=1.5")
        driver = webdriver.Chrome(service=service, options=options)
        
        driver.maximize_window()
        print(church_name)
        church_name = church_name
        folder_name = f"reports/{church_name}"

        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        driver.implicitly_wait(120)
        # Render the /complete_report page server-side
        driver.get("http://localhost:3000/complete_report/1?user_key="+email)
        time.sleep(60)
        driver.implicitly_wait(120)
        driver.save_screenshot(f"{folder_name}\\cr_page1.png")
 
        driver.get("http://localhost:3000/complete_report/2?user_key="+email)
        time.sleep(60)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page2.png")
 
        driver.get("http://localhost:3000/complete_report/3?user_key="+email)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page3.png")
 
        driver.get("http://localhost:3000/complete_report/4?user_key="+email)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page4.png")
 
        driver.get("http://localhost:3000/complete_report/6?user_key="+email)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page6.png")
 
        driver.get("http://localhost:3000/complete_report/7?user_key="+email)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page7.png")
 
        driver.get("http://localhost:3000/complete_report/8?user_key="+email)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page8.png")
 
        driver.get("http://localhost:3000/complete_report/9?user_key="+email)
        driver.implicitly_wait(5)
        driver.save_screenshot(f"{folder_name}\\cr_page9.png")
 
        driver.quit()
 
        # Create a list of image file paths
        image_files = [
            f"{folder_name}\\cr_page1.png",
            f"{folder_name}\\cr_page2.png",
            f"{folder_name}\\cr_page3.png",
            f"{folder_name}\\cr_page4.png",
            f"{folder_name}\\cr_page6.png",
            f"{folder_name}\\cr_page7.png",
            f"{folder_name}\\cr_page8.png",
            f"{folder_name}\\cr_page9.png",
        ]
 
        # Merge images to PDF
        pdf_file = merge_images_to_pdf(church_name, image_files)
        if pdf_file is not None:
            print("PDF report generated successfully")
        else:
            print("The PDF was empty")
        return pdf_file

 
        
    except Exception as e:
        print(f"Error generating PDF: {e}")
        return None
        
 